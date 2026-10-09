import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { formatWhen, money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/receipts")({
  component: ReceiptsPage,
});

function ReceiptsPage() {
  const sales = useShop((state) => state.sales);
  const settings = useShop((state) => state.settings);
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState<"all" | "cash" | "credit">("all");
  const shown = sales.filter((sale) => {
    const hay = `${sale.receiptNo} ${sale.customerName} ${sale.username}`.toLowerCase();
    const matches = hay.includes(query.trim().toLowerCase());
    return matches && (method === "all" || sale.paymentMethod === method);
  });

  return (
    <Page kicker="Floor" title="Receipts">
      <div className="mb-4 flex flex-wrap gap-2">
        <input className="field max-w-sm" placeholder="Receipt, customer, cashier" value={query} onChange={(event) => setQuery(event.target.value)} />
        {(["all", "cash", "credit"] as const).map((option) => (
          <button key={option} type="button" className={method === option ? "btn btn-navy btn-sm" : "btn btn-line btn-sm"} onClick={() => setMethod(option)}>
            {option}
          </button>
        ))}
      </div>
      <ul className="grid gap-2">
        {shown.map((sale) => (
          <li key={sale.id}>
            <Link to="/receipts/$id" params={{ id: sale.id }} className="card flex items-center justify-between gap-3 px-4 py-3">
              <span>
                <span className="block font-semibold">{sale.receiptNo}</span>
                <span className="text-sm text-muted">
                  {sale.customerName} · {sale.paymentMethod} · {formatWhen(sale.createdAt)}
                </span>
              </span>
              <span className="num font-semibold">{money(sale.grandTotal, settings.currency)}</span>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 ? <p className="mt-4 text-sm text-muted">No receipts match.</p> : null}
    </Page>
  );
}
