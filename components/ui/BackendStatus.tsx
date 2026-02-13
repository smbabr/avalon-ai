"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Backend Status Indicator
 * Provides real-time visual proof of the full-stack architecture
 */
export default function BackendStatus() {
    const [status, setStatus] = useState<"connecting" | "live" | "offline">("connecting");
    const [latency, setLatency] = useState<number | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            const start = performance.now();
            try {
                const response = await fetch("/api/nodes");
                if (response.ok) {
                    setLatency(Math.round(performance.now() - start));
                    setStatus("live");
                } else {
                    setStatus("offline");
                }
            } catch {
                setStatus("offline");
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-4 px-4 py-2 bg-avalon-surface/30 backdrop-blur-sm border border-avalon-surface-alt rounded-sm">
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${status === "live" ? "bg-avalon-accent animate-pulse" :
                        status === "connecting" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-avalon-text-secondary">
                    System_{status === "live" ? "Live" : status}
                </span>
            </div>

            {status === "live" && latency && (
                <div className="h-3 w-px bg-avalon-surface-alt" />
            )}

            {status === "live" && latency && (
                <span className="text-[10px] font-mono text-avalon-accent/60">
                    {latency}ms_Rtt
                </span>
            )}
        </div>
    );
}
