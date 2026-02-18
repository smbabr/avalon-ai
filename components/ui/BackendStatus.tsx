"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Backend Status Indicator
 * Provides real-time visual proof of the full-stack architecture
 */
export default function BackendStatus() {
    const [status, setStatus] = useState<"connecting" | "online" | "offline">("connecting");
    const [latency, setLatency] = useState<number | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            const start = performance.now();
            try {
                const response = await fetch("/api/status");
                const data = await response.json();

                if (response.ok && data.status === "online") {
                    setLatency(Math.round(performance.now() - start));
                    setStatus("online");
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
                <div className={`w-1.5 h-1.5 rounded-full ${status === "online" ? "bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" :
                    status === "connecting" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-avalon-text-secondary">
                    SYSTEM_{status === "online" ? "ONLINE" : status === "connecting" ? "CONNECTING" : "OFFLINE"}
                </span>
            </div>

            {status === "online" && latency && (
                <div className="h-3 w-px bg-avalon-surface-alt" />
            )}

            {status === "online" && latency && (
                <span className="text-[10px] font-mono text-avalon-accent/60">
                    {latency}ms_RTT
                </span>
            )}
        </div>
    );
}
