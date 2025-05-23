import { inngest } from "@/inngest/client";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { user } = await req.json();
    
    if (!user || !user.email) {
      return Response.json({ error: "Invalid user data" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.select().from(USER_TABLE)
      .where(eq(USER_TABLE.email, user.email))
      .limit(1);

    if (existingUser.length > 0) {
      return Response.json({ message: "User already exists", user: existingUser[0] });
    }

    // Create new user in database
    const newUser = await db.insert(USER_TABLE)
      .values({
        name: user.name,
        email: user.email,
        credits: 5 // Initial credits
      })
      .returning();

    // Send the event to Inngest
    await inngest.send({
      name: "user.create",
      data: {
        userId: newUser[0].id,
        name: user.name,
        email: user.email
      }
    });

    return Response.json({ message: "User created successfully", user: newUser[0] });
  } catch (error) {
    console.error("Error in create-user route:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
