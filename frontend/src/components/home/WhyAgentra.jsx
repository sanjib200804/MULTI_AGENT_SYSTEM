import { Bot, BrainCircuit, Database, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

export default function WhyAgentra() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            <Zap size={12} />
            <span>Enterprise Agent Architecture</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white tracking-tight">
            Turn complex tasks into an{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              automated output.
            </span>
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
            Agentra handles prompt routing, memory retention, multi-modal document parsing, and file generation automatically in the background.
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                icon: BrainCircuit,
                title: "Autonomous Intent Routing Engine",
                desc: "Auto mode continuously evaluates input semantics to trigger the exact domain expert needed.",
              },
              {
                icon: Database,
                title: "Multi-Modal Document & File Context",
                desc: "Attach PDFs, images, and datasets seamlessly inside your active multi-agent conversation thread.",
              },
              {
                icon: ShieldCheck,
                title: "Enterprise Quota & Credit Management",
                desc: "Real-time user credit tracking with sub-millisecond session authentication and quota protection.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swarm Pipeline Visualizer Card */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/[0.1] bg-white/80 dark:bg-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-[#070b14] p-6 text-white">
              
              <div className="flex items-center justify-between mb-6 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Agentra Swarm Engine</h4>
                    <p className="text-[10px] text-emerald-400 font-mono font-semibold">● Active Pipeline Dispatch</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2.5 py-1 rounded-md border border-white/10">
                  Worker Pool: 6/6
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { step: 1, name: "PDF Agent", task: "Extracting structured tables & citations", status: "Complete" },
                  { step: 2, name: "Search Agent", task: "Verifying live sources & facts online", status: "Complete" },
                  { step: 3, name: "Coding Master", task: "Synthesizing production API routes", status: "Executing" },
                  { step: 4, name: "Web Builder", task: "Rendering Tailwind UI components", status: "Queued" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] p-3 text-xs font-medium border border-white/[0.06] hover:border-purple-500/40 transition">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6 items-center justify-center rounded-full bg-purple-600 text-[11px] font-bold text-white shadow-md">
                        {item.step}
                      </div>
                      <div>
                        <span className="text-slate-200 font-semibold">{item.name}: </span>
                        <span className="text-slate-400 font-normal">{item.task}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                      item.status === "Complete" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      item.status === "Executing" ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 animate-pulse" :
                      "bg-slate-800 text-slate-400"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
