import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { STUDY_TYPE_CONTENT_TABLE, STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { courseId, type, chapters, courseType, difficultyLevel } = await req.json();
        
        if (!type) {
            return NextResponse.json({ error: "Content type is required" }, { status: 400 });
        }

        // Fetch course details
        const courseDetails = await db.select()
            .from(STUDY_MATERIAL_TABLE)
            .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
            .limit(1);

        if (!courseDetails || courseDetails.length === 0) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Create a new record in STUDY_TYPE_CONTENT_TABLE
        const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
            courseId: courseId,
            type: type,
            content: type === 'cheatsheet' ? '[]' : '{}',
            status: 'Generating'
        }).returning();

        if (!result || result.length === 0) {
            return NextResponse.json({ error: "Failed to create content record" }, { status: 500 });
        }

        // Send event to Inngest with complete course data
        if (type === 'cheatsheet') {
            await inngest.send({
                name: 'cheatsheet.generate',
                data: {
                    course: {
                        ...result[0],
                        topic: courseDetails[0].topic,
                        courseType: courseDetails[0].courseType,
                        difficultyLevel: courseDetails[0].difficultyLevel
                    }
                }
            });
        } else if (type === 'quiz') {
            await inngest.send({
                name: 'ai-study-bro/generate-study-type-content',
                data: {
                    courseId,
                    type,
                    chapters,
                    courseType,
                    difficultyLevel,
                    contentId: result[0].id
                }
            });
        }

        return NextResponse.json({ result: result[0] });

    } catch (error) {
        console.error('Error in study-type-content:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}