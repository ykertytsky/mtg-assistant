import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_BASE = "https://api.magicthegathering.io/v1/"; 

  const { searchParams } = request.nextUrl;
  console.log("searchParams", searchParams.toString());

  // You can use the searchParams to fetch data from the API
  const response = await fetch(`${API_BASE}sets?${searchParams}`);
  const data = await response.json();

  return NextResponse.json(data);
}