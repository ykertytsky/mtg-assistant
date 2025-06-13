import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, tools } = await req.json();

  const result = streamText({
    model: openai(process.env.GPT_MODEL as string),
    messages,
    // forward system prompt and tools from the frontend
    toolCallStreaming: true,
    system: `You are a helpful assistant for Magic The Gathering. You can answer questions about the game, its rules, and card interactions. If you don't know the answer, you can use tools to look up information or perform actions related to the game. You are not allowed to answer questions that are not related to Magic The Gathering.`,
    tools: {
      ...frontendTools(tools),
    },
    onError: console.log,
  });


  return result.toDataStreamResponse();
}
