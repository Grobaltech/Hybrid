import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";
import { money, roundMoney } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Banner, Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/sell")({
  component: SellPage,
});

type CartLine = { productId: string; qty: number; actualPrice: number };

function SellPage() {
  const products = useShop((state) => state.products);
  const settings = useShop((state) => state.settings);
  const completeSale = useShop((state) => state.completeSale);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customer, setCustomer] = useState("");
  const [payment, setPayment] = useState<"cash" | "credit">("cash");
  const [tax, setTax] = useState(settings.taxRate);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const pool = needle
      ? products.filter((product) =>
          `${product.name} ${product.sku} ${product.barcode} ${product.category}`.toLowerCase().includes(needle),
        )
      : products;
    return pool.slice(0, 8);
  }, [products, query]);

  function add(productId: string) {
    const product = products.find((row) => row.id === productId);
    if (!product || product.stock <= 0) return;
    setCart((lines) => {
      const existing = lines.find((line) => line.productId === productId);
      if (existing) {
        return lines.map((line) =>
          line.productId === productId ? { ...line, qty: Math.min(product.stock, line.qty + 1) } : line,
        );
      }
      return [...lines, { productId, qty: 1, actualPrice: product.priceSell }];
    });
    setQuery("");
    setError("");
  }

  const detailed = cart
    .map((line) => {
      const product = products.find((row) => row.id === line.productId);
      if (!product) return null;
      return { ...line, product, lineTotal: roundMoney(line.actualPrice * line.qty) };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
  const subtotal = roundMoney(detailed.reduce((total, line) => total + line.lineTotal, 0));
  const taxAmount = roundMoney(subtotal * (Math.max(0, tax) / 100));
  const grand = roundMoney(subtotal + taxAmount);

  function charge() {
    const result = completeSale({
      items: detailed.map((line) => ({
        productId: line.productId,
        qty: line.qty,
        actualPrice: line.actualPrice,
      })),
      customerName: customer,
      payment,
      taxRate: tax,
      notes,
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success("Sale saved");
    void navigate({ to: "/receipts/$id", params: { id: result.saleId } });
  }

  return (
    <Page kicker="Floor" title="New sale">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="card p-4">
          <label className="block text-sm">
            <span className="mb-1 block font-semibold">Find a product</span>
            <input
              className="field"
              value={query}
              autoFocus
              placeholder="Name or SKU"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <ul className="mt-3 grid gap-2">
            {matches.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  className="btn btn-line w-full justify-between"
                  disabled={product.stock <= 0}
                  onClick={() => add(product.id)}
                >
                  <span className="text-left">
                    <span className="block">{product.name}</span>
                    <span className="text-sm font-medium text-muted">
                      {product.sku} · {product.stock} in stock
                    </span>
                  </span>
                  <span className="num">{money(product.priceSell, settings.currency)}</span>
                </button>
              </li>
            ))}
            {matches.length === 0 ? <li className="text-sm text-muted">Nothing matches that search.</li> : null}
          </ul>

          <div className="mt-5 grid gap-3">
            {detailed.length === 0 ? <p className="text-sm text-muted">Cart is empty.</p> : null}
            {detailed.map((line) => (
              <article key={line.productId} className="rounded-xl border border-line p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{line.product.name}</p>
                    <p className="text-sm text-muted">{line.product.sku}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    aria-label={`Remove ${line.product.name}`}
                    onClick={() => setCart((rows) => rows.filter((row) => row.productId !== line.productId))}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="btn btn-line btn-sm"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        setCart((rows) =>
                          rows.map((row) =>
                            row.productId === line.productId ? { ...row, qty: Math.max(1, row.qty - 1) } : row,
                          ),
                        )
                      }
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="num w-8 text-center">{line.qty}</span>
                    <button
                      type="button"
                      className="btn btn-line btn-sm"
                      aria-label="Increase quantity"
                      onClick={() =>
                        setCart((rows) =>
                          rows.map((row) =>
                            row.productId === line.productId
                              ? { ...row, qty: Math.min(line.product.stock, row.qty + 1) }
                              : row,
                          ),
                        )
                      }
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <label className="text-sm">
                    <span className="sr-only">Actual price</span>
                    <input
                      className="field w-32"
                      type="number"
                      min={0}
                      inputMode="decimal"
                      value={line.actualPrice}
                      onChange={(event) =>
                        setCart((rows) =>
                          rows.map((row) =>
                            row.productId === line.productId
                              ? { ...row, actualPrice: Number(event.target.value) }
                              : row,
                          ),
                        )
                      }
                    />
                  </label>
                  <span className="num ml-auto font-semibold">{money(line.lineTotal, settings.currency)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="card h-fit p-4 lg:sticky lg:top-20">
          <label className="block text-sm">
            <span className="mb-1 block font-semibold">Customer</span>
            <input className="field" value={customer} placeholder="Walk-in if empty" onChange={(event) => setCustomer(event.target.value)} />
          </label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["cash", "credit"] as const).map((method) => (
              <button
                key={method}
                type="button"
                className={payment === method ? "btn btn-navy" : "btn btn-line"}
                onClick={() => setPayment(method)}
              >
                {method === "cash" ? "Cash" : "Credit"}
              </button>
            ))}
          </div>
          <label className="mt-3 block text-sm">
            <span className="mb-1 block font-semibold">Tax %</span>
            <input className="field" type="number" min={0} step="0.01" value={tax} onChange={(event) => setTax(Number(event.target.value))} />
          </label>
          <label className="mt-3 block text-sm">
            <span className="mb-1 block font-semibold">Note</span>
            <input className="field" value={notes} onChange={(event) => setNotes(event.target.value)} />
          </label>
          <dl className="mt-4 grid gap-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="num">{money(subtotal, settings.currency)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tax</dt>
              <dd className="num">{money(taxAmount, settings.currency)}</dd>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd className="num">{money(grand, settings.currency)}</dd>
            </div>
          </dl>
          {error ? (
            <div className="mt-3">
              <Banner tone="danger">{error}</Banner>
            </div>
          ) : null}
          <button type="button" className="btn btn-primary mt-4 w-full" disabled={detailed.length === 0} onClick={charge}>
            Charge {money(grand, settings.currency)}
          </button>
        </aside>
      </div>
    </Page>
  );
}
