// ./app/api/chat/route.ts
import OpenAI from "openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"
import { getPool } from "../../../lib/db" // Changed from "@/lib/db"

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString("base64")

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at analyzing images of handwritten or typed notes and converting them into effective multiple choice quiz questions. When given an image of notes, create 7 quiz questions based on the key concepts, each with 4 answer choices where only one is correct. Make the wrong choices plausible but clearly wrong to someone who understands the material.",
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64}`,
            },
          },
        ],
      },
    ],
    response_format: zodResponseFormat(
      z.object({
        questions: z.array(
          z.object({
            question: z.string(),
            wrong_answer_1: z.string(),
            wrong_answer_2: z.string(),
            wrong_answer_3: z.string(),
            correct_answer: z.string(),
          }),
        ),
      }),
      "QuizQuestions",
    ),
  })

  const quiz = response.choices[0].message.parsed

  if (!quiz) {
    return new Response("No quiz found", { status: 400 })
  }

  const pool = await getPool()
  const { rows } = await pool.query("SELECT COUNT(*) FROM quiz")
  const group_id = Number.parseInt(rows[0].count)

  for (const question of quiz.questions) {
    await pool.query(
      "INSERT INTO quiz (group_id, question, wrong_answer_1, wrong_answer_2, wrong_answer_3, correct_answer) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        group_id,
        question.question,
        question.wrong_answer_1,
        question.wrong_answer_2,
        question.wrong_answer_3,
        question.correct_answer,
      ],
    )
  }

  return new Response(JSON.stringify(quiz.questions), {
    headers: { "Content-Type": "application/json" },
  })
}
