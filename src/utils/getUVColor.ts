export function getUVColor(uv: number): string {
    if (uv <= 3) return "text-emerald-400";
    if (uv <= 5) return "text-yellow-400";
    if (uv <= 8) return "text-orange-400";
    return "text-violet-900";
}
