import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal, Shield, BarChart3, Database, Globe, Lock, ScrollText, Search, Code2, Cpu, Zap, Layers, Rocket, Brain, Smartphone, Activity } from "lucide-react";

export const metadata: Metadata = {
    title: "Vantaverse Developers | Agentic AI Platform",
    description: "Build smarter apps with Vantaverse AI Agents. A developer-centric platform for integrating agentic AI directly into your software stack with enterprise-grade security and observability.",
    keywords: ["AI agent software", "enterprise automation platform", "intelligent workflow automation", "secure AI agents", "production AI solutions", "Vantaverse AI platform", "agentic software for businesses", "enterprise-grade AI agents"],
};

export default function DevelopersPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#06113d] text-slate-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-200/40 dark:bg-purple-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-200/40 dark:bg-blue-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-cyan-600 dark:text-cyan-400 backdrop-blur-sm shadow-sm dark:shadow-none">
                                <Terminal className="w-4 h-4" />
                                <span>Developer Preview</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-transparent dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-white/50 dark:bg-clip-text">
                                Build Smarter Apps with <span className="text-cyan-600 dark:text-cyan-400">Vantaverse</span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                                A developer-centric platform for integrating <span className="font-semibold text-slate-900 dark:text-white">agentic AI</span> into your applications, workflows, and data systems—with security, auditability, and performance built in.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    href="https://www.vantaverse.site/"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-8 text-sm font-semibold text-white transition-all hover:bg-cyan-700 dark:hover:bg-cyan-600 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-600/20 dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                >
                                    Start Building <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-8 text-sm font-semibold text-slate-700 dark:text-white backdrop-blur-sm transition-all hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20">
                                    Read Documentation
                                </button>
                            </div>
                        </div>

                        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 hidden lg:block">
                            <div className="relative rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-md p-6 shadow-2xl dark:shadow-none overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Simulated Code/Console Interface */}
                                <div className="font-mono text-sm space-y-3 relative z-10">
                                    <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-white/10 pb-4">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <span className="text-xs text-slate-500">agent-config.yaml — Vantaverse</span>
                                    </div>

                                    <div className="text-slate-600 dark:text-slate-400">
                                        <span className="text-purple-600 dark:text-purple-400">agent:</span> <span className="text-green-600 dark:text-green-400">"DataAnalyst_01"</span>
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 pl-4">
                                        <span className="text-purple-600 dark:text-purple-400">capabilities:</span>
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 pl-8">
                                        <span className="text-slate-400 dark:text-slate-500">-</span> <span className="text-cyan-600 dark:text-cyan-400">sql_query_generation</span>
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 pl-8">
                                        <span className="text-slate-400 dark:text-slate-500">-</span> <span className="text-cyan-600 dark:text-cyan-400">chart_visualization</span>
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 pl-4">
                                        <span className="text-purple-600 dark:text-purple-400">security_level:</span> <span className="text-orange-500 dark:text-orange-400">"enterprise_high"</span>
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 pl-4">
                                        <span className="text-purple-600 dark:text-purple-400">audit_log:</span> <span className="text-blue-600 dark:text-blue-400">true</span>
                                    </div>

                                    <div className="pt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <span className="animate-pulse">➜</span> Agent validated. Ready for deployment.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Engineering Services Section (NEW) */}
                <section className="py-20 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-y border-slate-200 dark:border-white/5">
                    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                                Comprehensive Solutions
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Our Engineering Services
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Beyond the platform, we partner with visionary teams to build, scale, and optimize next-generation digital products.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
                                    title: "Web Application Development",
                                    desc: "Full-stack development using Next.js, React, and modern cloud architecture for scalable, high-performance apps."
                                },
                                {
                                    icon: <Search className="w-8 h-8 text-orange-500" />,
                                    title: "SEO-Rich Websites",
                                    desc: "Technical SEO, semantic HTML, and performance optimization ensuring your content ranks exactly where it should."
                                },
                                {
                                    icon: <Brain className="w-8 h-8 text-purple-500" />,
                                    title: "AI Agent Integration",
                                    desc: "Embedding intelligent agents into your existing workflows to automate complex decision-making tasks."
                                },
                                {
                                    icon: <Rocket className="w-8 h-8 text-cyan-500" />,
                                    title: "Business & Product Build",
                                    desc: "End-to-end consulting from MVP to IPO. We help define strategy, build technology, and scale operations."
                                }
                            ].map((service, i) => (
                                <div key={i} className="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What Developers Love */}
                <section className="py-20 transition-colors">
                    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-6">
                                What Developers Love
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Built for engineers who need control, scalability, and security—not black boxes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Cpu className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
                                    title: "Agentic AI, Built In",
                                    description: "Unlike bolted-on assistants, Vantaverse embeds agents directly into your stack, giving you fine-grained control over logic and UX."
                                },
                                {
                                    icon: <Shield className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />,
                                    title: "Enterprise Architecture",
                                    description: "RBAC, Compliance Safeguards, and Audit Logs built-in. Deploy with confidence in regulated environments."
                                },
                                {
                                    icon: <Activity className="w-8 h-8 text-green-500 dark:text-green-400" />,
                                    title: "Production Observability",
                                    description: "Detailed monitoring tools to track agent health, latency, and decision paths in real-time."
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.07] transition-all group shadow-sm dark:shadow-none">
                                    <div className="bg-slate-50 dark:bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capabilities Grid */}
                <section className="py-24 container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
                                Developer Capabilities & <span className="text-cyan-600 dark:text-cyan-400">Integrations</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <Lock className="w-6 h-6" />,
                                        title: "Secure APIs",
                                        desc: "Connect your systems and data securely to agent logic."
                                    },
                                    {
                                        icon: <Database className="w-6 h-6" />,
                                        title: "Search & AI-Ready Data",
                                        desc: "Optimize apps for discoverability and intelligent reasoning."
                                    },
                                    {
                                        icon: <Layers className="w-6 h-6" />,
                                        title: "Audit & Compliance Hooks",
                                        desc: "Ready for GDPR, HIPAA, and enterprise audits."
                                    },
                                    {
                                        icon: <BarChart3 className="w-6 h-6" />,
                                        title: "Live Monitoring",
                                        desc: "Track meaningful metrics in production environments."
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-colors">
                                        <div className="shrink-0 w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">{item.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:to-purple-500/20 blur-3xl opacity-30" />
                            <div className="relative grid grid-cols-2 gap-4">
                                <div className="space-y-4 translate-y-8">
                                    <div className="h-40 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md p-5 flex flex-col justify-between shadow-lg dark:shadow-none">
                                        <Database className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                                        <span className="text-sm font-mono text-slate-600 dark:text-slate-300">Vector DB</span>
                                    </div>
                                    <div className="h-48 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md p-5 flex flex-col justify-between shadow-lg dark:shadow-none">
                                        <Code2 className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                                        <span className="text-sm font-mono text-slate-600 dark:text-slate-300">REST API</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-48 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md p-5 flex flex-col justify-between shadow-lg dark:shadow-none">
                                        <Globe className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
                                        <span className="text-sm font-mono text-slate-600 dark:text-slate-300">Webhooks</span>
                                    </div>
                                    <div className="h-40 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md p-5 flex flex-col justify-between shadow-lg dark:shadow-none">
                                        <Zap className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
                                        <span className="text-sm font-mono text-slate-600 dark:text-slate-300">Edge Funcs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="py-20 bg-slate-100 dark:bg-gradient-to-b dark:from-transparent dark:to-black/40">
                    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">Use Cases for Developers</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Autonomous Data Queries",
                                    desc: "Let users request analytics in natural language directly from your DB.",
                                    badge: "Data"
                                },
                                {
                                    title: "Workflow Intelligence",
                                    desc: "Trigger complex sequences based on business logic with AI decision points.",
                                    badge: "Automation"
                                },
                                {
                                    title: "Insights & Summarization",
                                    desc: "Extract knowledge from unstructured sources without manual tagging.",
                                    badge: "Intelligence"
                                }
                            ].map((card, i) => (
                                <div key={i} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#0B1535] p-8 border border-slate-200 dark:border-white/5 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-lg dark:shadow-none transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-white/10 text-cyan-600 dark:text-cyan-300 mb-6">
                                        {card.badge}
                                    </span>

                                    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {card.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Getting Started CTA */}
                <section className="py-24 container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-800 to-blue-900 dark:from-cyan-900/50 dark:to-blue-900/50 border border-white/10 p-8 md:p-16 text-center shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-white">
                                Start Building with Vantaverse
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                                    <h4 className="font-semibold text-cyan-300 dark:text-cyan-400 mb-2">Explore Docs</h4>
                                    <p className="text-blue-100 dark:text-slate-400 text-sm">Access API references and integration guides.</p>
                                </div>
                                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                                    <h4 className="font-semibold text-purple-300 dark:text-purple-400 mb-2">Sandbox</h4>
                                    <p className="text-blue-100 dark:text-slate-400 text-sm">Build and test with production-grade agents.</p>
                                </div>
                                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                                    <h4 className="font-semibold text-green-300 dark:text-green-400 mb-2">Deploy</h4>
                                    <p className="text-blue-100 dark:text-slate-400 text-sm">Scale with audit logs and observability.</p>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Link
                                    href="https://www.vantaverse.site/"
                                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white text-blue-900 px-10 text-lg font-bold transition-all hover:bg-cyan-50 hover:scale-105 shadow-xl"
                                >
                                    Start Building Now <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
