"use client";

import Image from "next/image";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <div
                className="absolute inset-0 opacity-25"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.28) 1px, transparent 0)",
                    backgroundSize: "22px 22px",
                }}
            />
            <div className="absolute left-[-80px] top-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute right-[-40px] bottom-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-7 flex items-center justify-center">
                        <div className="absolute h-24 w-24 rounded-full border border-cyan-300/30 animate-spin [animation-duration:8s]" />
                        <div className="absolute h-16 w-16 rounded-full border border-blue-400/40 animate-spin [animation-duration:5s] [animation-direction:reverse]" />
                        <div className="relative h-14 w-14">
                            <Image src="/images/logo.png" alt="Loading..." fill className="object-contain" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="font-oswald text-xl tracking-[0.2em] text-slate-100">BARUNA TEKNIK</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cyan-300/90">Loading Experience</p>
                    </div>

                    <div className="mt-7">
                        <div className="loading-indeterminate h-1.5 overflow-hidden rounded-full bg-slate-700/60" />
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse [animation-delay:150ms]" />
                            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse [animation-delay:300ms]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
