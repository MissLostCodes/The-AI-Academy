import { inngest } from "./client";
import { db } from "@/configs/db";
import {
  CHAPTER_NOTES_TABLE,
  USER_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel } from "@/configs/AiModel";
import { generateQuizAI } from "@/configs/AiModel";
import { generateCheatSheetAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const user = event.data;

    const result = await step.run(
      "Check user and create new if not in DB",
      async () => {
        const existingUser = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user.email));

        if (existingUser?.length === 0) {
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              email: user.email,
              name: user.name
            })
            .returning({ id: USER_TABLE.id });

          console.log("Created new user:", userResp);
          return userResp;
        }

        return existingUser;
      }
    );

    return "Success";
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters;
      const courseType = course?.courseType;
      const difficultyLevel = course?.difficultyLevel;
      if (!chapters || chapters.length === 0) return "No chapters found";

      let index = 0;
      for (const chapter of chapters) {
        try {
          console.log(`Attempting to generate notes for chapter: ${index}`);
          const result = await generateNotesAiModel(chapter, courseType, difficultyLevel);
          console.log(`Received response from generateNotesAiModel for chapter ${index}`);
          const aiResp = result;

          console.log(`Generated notes text for chapter ${index}. Length: ${aiResp.length}`);

          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: index,
            courseId: course?.courseId,
            notes: aiResp
          });

          console.log(`Successfully inserted notes for chapter ${index} into DB.`);
        } catch (error) {
          console.error(`Error generating or saving notes for chapter ${index}:`, error);
        }

        index++;
      }

      return "Completed";
    });

    await step.run("Update Course status to ready", async () => {
      await db
        .update(STUDY_MATERIAL_TABLE)
        .set({ status: "Ready" })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

      return "Success";
    });

    return "Notes generation and course status update completed";
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "ai-study-bro/generate-study-type-content" },
  async ({ event, step }) => {
    const {
      courseId,
      type,
      chapters,
      courseType,
      difficultyLevel,
      contentId
    } = event.data;

    console.log('Starting content generation for:', { type, courseId, contentId });

    try {
      if (type === 'quiz') {
        const quizAiResult = await step.run("Generate quiz", async () => {
          const result = await generateQuizAI(chapters, courseType, difficultyLevel);
          console.log('Raw quiz result:', result);
          return result;
        });

        console.log('Quiz generation result:', quizAiResult);

        await step.run("Save Quiz Result to DB", async () => {
          // Ensure the content is stored as a JSON string
          const quizContent = typeof quizAiResult === 'string' ? quizAiResult : JSON.stringify(quizAiResult);
          
          await db
            .update(STUDY_TYPE_CONTENT_TABLE)
            .set({
              content: quizContent,
              status: "Ready"
            })
            .where(eq(STUDY_TYPE_CONTENT_TABLE.id, contentId));
          
          console.log('Quiz content saved to database:', quizContent);
          return "Quiz Data Inserted";
        });
      }

      return "Study Type Content Generation Completed";
    } catch (error) {
      console.error('Error in content generation:', error);
      
      // Update status to error
      await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          status: "Error",
          content: JSON.stringify({ error: error.message })
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, contentId));

      throw error;
    }
  }
);

export const GenerateCheatSheet = inngest.createFunction(
  { id: "generate-cheatsheet" },
  { event: "cheatsheet.generate" },
  async ({ event, step }) => {
    const { course } = event.data;
    console.log('Received course data for cheatsheet generation:', course);

    await step.run("Generate Cheat Sheet", async () => {
      const courseTitle = course?.topic;
      const courseType = course?.courseType;
      const difficultyLevel = course?.difficultyLevel;

      console.log('Cheatsheet generation parameters:', {
        courseTitle,
        courseType,
        difficultyLevel,
        courseId: course?.courseId
      });

      if (!courseTitle || !courseType || !difficultyLevel) {
        console.error('Missing required fields:', {
          hasTitle: !!courseTitle,
          hasType: !!courseType,
          hasLevel: !!difficultyLevel
        });
        throw new Error("Missing required fields for cheat sheet generation");
      }

      try {
        console.log(`Generating cheat sheet for course: ${courseTitle}`);
        const cheatSheetContent = await generateCheatSheetAiModel(courseTitle, courseType, difficultyLevel);
        console.log('Raw cheat sheet content:', cheatSheetContent);

        // Store the HTML content directly
        await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content: cheatSheetContent,
            status: "Ready"
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, course.id));

        console.log("Cheat sheet successfully updated in STUDY_TYPE_CONTENT_TABLE.");
        return "Cheat Sheet Generation Completed";
      } catch (error) {
        console.error("Error generating or saving cheat sheet:", error);
        // Update status to error
        await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            status: "Error",
            content: `Error: ${error.message}`
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, course.id));
        throw error;
      }
    });

    return "Cheat sheet generation completed";
  }
);
