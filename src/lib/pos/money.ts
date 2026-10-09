export function roundMoney(amount: number): number {
  return Math.round((Number.isFinite(amount) ? amount : 0) * 100) / 100;
}

export function money(amount: number, currency = "UGX"): string {
  const n = roundMoney(amount);
  return `${currency} ${Math.round(n).toLocaleString("en-UG")}`;
}

export function sum(values: number[]): number {
  return roundMoney(values.reduce((total, value) => total + value, 0));
}

export function dayKey(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayKey(now = new Date()): string {
  return dayKey(now);
}

export function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-UG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDay(isoOrKey: string): string {
  const date = isoOrKey.length <= 10 ? new Date(`${isoOrKey}T12:00:00`) : new Date(isoOrKey);
  if (Number.isNaN(date.getTime())) return isoOrKey;
  return date.toLocaleDateString("en-UG", { day: "numeric", month: "short", year: "numeric" });
}

export type Span = "today" | "month" | "year" | "all";

export function spanRange(span: Span, now = new Date()): { from: string; to: string } | null {
  if (span === "all") return null;
  if (span === "today") {
    const key = todayKey(now);
    return { from: key, to: key };
  }
  if (span === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from: dayKey(start), to: dayKey(end) };
  }
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);
  return { from: dayKey(start), to: dayKey(end) };
}

export function inSpan(iso: string, span: Span, now = new Date()): boolean {
  const range = spanRange(span, now);
  if (!range) return true;
  const key = dayKey(iso);
  return key >= range.from && key <= range.to;
}

export function uid(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
