import { Bot, BrainCircuit, Database, ShieldCheck } from "lucide-react";

export default function WhyAgentra() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded border border-purple-500/20 mb-3 inline-block">
            Architecture
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-slate-900 dark:text-white tracking-tight">
            Turn complex tasks into an{" "}
            <span className="text-purple-600 dark:text-purple-400">
              automated output.
            </span>
          </h2>
          <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
            Agentra handles prompt routing, memory retention, multi-modal document parsing, and file generation automatically in the background.
          </p>

          <div className="mt-8 space-y-5">
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
              <div key={i} className="flex gap-3.5 group">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-purple-600 dark:text-purple-400">
                  <item.icon size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swarm Pipeline Visualizer Card */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121215] p-5 shadow-sm">
          <div className="rounded-xl border border-slate-800 bg-[#09090b] p-5 text-white">
            
            <div className="flex items-center justify-between mb-5 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600 text-white shadow-sm">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Agentra Swarm Engine</h4>
                  <p className="text-[10px] text-emerald-400 font-mono">● Active Pipeline Dispatch</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                Worker Pool: 6/6
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { step: 1, name: "PDF Agent", task: "Extracting structured tables & citations", status: "Complete" },
                { step: 2, name: "Search Agent", task: "Verifying live sources & facts online", status: "Complete" },
                { step: 3, name: "Coding Master", task: "Synthesizing production API routes", status: "Executing" },
                { step: 4, name: "Web Builder", task: "Rendering Tailwind UI components", status: "Queued" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] p-2.5 text-xs font-medium border border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <span className="text-slate-200 font-semibold">{item.name}: </span>
                      <span className="text-slate-400 font-normal">{item.task}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
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
    </section>
  );
}
