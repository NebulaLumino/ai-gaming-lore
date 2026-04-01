"use client";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState<Record<string, string>>({
      "universe": "Fantasy Kingdom",
      "era": "Ancient Times",
      "depth": "Surface Lore (Basic)",
      "elements": "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        universe: formData["universe"],
        era: formData["era"],
        depth: formData["depth"],
        elements: formData["elements"],
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data.result);
    } catch { setError("Failed to generate content."); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-slate-900 to-fuchsia-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-fuchsia-400 to-fuchsia-200 bg-clip-text text-transparent">
            📜 AI Gaming Lore
          </h1>
          <p className="text-slate-400">Build rich fictional game universes</p>
        </header>

        <form onSubmit={handleGenerate} className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 mb-8 border border-fuchsia-500/20 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-fuchsia-300 mb-2">Universe Type</label>
              <select value={formData["universe"]} onChange={e => setFormData({...formData, "universe": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
                {Array.from({length: 8}).map((_, i) => <option key={i}>{["Fantasy Kingdom", "Sci-Fi Galaxy", "Horror Dimension", "Post-Apocalyptic Earth", "Mythological", "Steampunk World", "Dystopian Future", "Cute Animal World"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-fuchsia-300 mb-2">Time Period</label>
              <select value={formData["era"]} onChange={e => setFormData({...formData, "era": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
                {Array.from({length: 8}).map((_, i) => <option key={i}>{["Ancient Times", "Medieval", "Renaissance", "Industrial Age", "Modern Day", "Near Future", "Far Future", "Timeless"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-fuchsia-300 mb-2">Depth Level</label>
              <select value={formData["depth"]} onChange={e => setFormData({...formData, "depth": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
                {Array.from({length: 4}).map((_, i) => <option key={i}>{["Surface Lore (Basic)", "Moderate Depth", "Deep Lore (Comprehensive)", "Academic/Encyclopedia"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-fuchsia-300 mb-2">Key Elements</label>
              <input type="text" value={formData["elements"]} onChange={e => setFormData({...formData, "elements": e.target.value})}
                placeholder="e.g., dragon gods, ancient magic, fallen empire..."
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
            </div>          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-fuchsia-400 rounded-xl font-semibold text-white transition-all disabled:opacity-50">
            {loading ? "Generating..." : "📜 Generate"}
          </button>
        </form>

        {error && <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-4 text-red-300 mb-6">{error}</div>}

        {result && (
          <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 border border-fuchsia-500/20">
            <h2 className="text-xl font-bold text-fuchsia-300 mb-4">Generated Content</h2>
            <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}
