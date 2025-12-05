"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Calendar, Youtube, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PodcastsClientPage({ data }: { data: any }) {
    const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);

    const toggleEpisode = (id: string) => {
        setExpandedEpisode(expandedEpisode === id ? null : id);
    };

    if (!data) return <div>Loading...</div>;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#06113d] via-[#06113d] to-[#0a1a5c] text-white py-24 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e3171e]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e3171e]/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
                        >
                            <Youtube className="w-4 h-4 text-[#e3171e]" />
                            {data.hero.tag}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            {data.hero.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-slate-300 leading-relaxed"
                        >
                            {data.hero.subtitle}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="relative z-20 -mt-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6"
                    >
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-[#e3171e]">{data.stats.totalEpisodes}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Episodes</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#e3171e]">{data.stats.totalListeners}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Listeners</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-[#e3171e]">{data.stats.avgDuration}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Avg Duration</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Description */}
            <section className="py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                        {data.description}
                    </motion.p>
                </div>
            </section>

            {/* Episodes Grid */}
            <section className="pb-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Latest Episodes</h2>
                        <p className="text-slate-600 dark:text-slate-300">Watch and learn from our latest discussions</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {data.episodes.map((episode: any, index: number) => (
                            <motion.article
                                key={episode.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                            >
                                {/* YouTube Thumbnail */}
                                <div className="relative aspect-video bg-slate-200 dark:bg-slate-700 group cursor-pointer">
                                    <img
                                        src={`https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg`}
                                        alt={episode.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-16 h-16 rounded-full bg-[#e3171e] flex items-center justify-center group-hover:scale-110 transition-transform"
                                        >
                                            <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                        </a>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {episode.duration}
                                    </div>
                                </div>

                                {/* Episode Info */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(episode.publishedDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#e3171e] transition-colors">
                                        {episode.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                                        {episode.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {episode.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Expandable Highlights */}
                                    <div>
                                        <button
                                            onClick={() => toggleEpisode(episode.id)}
                                            className="flex items-center gap-2 text-sm font-semibold text-[#06113d] dark:text-[#e3171e] hover:gap-3 transition-all"
                                        >
                                            {expandedEpisode === episode.id ? 'Hide' : 'Show'} Episode Highlights
                                            {expandedEpisode === episode.id ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </button>

                                        <motion.div
                                            initial={false}
                                            animate={{ height: expandedEpisode === episode.id ? 'auto' : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <ul className="mt-4 space-y-2 pl-5">
                                                {episode.highlights.map((highlight: string, i: number) => (
                                                    <li
                                                        key={i}
                                                        className="text-sm text-slate-600 dark:text-slate-400 list-disc"
                                                    >
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#06113d] to-[#0a1a5c] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4 text-[#e3171e]" />
                            Stay Updated
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {data.cta.title}
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            {data.cta.description}
                        </p>
                        <motion.a
                            href={data.cta.buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e3171e] hover:bg-[#c41218] text-white rounded-xl font-semibold transition-colors"
                        >
                            <Youtube className="w-5 h-5" />
                            {data.cta.buttonText}
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
