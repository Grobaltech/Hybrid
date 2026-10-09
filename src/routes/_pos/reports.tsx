import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { canSeeCost } from "@/lib/pos/access";
import { dayKey, formatDay, inSpan, money, sum, type Span } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page, SpanChips, Stat } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const sales = useShop((state) => state.sales);
  const settings = useShop((state) => state.settings);
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const [span, setSpan] = useState<Span>("all");
  const rows = sales.filter((sale) => inSpan(sale.createdAt, span));
  const seeCost = user ? canSeeCost(user.role) : false;
  const byDay = new Map<string, { day: string; sales: number; profit: number }>();
  for (const sale of rows) {
    const key = dayKey(sale.createdAt);
    const current = byDay.get(key) ?? { day: formatDay(key), sales: 0, profit: 0 };
    current.sales += sale.grandTotal;
    current.profit += sale.profit;
    byDay.set(key, current);
  }
  const chart = [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);

  return (
    <Page kicker="Books" title="Reports" action={<SpanChips value={span} onChange={setSpan} />}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Sales" value={money(sum(rows.map((sale) => sale.grandTotal)), settings.currency)} hint={`${rows.length} receipts`} />
        <Stat label="Cash" value={money(sum(rows.filter((sale) => sale.paymentMethod === "cash").map((sale) => sale.grandTotal)), settings.currency)} />
        {seeCost ? (
          <Stat label="Profit" value={money(sum(rows.map((sale) => sale.profit)), settings.currency)} />
        ) : (
          <Stat label="Credit" value={money(sum(rows.filter((sale) => sale.paymentMethod === "credit").map((sale) => sale.grandTotal)), settings.currency)} />
        )}
      </div>
      <section className="card mt-4 p-4">
        <h2 className="mb-3 text-lg font-semibold">Sales by day</h2>
        {chart.length === 0 ? (
          <p className="text-sm text-muted">No sales in this range.</p>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} width={48} />
                <Tooltip formatter={(value) => money(Number(value), settings.currency)} />
                <Bar dataKey="sales" fill="var(--color-primary)" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </Page>
  );
}
