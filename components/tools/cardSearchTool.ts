import { tool, makeAssistantTool } from "@assistant-ui/react";
import { z } from "zod";

const cardSearchTool = tool({
  toolName: "search_mtg_cards",
  description: "Search for Magic: The Gathering cards with various filtering options",
  parameters: z.object({
    // Card identification
    name: z.string().optional().describe("The card name"),
    id: z.string().optional().describe("Unique id (SHA1 hash of setCode + cardName + cardImageName)"),
    multiverseid: z.number().optional().describe("The multiverseid on Wizard's Gatherer"),

    // Card characteristics
    layout: z.enum([
      'normal', 'split', 'flip', 'double-faced', 'token', 'plane', 
      'scheme', 'phenomenon', 'leveler', 'vanguard', 'aftermath'
    ]).optional().describe("The card layout"),
    cmc: z.number().optional().describe("Converted mana cost"),
    colors: z.array(z.string()).optional().describe("Card colors with following conventions: W (White), U (Blue), B (Black), R (Red), G (Green), C (Colorless)"),
    colorIdentity: z.array(z.string()).optional().describe("Card's color identity"),
    type: z.string().optional().describe("The card type"),
    supertypes: z.array(z.string()).optional().describe("The supertypes (Basic, Legendary, Snow, etc.)"),
    types: z.array(z.string()).optional().describe("The types (Instant, Sorcery, Artifact, etc.)"),
    subtypes: z.array(z.string()).optional().describe("The subtypes (Human, Equipment, Aura, etc.)"),
    power: z.string().optional().describe("Power (for creatures)"),
    toughness: z.string().optional().describe("Toughness (for creatures)"),
    loyalty: z.number().optional().describe("Loyalty (for planeswalkers)"),

    // Set information
    set: z.string().optional().describe("Set code"),
    setName: z.string().optional().describe("Full set name"),
    rarity: z.enum([
      'Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Special', 'Basic Land'
    ]).optional().describe("The rarity of the card"),

    // Card text
    text: z.string().optional().describe("Oracle text"),
    flavor: z.string().optional().describe("Flavor text"),
    artist: z.string().optional().describe("Artist name"),
    number: z.string().optional().describe("Card number"),
    
    // Language and format
    language: z.string().optional().describe("Language the card is printed in"),
    gameFormat: z.string().optional().describe("Game format (Commander, Standard, etc.)"),
    legality: z.enum(['Legal', 'Banned', 'Restricted']).optional()
      .describe("Legality in the specified format"),

    // Pagination and ordering
    page: z.number().optional().describe("Page number for results"),
    pageSize: z.number().optional().default(20).describe("Results per page (default: 20, max: 100)"),
    orderBy: z.string().optional().describe("Field to order results by"),
    random: z.boolean().optional().describe("Get random cards"),
    
    // Special filters
    contains: z.string().optional().describe("Filter by existence of a field")
  }),
  execute: async (params) => {
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    // Add all non-null and non-undefined parameters to the query
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        if (Array.isArray(value)) {
          // Handle array parameters (join with commas as per MTG API convention)
          queryParams.append(key, value.join(','));
        } else if (typeof value === 'boolean') {
          // Handle boolean parameters
          queryParams.append(key, value.toString());
        } else {
          // Handle string and number parameters
          queryParams.append(key, value.toString());
        }
      }
    });

    // Make the API call to our route handler
    try {
      const response = await fetch(`/api/cards-db/cards?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching for MTG cards:", error);
      throw new Error("Failed to search for cards");
    }
  }
});

export const CardSearchTool = makeAssistantTool(cardSearchTool);