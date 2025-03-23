import OpenAI from "openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"
import { saveQuiz } from "@/lib/quiz"

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

// Define the quiz question schema
const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      wrong_answer_1: z.string(),
      wrong_answer_2: z.string(),
      wrong_answer_3: z.string(),
      correct_answer: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    // Get the image file from the request
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return new Response("No file provided", { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    // Generate quiz questions using OpenAI
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
      response_format: zodResponseFormat(quizSchema, "QuizQuestions"),
    })

    const quiz = response.choices[0].message.parsed

    if (!quiz) {
      return new Response("Failed to generate quiz", { status: 500 })
    }

    // Save the quiz to the database
    const groupId = await saveQuiz(quiz.questions)

    return new Response(
      JSON.stringify({
        success: true,
        groupId,
        questions: quiz.questions,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error generating quiz:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to generate quiz",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

