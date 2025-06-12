import { NextRequest, NextResponse } from "next/server";
import { fetchCards } from "@/lib/cards-sdk";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request URL
    const { searchParams } = new URL(request.url);
    
    // Create query object from search parameters
    const query: Record<string, string | number> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    // Fetch cards with the provided query parameters
    const data = await fetchCards(Object.keys(query).length > 0 ? query : undefined);
    
    // Return successful response with cards data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching cards:", error);
    
    // Return error response
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}

// Handle POST requests to create a custom filter/search endpoint
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract search parameters from the body
    const { 
      name, 
      type, 
      colors, 
      set, 
      rarity, 
      format, 
      legality,
      exactName,
      random
    } = body;
    
    // Build query object with provided parameters
    const query: Record<string, string | number> = {};
    
    // Handle exact name search
    if (name) {
      if (exactName) {
        query.name = `"${name}"`; // Use quotes for exact matching
      } else {
        query.name = name;
      }
    }
    
    if (type) query.type = type;
    
    // Handle colors (could be string or array)
    if (colors) {
      if (Array.isArray(colors)) {
        query.colors = colors.join(',');
      } else {
        query.colors = colors;
      }
    }
    
    if (set) query.set = set;
    if (rarity) query.rarity = rarity;
    if (format) query.gameFormat = format;
    if (legality) query.legality = legality;
    
    // Add pagination if provided
    if (body.page) query.page = body.page;
    if (body.pageSize) query.pageSize = body.pageSize;
    
    // Handle random card request
    if (random) {
      query.random = true;
      query.pageSize = 1;
    }
    
    // Fetch cards with the constructed query
    const data = await fetchCards(query);
    
    // Return successful response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in POST cards request:", error);
    
    // Return error response
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}