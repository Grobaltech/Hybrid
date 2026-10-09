import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { canSeeCost } from "@/lib/pos/access";
import { dayKey, formatDay, inSpan, money, sum, type Span } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page, SpanChips, Stat } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/balance")({
  component: BalancePage,
});

function BalancePage() {
  const sales = useShop((state) => state.sales);
  const expenses = useShop((state) => state.expenses);
  const products = useShop((state) => state.products);
  const settings = useShop((state) => state.settings);
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const [span, setSpan] = useState<Span>("all");
  const seeCost = user ? canSeeCost(user.role) : false;
  const inSales = sales.filter((sale) => inSpan(sale.createdAt, span));
  const inExpenses = expenses.filter((expense) => inSpan(`${expense.date}T12:00:00`, span));
  const totalSales = sum(inSales.map((sale) => sale.grandTotal));
  const creditSales = sum(inSales.filter((sale) => sale.paymentMethod === "credit").map((sale) => sale.grandTotal));
  const cashSales = totalSales - creditSales;
  const expenseSum = sum(inExpenses.map((expense) => expense.amount));
  const cashAtHand = cashSales - expenseSum;
  const stockCost = sum(products.map((product) => product.priceCost * product.stock));

  const days = new Map<string, { cash: number; credit: number; profit: number }>();
  for (const sale of inSales) {
    const key = dayKey(sale.createdAt);
    const row = days.get(key) ?? { cash: 0, credit: 0, profit: 0 };
    if (sale.paymentMethod === "cash") row.cash += sale.grandTotal;
    else row.credit += sale.grandTotal;
    row.profit += sale.profit;
    days.set(key, row);
  }

  return (
    <Page kicker="Books" title="Balance" action={<SpanChips value={span} onChange={setSpan} />}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Cash sales" value={money(cashSales, settings.currency)} />
        <Stat label="Credit sales" value={money(creditSales, settings.currency)} />
        <Stat label="Expenses" value={money(expenseSum, settings.currency)} />
        <Stat label="Cash at hand" value={money(cashAtHand, settings.currency)} hint="Cash sales minus expenses" />
      </div>
      {seeCost ? (
        <div className="mt-3">
          <Stat label="Stock on hand, at cost" value={money(stockCost, settings.currency)} hint="Not subtracted from cash" />
        </div>
      ) : null}
      <ul className="mt-4 grid gap-2">
        {[...days.entries()]
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([key, row]) => (
            <li key={key} className="card grid gap-1 px-4 py-3 sm:grid-cols-4">
              <p className="font-semibold">{formatDay(key)}</p>
              <p className="text-sm">Cash {money(row.cash, settings.currency)}</p>
              <p className="text-sm">Credit {money(row.credit, settings.currency)}</p>
              {seeCost ? <p className="text-sm">Profit {money(row.profit, settings.currency)}</p> : <p />}
            </li>
          ))}
      </ul>
    </Page>
  );
}
