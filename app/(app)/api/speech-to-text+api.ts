import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key in environment variables");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = (formData as any).get("file") as File;

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    const response = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during transcription:", error);
    return new Response(
      JSON.stringify({ error: "Failed to transcribe audio" }),
      { status: 500 }
    );
  }
}
