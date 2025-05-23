import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = 'gemini-2.0-flash';
const config = {
  responseMimeType: 'application/json',
};

export async function generateCourseOutlineAI(topic, courseType, difficultyLevel) {
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `
Generate study material for:

- Topic: '${topic}'
- Course Type: '${courseType}'
- Difficulty Level: '${difficultyLevel}'

Instructions:
- Return the result **strictly in JSON format** as shown below.
- Include: courseSummary, a list of chapters (with title, summary, and topic list for each).
- DO NOT explain anything outside the JSON.
- Format exactly like the example below.

Example Format:
\`\`\`json
{
  "courseType": "Online Course",
  "topic": "Introduction to Python",
  "difficultyLevel": "Beginner",
  "courseSummary": "This beginner-friendly course provides...",
  "chapters": [
    {
      "chapterTitle": "Getting Started with Python",
      "chapterSummary": "This chapter introduces...",
      "topics": [
        "Installing Python",
        "Variables",
        "Operators"
      ]
    }
  ]
}
\`\`\`
`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }
  return result;
}

// notes generation call function to ai model 
export async function generateNotesAiModel(chapters, courseType, difficultyLevel) {
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `
You are an expert study note generator.You only respond in Html .

Generate clean, readable HTML study notes customized for a "${difficultyLevel}" level learner preparing for "${courseType}".
if the contentent is programming related try to add code blocks 
Use the following structure:
- <h2> for each chapter title
- <p> for chapter summary
- <h3> for each topic title
- <p> for the topic explanation (each explanation should have notes in form of points and **at least 50 words long** to provide detailed understanding)

Output Rules:
- DO NOT include JSON, keys like "chapterTitle" or "topics"
- DO NOT echo the input
- DO NOT include curly braces {}, quotes "", \\n, \\t, or escape characters
- DO NOT include <html>, <head>, <body>, or <title> tags
- ONLY return the clean HTML content.
- DO NOT add commas, quotes, or any characters outside valid HTML tags and text
- DO NOT insert commas, quotes, brackets, or any punctuation outside HTML tags and text.
- Format the content so that there are no commas or extra punctuation between elements.



Use this input:
\`\`\`json
${JSON.stringify(chapters, null, 2)}
\`\`\`

Return just the HTML.
`
        }
      ]
    }
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  // 🧹 Clean the output to remove escape characters and extra noise
  const cleanHtml = result
  .replace(/\\n|\\t/g, '')       // remove newline/tab escape chars
  .replace(/\\+"/g, '"')         // unescape quotes
  .replace(/\\'/g, "'")          // unescape single quotes
  .replace(/\\\\/g, '\\')        // unescape backslashes
  .replace(/```html|```/gi, '') // remove markdown fences
  .replace(/^[^{<]*?(<h2>)/, '$1') // remove AI intros before first <h2>
  // Remove trailing characters like quotes, brackets, commas, whitespace at the end:
  .replace(/[\s",;\]\}]+$/g, '')  // also remove trailing semicolons and commas
  // Remove leading unwanted chars:
  .replace(/^[\s",\[\{]+/g, '')
  // Remove any commas or quotes right before closing tags:
  .replace(/,\s*(<\/[hp]>)/g, '$1') // remove comma before closing p or h tags
  .replace(/"\s*(<\/[hp]>)/g, '$1') // remove quote before closing p or h tags
  .replace(/,\s*(<\/(p|h[23])>)/g, '$1')
  .replace(/,(\s*<\/li>)/g, '$1')                      // li ending
  .replace(/,(\s*<\/h[234]>)/g, '$1')                   // h2 h3 h4 ending
  .replace(/,(\s*<li>)/g, '$1')                         // before new <li>
  .replace(/(<\/li>),/g, '$1')                          // after </li>
  .replace(/<li>([^<]*?),([^<]*?)<\/li>/g, '<li>$1 $2</li>') // comma inside <li>
  .replace(/(<\/?h[234]>),/g, '$1')                     // any stray commas near headings
  .replace(/,+/g, ' ')     
  .trim();


  return cleanHtml;
}

export async function generateQuizAI(chapters, courseType, difficultyLevel) {
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `
You are an AI quiz generator.

Your task is to generate high-quality multiple-choice quiz questions based on the following chapters.

Context:
- Chapters are provided in JSON format with titles and topic lists.
- Learner Level: "${difficultyLevel}"
- Course Type: "${courseType}"

Instructions:
- Generate  10 multiple-choice questions .
- Each question must contain:
  - "question": the question text
  - "options": array of 4 plausible options
  - "correctAnswer": one correct option from the list

Output Requirements:
- DO NOT include the chapter title in the output.
- DO NOT add any extra text or markdown formatting.
- Output MUST be a pure JSON array of question objects.
- DO NOT include explanations or escape characters (\\n, \\t, \\", etc.).
- DO NOT wrap output in \`\`\`json or any other code blocks.
- No Option should have more than 30 alphabets 

Now use this input:
${JSON.stringify(chapters, null, 2)}
`
        }
      ]
    }
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  // Final clean-up to ensure raw JSON
  const cleanJson = result
    .replace(/```json|```/gi, '')     // strip markdown fences
    .replace(/\\n|\\t/g, '')          // remove escape characters
    .replace(/\\+"/g, '"')            // unescape quotes
    .replace(/\\'/g, "'")             // unescape single quotes
    .replace(/\\\\/g, '\\')           // unescape backslashes
    .trim();

  return cleanJson;
}


// koi faltu ke characters nahi aane chaaiye 
export async function generateCheatSheetAiModel(courseTitle, courseType, difficultyLevel) {
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `
You are an expert in creating compact, clean  HTML format cheat sheets.You only respond in Html .
you never use ", " these 3 symbols 


Generate a concise HTML cheat sheet for a "${difficultyLevel}" level learner studying "${courseTitle}" under the course type "${courseType}".

Follow this format:
- Use <h2> for the cheat sheet title (Course Title)
- Use <h3> for major topics or formula categories
- Use <h4> for subtopics under each category
- Use <ul><li> for listing important formulas and quick facts
- Use <ul><li> for listing important formulas and quick facts
- Keep explanations short and focused on application or pattern (each <li> should ideally be under 30 words)

Output Rules:
- DO NOT include JSON, curly braces {}, quotes "", \\n, \\t, or escape characters
- DO NOT echo the input or include any headings like "Here is your cheat sheet"
- DO NOT include <html>, <head>, <body>, or <title> tags
- ONLY return clean, valid HTML using the structure above
- DO NOT add commas or characters outside valid HTML tags and text
- Structure output as a clean, scrollable HTML snippet with no extra punctuation between tags or text
- Return a usable HTML snippet for rendering directly in a frontend app or UI.
- remove all " , " symbols 
Use this input:
\`\`\`json
{
  "courseTitle": "${courseTitle}",
  "courseType": "${courseType}",
  "difficultyLevel": "${difficultyLevel}"
}
\`\`\`

Return just the HTML.
`
        }
      ]
    }
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  const cleanHtml = result
    .replace(/\\n|\\t/g, '')
    .replace(/\\+"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\')
    .replace(/```html|```/gi, '')
    .replace(/^[^{<]*?(<h2>)/, '$1')
    .replace(/[\s",;\]\}]+$/g, '')
    .replace(/^[\s",\[\{]+/g, '')
    .replace(/,\s*(<\/[ullih]>)/g, '$1')
    .replace(/"\s*(<\/[ullih]>)/g, '$1')
    .replace(/,\s*(<\/(li|h[23])>)/g, '$1')
    .replace(/,(\s*<\/li>)/g, '$1')                      // li ending
    .replace(/,(\s*<\/h[234]>)/g, '$1')                   // h2 h3 h4 ending
    .replace(/,(\s*<li>)/g, '$1')                         // before new <li>
    .replace(/(<\/li>),/g, '$1')                          // after </li>
    .replace(/<li>([^<]*?),([^<]*?)<\/li>/g, '<li>$1 $2</li>') // comma inside <li>
    .replace(/(<\/?h[234]>),/g, '$1')                     // any stray commas near headings
    .replace(/,+/g, ' ')     
    .trim();

  return cleanHtml;
}
