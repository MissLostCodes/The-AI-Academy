import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { STUDY_MATERIAL_TABLE } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Fetch courses for the user
    const courses = await db.select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.userEmail, email))
      .orderBy(desc(STUDY_MATERIAL_TABLE.createdAt));

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 