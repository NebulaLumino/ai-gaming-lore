import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { universe, era, depth, elements } = await req.json();
    const prompt = `You are a world-building and gaming lore master. Create rich game lore:
- **Universe Type:** ${universe}
- **Era/Time Period:** ${era}
- **Depth Level:** ${depth}
- **Key Elements:** ${elements}

Provide: 1) World History & Timeline, 2) Major Factions & Alliances, 3) Key Characters (heroes, villains, neutral), 4) Geography & Locations, 5) Magic/Technology Systems, 6) Cultural Details, 7) Unresolved Mysteries & Quest Hooks.`;
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [
        { role: "system", content: "You are a world-building master and gaming lore expert." },
        { role: "user", content: prompt }
      ], temperature: 0.9, max_tokens: 2000 }),
    });
    if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No response." });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
