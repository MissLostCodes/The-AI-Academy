import { serial , json , pgTable, text, varchar , boolean , integer } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar('name'),
  email: varchar('email').unique(),
  isMember: boolean().default(false)
});

export const STUDY_MATERIAL_TABLE = pgTable('studyMaterial',{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  courseType :  varchar().notNull(),
  topic : varchar().notNull(),
  difficultyLevel:varchar().default('Beginner'),
  courseLayout:json(),
  createdBy:varchar().notNull(),
  status:varchar().default('Generating')
});

export const CHAPTER_NOTES_TABLE = pgTable('chapterNotes' , 
 {
  id:serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId:integer().notNull(),
  notes:text()
 }
)

export const STUDY_TYPE_CONTENT_TABLE=pgTable('studyTypeContent' ,{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  content:json(),
  type:varchar().notNull(),
  status:varchar().default('Generating')
})

