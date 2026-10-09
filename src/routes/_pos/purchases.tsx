import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatWhen, money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Banner, Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/purchases")({
  component: PurchasesPage,
});

type Line = { productId: string; packs: number; packSize: number; loose: number; unitCost: number };

function PurchasesPage() {
  const products = useShop((state) => state.products);
  const suppliers = useShop((state) => state.suppliers);
  const purchases = useShop((state) => state.purchases);
  const settings = useShop((state) => state.settings);
  const createPurchase = useShop((state) => state.createPurchase);
  const receivePurchase = useShop((state) => state.receivePurchase);
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState<"ordered" | "received">("received");
  const [lines, setLines] = useState<Line[]>([
    { productId: products[0]?.id ?? "", packs: 1, packSize: 1, loose: 0, unitCost: products[0]?.priceCost ?? 0 },
  ]);
  const [error, setError] = useState("");

  function save() {
    const result = createPurchase({ supplierId, reference, status, items: lines });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success(status === "received" ? "Stock received" : "Order saved");
    setReference("");
    setError("");
  }

  return (
    <Page kicker="Stock" title="Purchases">
      <section className="card p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block font-semibold">Supplier</span>
            <select className="field" value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
              <option value="">No supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold">Reference</span>
            <input className="field" value={reference} onChange={(event) => setReference(event.target.value)} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold">Status</span>
            <select className="field" value={status} onChange={(event) => setStatus(event.target.value as "ordered" | "received")}>
              <option value="received">Receive now</option>
              <option value="ordered">Order only</option>
            </select>
          </label>
        </div>
        <ul className="mt-4 grid gap-3">
          {lines.map((line, index) => {
            const qty = Math.max(0, line.packs) * Math.max(1, line.packSize) + Math.max(0, line.loose);
            return (
              <li key={index} className="grid gap-2 rounded-xl bg-paper p-3 sm:grid-cols-6">
                <label className="text-sm sm:col-span-2">
                  <span className="mb-1 block font-semibold">Product</span>
                  <select
                    className="field"
                    value={line.productId}
                    onChange={(event) => {
                      const product = products.find((row) => row.id === event.target.value);
                      setLines((rows) =>
                        rows.map((row, i) =>
                          i === index ? { ...row, productId: event.target.value, unitCost: product?.priceCost ?? row.unitCost } : row,
                        ),
                      );
                    }}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Num label="Packs" value={line.packs} onChange={(packs) => setLines((rows) => rows.map((row, i) => (i === index ? { ...row, packs } : row)))} />
                <Num label="Pack size" value={line.packSize} onChange={(packSize) => setLines((rows) => rows.map((row, i) => (i === index ? { ...row, packSize } : row)))} />
                <Num label="Loose" value={line.loose} onChange={(loose) => setLines((rows) => rows.map((row, i) => (i === index ? { ...row, loose } : row)))} />
                <Num label="Unit cost" value={line.unitCost} onChange={(unitCost) => setLines((rows) => rows.map((row, i) => (i === index ? { ...row, unitCost } : row)))} />
                <p className="text-sm text-muted sm:col-span-6">
                  {qty} units · {money(qty * line.unitCost, settings.currency)}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-line"
            onClick={() =>
              setLines((rows) => [
                ...rows,
                { productId: products[0]?.id ?? "", packs: 1, packSize: 1, loose: 0, unitCost: products[0]?.priceCost ?? 0 },
              ])
            }
          >
            Add line
          </button>
          <button type="button" className="btn btn-primary" onClick={save}>
            Save purchase
          </button>
        </div>
        {error ? (
          <div className="mt-3">
            <Banner tone="danger">{error}</Banner>
          </div>
        ) : null}
      </section>

      <ul className="mt-4 grid gap-3">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {purchase.reference || "No reference"} · {purchase.supplierName}
                </p>
                <p className="text-sm text-muted">
                  {formatWhen(purchase.createdAt)} · {purchase.status}
                </p>
              </div>
              <p className="num text-lg font-semibold">{money(purchase.total, settings.currency)}</p>
            </div>
            <ul className="mt-2 text-sm text-muted">
              {purchase.items.map((item) => (
                <li key={item.id}>
                  {item.name} · {item.quantity} @ {money(item.unitCost, settings.currency)}
                </li>
              ))}
            </ul>
            {purchase.status === "ordered" ? (
              <button
                type="button"
                className="btn btn-navy btn-sm mt-3"
                onClick={() => {
                  const result = receivePurchase(purchase.id);
                  if (!result.ok) toast.error(result.error);
                  else toast.success("Stock updated");
                }}
              >
                Receive into stock
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </Page>
  );
}

function Num({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      <input className="field" type="number" min={0} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
