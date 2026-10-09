import { createFileRoute, Link } from "@tanstack/react-router";
import { money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const products = useShop((state) => state.products);
  const sales = useShop((state) => state.sales);
  const settings = useShop((state) => state.settings);
  const needle = q.trim().toLowerCase();
  const productHits = needle
    ? products.filter((product) => `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(needle))
    : products;
  const saleHits = needle
    ? sales.filter((sale) => `${sale.receiptNo} ${sale.customerName}`.toLowerCase().includes(needle))
    : [];

  return (
    <Page kicker="Floor" title={needle ? `Results for “${q.trim()}”` : "Search"}>
      <h2 className="mb-2 text-lg font-semibold">Products</h2>
      <ul className="grid gap-2">
        {productHits.map((product) => (
          <li key={product.id} className="card flex items-center justify-between px-4 py-3">
            <span>
              <span className="block font-semibold">{product.name}</span>
              <span className="text-sm text-muted">
                {product.sku} · {product.stock} in stock
              </span>
            </span>
            <span className="num">{money(product.priceSell, settings.currency)}</span>
          </li>
        ))}
      </ul>
      {productHits.length === 0 ? <p className="text-sm text-muted">No products.</p> : null}
      {saleHits.length > 0 ? (
        <>
          <h2 className="mt-6 mb-2 text-lg font-semibold">Receipts</h2>
          <ul className="grid gap-2">
            {saleHits.map((sale) => (
              <li key={sale.id}>
                <Link to="/receipts/$id" params={{ id: sale.id }} className="card flex items-center justify-between px-4 py-3">
                  <span>
                    {sale.receiptNo} · {sale.customerName}
                  </span>
                  <span className="num">{money(sale.grandTotal, settings.currency)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </Page>
  );
}
