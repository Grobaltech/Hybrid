import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatWhen, money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Banner, Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/credits")({
  component: CreditsPage,
});

function CreditsPage() {
  const credits = useShop((state) => state.credits);
  const settings = useShop((state) => state.settings);
  const payCredit = useShop((state) => state.payCredit);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const open = credits.filter((credit) => credit.status === "open");
  const closed = credits.filter((credit) => credit.status === "closed");

  return (
    <Page kicker="Books" title="Customer credit">
      {error ? <Banner tone="danger">{error}</Banner> : null}
      <ul className="mt-3 grid gap-3">
        {open.map((credit) => (
          <li key={credit.id} className="card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{credit.customerName}</p>
                <p className="text-sm text-muted">
                  <Link to="/receipts/$id" params={{ id: credit.saleId }} className="text-primary">
                    {credit.receiptNo}
                  </Link>{" "}
                  · opened {formatWhen(credit.createdAt)}
                </p>
              </div>
              <p className="num text-xl font-semibold">{money(credit.balance, settings.currency)}</p>
            </div>
            <form
              className="mt-3 flex flex-wrap gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const result = payCredit(credit.id, Number(amounts[credit.id] ?? 0), notes[credit.id] ?? "");
                if (!result.ok) {
                  setError(result.error);
                  return;
                }
                setError("");
                setAmounts((current) => ({ ...current, [credit.id]: "" }));
                toast.success("Payment recorded");
              }}
            >
              <input
                className="field max-w-40"
                type="number"
                min={1}
                placeholder="Amount"
                aria-label={`Payment for ${credit.customerName}`}
                value={amounts[credit.id] ?? ""}
                onChange={(event) => setAmounts((current) => ({ ...current, [credit.id]: event.target.value }))}
              />
              <input
                className="field max-w-56"
                placeholder="Note"
                value={notes[credit.id] ?? ""}
                onChange={(event) => setNotes((current) => ({ ...current, [credit.id]: event.target.value }))}
              />
              <button className="btn btn-primary" type="submit">
                Record payment
              </button>
            </form>
          </li>
        ))}
      </ul>
      {open.length === 0 ? <p className="mt-3 text-sm text-muted">No open credit.</p> : null}
      {closed.length > 0 ? (
        <section className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Cleared</h2>
          <ul className="grid gap-2">
            {closed.map((credit) => (
              <li key={credit.id} className="flex items-center justify-between text-sm text-muted">
                <span>
                  {credit.customerName} · {credit.receiptNo}
                </span>
                <span className="num">{money(credit.amount, settings.currency)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Page>
  );
}
