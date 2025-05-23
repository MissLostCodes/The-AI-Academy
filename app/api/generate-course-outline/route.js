import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { generateCourseOutlineAI } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    console.log('API route /api/generate-course-outline reached.');
    try {
        const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();
        console.log('Request body parsed:', { courseId, topic, courseType, difficultyLevel, createdBy });

        // Generate course layout using AI
        const aiResponseText = await generateCourseOutlineAI(topic, courseType, difficultyLevel);
        console.log('Received response from AI:', aiResponseText);

        // Parse AI response
        console.log('----------Parsing AI response as JSON.-----------');
        const aiResult = JSON.parse(aiResponseText);

        // Insert into database
        console.log('Inserting result into database.');
        const dbResult = await db.insert(STUDY_MATERIAL_TABLE)
            .values({
                courseId: courseId,
                courseType: courseType,
                createdBy: createdBy,
                topic: topic,
                difficultyLevel: difficultyLevel,
                courseLayout: aiResult
            })
            .returning({ resp: STUDY_MATERIAL_TABLE });

        // Generate notes in background
        console.log('Database insertion result------in notes>:', dbResult);
        console.log('INNGEST_EVENT_KEY:', process.env.INNGEST_EVENT_KEY);
        
        const result = await inngest.send({
            name: 'notes.generate',
            data: {
                course: dbResult[0].resp
            }
        });

        return NextResponse.json({ result: dbResult[0] });

    } catch (error) {
        console.error('Error in /api/generate-course-outline:', error);
        return NextResponse.json({ error: 'Failed to generate course outline.', details: error.message }, { status: 500 });
    }
}