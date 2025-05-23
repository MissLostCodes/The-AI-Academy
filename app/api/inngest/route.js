import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {  CreateNewUser,GenerateCheatSheet, GenerateNotes, GenerateStudyTypeContent, helloWorld } from "../../../inngest/functions";
// Create an API that serves zero functions
export const runtime ='edge' ;
export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming : 'allow',
  functions: [
    /* your functions will be passed here later! */
    helloWorld ,
    CreateNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
    GenerateCheatSheet
  ],
});