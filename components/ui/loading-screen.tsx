"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.3) 1px, transparent 0)",
                    backgroundSize: "22px 22px",
                }}
            />

            <motion.div
                className="absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
                animate={{ x: [0, 80, -20], y: [0, -40, 10] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.div
                className="absolute -right-10 bottom-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
                animate={{ x: [0, -80, 10], y: [0, 40, -15] }}
                transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
            />

            <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-7 flex items-center justify-center">
                        <motion.div
                            className="absolute h-24 w-24 rounded-full border border-cyan-300/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute h-16 w-16 rounded-full border border-blue-400/40"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="relative h-14 w-14"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.45 }}
                        >
                            <Image src="/images/logo.png" alt="Loading..." fill className="object-contain" />
                        </motion.div>
                    </div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <p className="font-oswald text-xl tracking-[0.2em] text-slate-100">BARUNA TEKNIK</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cyan-300/90">Admin Dashboard</p>
                    </motion.div>

                    <div className="mt-7">
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/60">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2">
                            {[0, 1, 2].map((index) => (
                                <motion.span
                                    key={index}
                                    className="h-2 w-2 rounded-full bg-cyan-300"
                                    animate={{ opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
                                    transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.12 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
