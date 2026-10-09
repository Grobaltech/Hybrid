import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Banner, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/creditors")({
  component: CreditorsPage,
});

function CreditorsPage() {
  const creditors = useShop((state) => state.creditors);
  const settings = useShop((state) => state.settings);
  const addCreditor = useShop((state) => state.addCreditor);
  const payCreditor = useShop((state) => state.payCreditor);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [error, setError] = useState("");

  return (
    <Page kicker="Books" title="Creditors">
      <form
        className="card grid gap-3 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const result = addCreditor({ name, phone, description, totalCredit: total, amountPaid: paid });
          if (!result.ok) {
            setError(result.error);
            return;
          }
          setName("");
          setPhone("");
          setDescription("");
          setTotal(0);
          setPaid(0);
          setError("");
          toast.success("Creditor saved");
        }}
      >
        <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} required />
        <TextField label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        <TextField label="Note" value={description} onChange={(event) => setDescription(event.target.value)} />
        <TextField label="Total owed to them" type="number" min={0} value={total} onChange={(event) => setTotal(Number(event.target.value))} />
        <TextField label="Already paid" type="number" min={0} value={paid} onChange={(event) => setPaid(Number(event.target.value))} />
        <div className="flex items-end">
          <button className="btn btn-primary" type="submit">
            Save creditor
          </button>
        </div>
        {error ? (
          <div className="sm:col-span-2">
            <Banner tone="danger">{error}</Banner>
          </div>
        ) : null}
      </form>
      <ul className="mt-4 grid gap-3">
        {creditors.map((creditor) => (
          <li key={creditor.id} className="card p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{creditor.name}</p>
                <p className="text-sm text-muted">
                  {creditor.description || "No note"} {creditor.phone ? `· ${creditor.phone}` : ""}
                </p>
              </div>
              <p className="num text-lg font-semibold">{money(creditor.balance, settings.currency)}</p>
            </div>
            {creditor.balance > 0 ? (
              <form
                className="mt-3 flex flex-wrap gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const result = payCreditor(creditor.id, Number(data.get("amount")), String(data.get("note") ?? ""));
                  if (!result.ok) {
                    toast.error(result.error);
                    return;
                  }
                  event.currentTarget.reset();
                  toast.success("Repayment saved");
                }}
              >
                <input className="field max-w-40" name="amount" type="number" min={1} placeholder="Pay" aria-label="Repayment amount" required />
                <input className="field max-w-56" name="note" placeholder="Note" />
                <button className="btn btn-navy" type="submit">
                  Pay
                </button>
              </form>
            ) : (
              <p className="mt-2 text-sm text-ok">Settled</p>
            )}
          </li>
        ))}
      </ul>
    </Page>
  );
}
