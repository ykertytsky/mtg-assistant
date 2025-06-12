import { makeAssistantTool, tool } from "@assistant-ui/react";
import { z } from "zod";

// Simple function to fetch from our cards API
async function fetchCardsAPI(params: Record<string, string | number | boolean>) {
  try {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
}

// Simple tool to get a random card
const getRandomCard = tool({
  description: "Get a random Magic: The Gathering card",
  parameters: z.object({}), // No parameters needed for basic random
  execute: async () => {
    try {
      // Request a random card from the API
      const result = await fetchCardsAPI({ 
        random: true,
        pageSize: 1
      });
      
      return result;
    } catch (error) {
      return { error: "Failed to retrieve random card", details: String(error) };
    }
  }
});

// Minimal CardsDatabase tool with just the random functionality
export const CardsDatabase = makeAssistantTool({
  id: "cards-database",
  description: "A tool to retrieve random Magic: The Gathering cards.",
  tools: {
    getRandomCard
  }
});

// Simple tool to get a random card
const getRandomCard = tool({
  description: "Get a random Magic: The Gathering card",
  parameters: z.object({}), // No parameters needed for basic random
  execute: async () => {
    try {
      // Request a random card from the API
      const result = await fetchCardsAPI({ 
        random: true,
        pageSize: 1
      });
      
      return result;
    } catch (error) {
      return { error: "Failed to retrieve random card", details: String(error) };
    }
  }
});

// Minimal CardsDatabase tool with just the random functionality
export const CardsDatabase = makeAssistantTool({
  id: "cards-database",
  description: "A tool to retrieve random Magic: The Gathering cards.",
  tools: {
    getRandomCard
  }
});
