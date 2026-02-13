/**
 * Device Capabilities Detection
 * Analyzes GPU, screen resolution, and device type to determine optimal 3D quality settings
 */

export type QualityPreset = 'high' | 'medium' | 'low' | 'minimal';

interface DeviceCapabilities {
    quality: QualityPreset;
    isMobile: boolean;
    pixelRatio: number;
    supportsWebGL2: boolean;
    particleCount: number;
    shadowsEnabled: boolean;
    postProcessingEnabled: boolean;
}

/**
 * Detects device capabilities and returns optimal quality settings
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
    // Default to minimal for SSR
    if (typeof window === 'undefined') {
        return {
            quality: 'minimal',
            isMobile: false,
            pixelRatio: 1,
            supportsWebGL2: false,
            particleCount: 100,
            shadowsEnabled: false,
            postProcessingEnabled: false,
        };
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    ) || window.innerWidth < 768;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    // Check WebGL2 support
    const canvas = document.createElement('canvas');
    const supportsWebGL2 = !!(canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2'));

    // Screen size factor
    const screenArea = window.innerWidth * window.innerHeight;
    const isHighRes = screenArea > 2073600; // > 1920x1080

    // Estimate GPU tier based on available metrics
    let quality: QualityPreset = 'medium';

    if (isMobile) {
        // Mobile devices - prioritize battery and performance
        quality = 'low';
    } else if (supportsWebGL2 && isHighRes && pixelRatio >= 2) {
        // High-end desktop with retina display
        quality = 'high';
    } else if (supportsWebGL2) {
        // Standard desktop
        quality = 'medium';
    } else {
        // Older devices without WebGL2
        quality = 'low';
    }

    // Battery API check (reduce quality on battery power)
    if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
            if (!battery.charging && battery.level < 0.3) {
                quality = 'low';
            }
        });
    }

    return {
        quality,
        isMobile,
        pixelRatio,
        supportsWebGL2,
        particleCount: getParticleCount(quality, isMobile),
        shadowsEnabled: quality === 'high',
        postProcessingEnabled: quality === 'high' || quality === 'medium',
    };
}

/**
 * Returns optimal particle count based on quality preset
 */
function getParticleCount(quality: QualityPreset, isMobile: boolean): number {
    if (isMobile) {
        return quality === 'high' ? 500 : quality === 'medium' ? 300 : 100;
    }

    switch (quality) {
        case 'high':
            return 2000;
        case 'medium':
            return 1000;
        case 'low':
            return 500;
        case 'minimal':
            return 100;
        default:
            return 1000;
    }
}

/**
 * Monitors frame rate and suggests quality adjustments
 */
export class PerformanceMonitor {
    private frameTimes: number[] = [];
    private lastTime = performance.now();
    private readonly maxSamples = 60;

    update() {
        const now = performance.now();
        const delta = now - this.lastTime;
        this.lastTime = now;

        this.frameTimes.push(delta);
        if (this.frameTimes.length > this.maxSamples) {
            this.frameTimes.shift();
        }
    }

    getAverageFPS(): number {
        if (this.frameTimes.length === 0) return 60;
        const avgDelta = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
        return Math.round(1000 / avgDelta);
    }

    shouldReduceQuality(): boolean {
        return this.getAverageFPS() < 30;
    }

    shouldIncreaseQuality(): boolean {
        return this.getAverageFPS() >= 55;
    }
}
