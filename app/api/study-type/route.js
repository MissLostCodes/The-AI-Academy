import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { STUDY_MATERIAL_TABLE, CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { courseId, studyType } = await req.json();
        
        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        console.log('Processing request for courseId:', courseId, 'studyType:', studyType);

        // Get the course material
        const courseMaterial = await db.select()
            .from(STUDY_MATERIAL_TABLE)
            .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
            .limit(1);

        if (!courseMaterial || courseMaterial.length === 0) {
            console.log('No course material found for courseId:', courseId);
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // If studyType is 'all', return all content including notes
        if (studyType === 'all') {
            const notes = await db.select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            console.log('Found notes for courseId:', courseId, 'count:', notes.length);
            const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
            .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
            
            const result = {
               notes: notes,
               quiz: contentList?.filter(item => item.type === 'quiz'),
               cheatsheet: contentList?.filter(item => item.type === 'cheatsheet'),
              
            }
            return NextResponse.json(result);
        }

        // If studyType is 'notes', return only notes
        if (studyType === 'notes') {
            const notes = await db.select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            console.log('Found notes for courseId:', courseId, 'count:', notes.length);

            if (!notes || notes.length === 0) {
                return NextResponse.json({ notes: [] });
            }

            return NextResponse.json({ notes });
        }

        // For quiz, cheatsheet and other study types
        if (studyType === 'quiz' || studyType === 'cheatsheet') {
            console.log('Fetching content for studyType:', studyType);
            
            const contentList = await db.select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
                .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType));

            console.log('Raw content list:', contentList);
            console.log(`Found ${studyType} content for courseId:`, courseId, 'count:', contentList?.length || 0);

            if (!contentList || contentList.length === 0) {
                console.log('No content found for studyType:', studyType);
                return NextResponse.json({ [studyType]: [] });
            }

            // Process the content
            const parsedContentList = contentList.map(item => {
                console.log('Processing item:', item);
                console.log('Content type:', typeof item.content);
                console.log('Content value:', item.content);
                
                // If content is empty array, return as is
                if (Array.isArray(item.content) && item.content.length === 0) {
                    return item;
                }

                // For string content, use it directly
                if (typeof item.content === 'string') {
                    return {
                        ...item,
                        content: item.content
                    };
                }

                // For any other type, return as is
                return item;
            });

            console.log('Final parsed content list:', parsedContentList);
            return NextResponse.json({ [studyType]: parsedContentList });
        }

        // For other specific studyType fields, return that field
        const fieldData = courseMaterial[0][studyType] || [];
        return NextResponse.json({
            [studyType]: fieldData
        });

    } catch (error) {
        console.error('Error in study-type route:', error);
        return NextResponse.json(
            { error: "Failed to fetch study material", details: error.message }, 
            { status: 500 }
        );
    }
}
