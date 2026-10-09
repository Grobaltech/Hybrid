import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { canSeeCost } from "@/lib/pos/access";
import { money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import type { Product } from "@/lib/pos/types";
import { Banner, Modal, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/products")({
  component: ProductsPage,
});

const blank = {
  id: "",
  sku: "",
  name: "",
  category: "Screens",
  priceCost: 0,
  priceSell: 0,
  stock: 0,
  barcode: "",
};

function ProductsPage() {
  const products = useShop((state) => state.products);
  const settings = useShop((state) => state.settings);
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const upsertProduct = useShop((state) => state.upsertProduct);
  const deleteProduct = useShop((state) => state.deleteProduct);
  const seeCost = user ? canSeeCost(user.role) : false;
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<typeof blank | null>(null);
  const [error, setError] = useState("");

  const shown = products.filter((product) =>
    `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function open(product?: Product) {
    setError("");
    setDraft(
      product
        ? {
            id: product.id,
            sku: product.sku,
            name: product.name,
            category: product.category,
            priceCost: product.priceCost,
            priceSell: product.priceSell,
            stock: product.stock,
            barcode: product.barcode,
          }
        : { ...blank },
    );
  }

  function save() {
    if (!draft) return;
    const result = upsertProduct(draft);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success("Product saved");
    setDraft(null);
  }

  return (
    <Page
      kicker="Stock"
      title="Products"
      action={
        <button type="button" className="btn btn-primary" onClick={() => open()}>
          Add product
        </button>
      }
    >
      <input className="field mb-4 max-w-md" placeholder="Filter the shelf" value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {shown.map((product) => (
          <li key={product.id}>
            <button type="button" className="card w-full p-4 text-left" onClick={() => open(product)}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted">
                    {product.sku} · {product.category}
                  </p>
                </div>
                <p className="num text-lg font-semibold">{money(product.priceSell, settings.currency)}</p>
              </div>
              <p className="mt-3 text-sm">
                In stock <span className={product.stock <= settings.lowStock ? "num font-semibold text-warn" : "num font-semibold"}>{product.stock}</span>
                {seeCost ? <span className="text-muted"> · cost {money(product.priceCost, settings.currency)}</span> : null}
              </p>
            </button>
          </li>
        ))}
      </ul>
      {shown.length === 0 ? <p className="mt-4 text-sm text-muted">No products match.</p> : null}

      <Modal open={Boolean(draft)} title={draft?.id ? "Edit product" : "New product"} onClose={() => setDraft(null)}>
        {draft ? (
          <div className="grid gap-3">
            <TextField label="SKU" value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} />
            <TextField label="Name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            <TextField label="Category" list="categories" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
            <datalist id="categories">
              <option value="Screens" />
              <option value="Batteries" />
              <option value="Ports" />
              <option value="Accessories" />
            </datalist>
            <div className="grid grid-cols-2 gap-3">
              {seeCost ? (
                <TextField label="Cost" type="number" min={0} value={draft.priceCost} onChange={(event) => setDraft({ ...draft, priceCost: Number(event.target.value) })} />
              ) : null}
              <TextField label="Sell price" type="number" min={0} value={draft.priceSell} onChange={(event) => setDraft({ ...draft, priceSell: Number(event.target.value) })} />
              <TextField label="Stock" type="number" min={0} value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: Number(event.target.value) })} />
              <TextField label="Barcode" value={draft.barcode} onChange={(event) => setDraft({ ...draft, barcode: event.target.value })} />
            </div>
            {error ? <Banner tone="danger">{error}</Banner> : null}
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary" onClick={save}>
                Save
              </button>
              {draft.id ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    const result = deleteProduct(draft.id);
                    if (!result.ok) {
                      setError(result.error);
                      return;
                    }
                    toast.success("Product removed");
                    setDraft(null);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </Page>
  );
}
