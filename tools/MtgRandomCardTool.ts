import { makeAssistantTool, tool } from "@assistant-ui/react";
import { z } from "zod";

// Simple function to fetch from our cards API
async function fetchRandomCard() {
  try {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        random: true,
        pageSize: 1
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random card:', error);
    throw error;
  }
}

// Simple tool to get a random card
const getRandomCardTool = tool({
  description: "Get a random Magic: The Gathering card",
  parameters: z.object({}), // No parameters needed for basic random
  execute: async () => {
    try {
      // Request a random card from the API
      const result = await fetchRandomCard();
      return result;
    } catch (error) {
      return { error: "Failed to retrieve random card", details: String(error) };
    }
  }
});

// Minimal MTG tool with just the random functionality
export const MtgRandomCardTool = makeAssistantTool({
  id: "mtg-random-card",
  description: "A tool to retrieve a random Magic: The Gathering card.",
  tools: {
    getRandomCard: getRandomCardTool
  }
});
