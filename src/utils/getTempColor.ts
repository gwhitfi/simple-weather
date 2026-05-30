export function getTempColor(temp: number): string {
    if (temp <= 50) return "text-blue-500";
    if (temp <= 65) return "text-cyan-500";
    if (temp <= 75) return "text-emerald-500";
    if (temp <= 85) return "text-amber-500";
    if (temp <= 95) return "text-orange-500";
    return "text-red-500";
}
