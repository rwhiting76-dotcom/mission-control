export default function ProjectsPage() {
  const projects = [
    { name: "Mission Control", status: "active", progress: 15, tasks: 4, lastActivity: "2 min ago", color: "bg-blue-500" },
    { name: "PuckFinder", status: "active", progress: 80, tasks: 12, lastActivity: "1 day ago", color: "bg-green-500" },
    { name: "Hockey Shot Analyzer", status: "active", progress: 60, tasks: 8, lastActivity: "3 days ago", color: "bg-purple-500" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">🚀 Projects</h1>
        <p className="text-sm text-gray-500 mt-1">
          Everything you&apos;re building, with progress and next moves
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((p) => (
          <div key={p.name} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-white text-lg`}>
                🚀
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-sm text-[#1E1B4B]">{p.name}</h3>
                <span className={`badge ${p.status === "active" ? "badge-in-progress" : "badge-done"}`}>
                  {p.status}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${p.color} rounded-full transition-all duration-500`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{p.tasks} tasks</span>
              <span>{p.lastActivity}</span>
            </div>

            <button className="w-full mt-4 py-2 rounded-xl text-xs font-bold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors">
              💡 What moves this forward today?
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}