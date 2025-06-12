const BASE_URL = "https://api.magicthegathering.io/v1/";

export async function fetchCards(query?: Record<string, string | number | boolean>) {
    const url = new URL(`${BASE_URL}cards`);

    if (query) {
        for (const key in query) {
            url.searchParams.append(key, String(query[key]));
        }
    }

    // For debugging
    console.log("Fetching MTG cards with URL:", url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Failed to fetch cards: ${response.status} ${response.statusText}`);
    }
    return response.json();
}