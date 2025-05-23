import { db } from "@/configs/db" ;
import {STUDY_MATERIAL_TABLE} from "@/configs/schema" ;
import { eq } from "drizzle-orm" ;
import { NextResponse } from "next/server" ;
// show the user courses generated by him 
export async function POST(req){
    const  {createdBy} = await req.json();
    // req mein json format mein ai response aega usko pakad lo 

    const result = await db.select().from(STUDY_MATERIAL_TABLE).where(
        (eq(STUDY_MATERIAL_TABLE.createdBy , createdBy))
    ) ; // cerated by jin courses ka same hoga user se , db mein se unko select karlo 
   
    return NextResponse.json({result:result});

}

export async function GET(req){
    const reqUrl = req.url ;
    const { searchParams } = new URL(reqUrl);
    const courseId = searchParams?.get('courseId');

    const course = await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE?.courseId , courseId ));

         return NextResponse.json({result : course[0]})

}