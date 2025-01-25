import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables")
}

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
})

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 2048,
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const prompt = messages[messages.length - 1].content

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    })

    const response = result.response
    const text = response.text()

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

