import { NextRequest, NextResponse } from "next/server";

// Define all possible search parameters as a strongly typed interface
interface MTGCardSearchParams {
  // Card identification
  name?: string;              // The card name
  id?: string;                // Unique id (SHA1 hash of setCode + cardName + cardImageName)
  multiverseid?: number;      // The multiverseid on Wizard's Gatherer

  // Card characteristics
  layout?: 'normal' | 'split' | 'flip' | 'double-faced' | 'token' | 'plane' | 
           'scheme' | 'phenomenon' | 'leveler' | 'vanguard' | 'aftermath';
  cmc?: number;               // Converted mana cost
  colors?: string[];          // Card colors
  colorIdentity?: string[];   // Card's color identity
  type?: string;              // The card type
  supertypes?: string[];      // The supertypes (Basic, Legendary, Snow, etc.)
  types?: string[];           // The types (Instant, Sorcery, Artifact, etc.)
  subtypes?: string[];        // The subtypes (Human, Equipment, Aura, etc.)
  power?: string;             // Power (for creatures)
  toughness?: string;         // Toughness (for creatures)
  loyalty?: number;           // Loyalty (for planeswalkers)

  // Set information
  set?: string;               // Set code
  setName?: string;           // Full set name
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Mythic Rare' | 'Special' | 'Basic Land';

  // Card text
  text?: string;              // Oracle text
  flavor?: string;            // Flavor text
  artist?: string;            // Artist name
  number?: string;            // Card number
  
  // Language and format
  language?: string;          // Language the card is printed in
  gameFormat?: string;        // Game format (Commander, Standard, etc.)
  legality?: 'Legal' | 'Banned' | 'Restricted';  // Legality in the specified format

  // Pagination and ordering
  page?: number;              // Page number for results
  pageSize?: number;          // Results per page (default and max: 100)
  orderBy?: string;           // Field to order results by
  random?: boolean;           // Get random cards
  
  // Special filters
  contains?: string;          // Filter by existence of a field
}

export async function GET(request: NextRequest) {
  const API_BASE = "https://api.magicthegathering.io/v1/";
  const { searchParams } = request.nextUrl;
  
  // Validate and transform parameters if needed
  // For example, arrays need to be handled specially
  const params = new URLSearchParams();
  
  // Copy all valid parameters from the request to the API call
  for (const [key, value] of searchParams.entries()) {
    if (value) {
      params.append(key, value);
    }
  }
  
  try {
    const response = await fetch(`${API_BASE}cards?${params}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching MTG card data:", error);
    return NextResponse.json(
      { error: "Failed to fetch card data" },
      { status: 500 }
    );
  }
}