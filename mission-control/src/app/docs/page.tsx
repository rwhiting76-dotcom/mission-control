export default function DocsPage() {
  const docs = [
    { title: "Mission Control Brief", type: "brief", date: "2026-05-02", words: 1200, project: "Mission Control" },
    { title: "PuckFinder Scraper Guide", type: "report", date: "2026-04-14", words: 800, project: "PuckFinder" },
    { title: "Hockey Shot Analysis — Scoring System", type: "report", date: "2026-04-22", words: 600, project: "Hockey Shot Analyzer" },
  ];

  const typeColors: Record<string, string> = {
    brief: "bg-blue-100 text-blue-700",
    report: "bg-purple-100 text-purple-700",
    newsletter: "bg-pink-100 text-pink-700",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">📄 Docs</h1>
        <p className="text-sm text-gray-500 mt-1">
          Every document your agent has written
        </p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search docs..."
          className="w-full max-w-md px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm font-semibold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <div key={doc.title} className="card cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-lg flex-shrink-0">
                📄
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#1E1B4B] truncate">{doc.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`badge ${typeColors[doc.type] ?? "badge-low"}`}>{doc.type}</span>
                  <span className="text-xs text-gray-400">{doc.words} words</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">{doc.project} · {doc.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}