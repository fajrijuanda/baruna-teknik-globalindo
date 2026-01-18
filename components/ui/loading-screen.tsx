"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center justify-center">
                {/* Logo Animation */}
                <motion.div
                    className="relative h-24 w-24 mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="absolute inset-0 border-4 border-blue-600 rounded-xl"
                        animate={{
                            rotate: [0, 90, 180, 270, 360],
                            borderRadius: ["20%", "50%", "20%", "50%", "20%"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />
                    <div className="absolute inset-2 flex items-center justify-center">
                        <div className="relative h-12 w-12">
                            <Image
                                src="/images/logo.png"
                                alt="Loading..."
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Text Animation */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <span className="text-lg font-bold font-oswald text-slate-800 dark:text-white tracking-wider">
                        BARUNA TEKNIK
                    </span>
                    <div className="flex gap-1">
                        <motion.div
                            className="h-2 w-2 rounded-full bg-blue-600"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                            className="h-2 w-2 rounded-full bg-blue-600"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                            className="h-2 w-2 rounded-full bg-blue-600"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
