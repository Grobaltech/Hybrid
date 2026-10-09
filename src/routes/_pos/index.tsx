import { createFileRoute, Link } from "@tanstack/react-router";
import { canSeeCost } from "@/lib/pos/access";
import { formatWhen, inSpan, money, sum } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page, Stat } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/")({
  component: Dashboard,
});

function Dashboard() {
  const settings = useShop((state) => state.settings);
  const products = useShop((state) => state.products);
  const sales = useShop((state) => state.sales);
  const credits = useShop((state) => state.credits);
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const seeCost = user ? canSeeCost(user.role) : false;
  const todaySales = sales.filter((sale) => inSpan(sale.createdAt, "today"));
  const openCredits = credits.filter((credit) => credit.status === "open");
  const low = products.filter((product) => product.stock <= settings.lowStock);
  const currency = settings.currency;

  return (
    <Page
      kicker={settings.companyAddress}
      title={`Good day, ${user?.username ?? "team"}`}
      action={
        <Link to="/sell" className="btn btn-primary">
          New sale
        </Link>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Today's sales" value={money(sum(todaySales.map((sale) => sale.grandTotal)), currency)} hint={`${todaySales.length} receipt${todaySales.length === 1 ? "" : "s"}`} />
        {seeCost ? (
          <Stat label="Today's profit" value={money(sum(todaySales.map((sale) => sale.profit)), currency)} />
        ) : (
          <Stat label="Cash today" value={money(sum(todaySales.filter((sale) => sale.paymentMethod === "cash").map((sale) => sale.grandTotal)), currency)} />
        )}
        <Stat label="Open credit" value={money(sum(openCredits.map((credit) => credit.balance)), currency)} hint={`${openCredits.length} open`} />
        <Stat label="Low stock" value={String(low.length)} hint={`At or under ${settings.lowStock}`} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent receipts</h2>
            <Link to="/receipts" className="text-sm font-semibold text-primary">
              All
            </Link>
          </div>
          <ul className="grid gap-2">
            {sales.slice(0, 6).map((sale) => (
              <li key={sale.id}>
                <Link to="/receipts/$id" params={{ id: sale.id }} className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-paper">
                  <span>
                    <span className="block font-semibold">{sale.receiptNo}</span>
                    <span className="text-sm text-muted">
                      {sale.customerName} · {formatWhen(sale.createdAt)}
                    </span>
                  </span>
                  <span className="num font-semibold">{money(sale.grandTotal, currency)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Still on credit</h2>
            <Link to="/credits" className="text-sm font-semibold text-primary">
              Collect
            </Link>
          </div>
          {openCredits.length === 0 ? (
            <p className="text-sm text-muted">No open balances.</p>
          ) : (
            <ul className="grid gap-2">
              {openCredits.slice(0, 6).map((credit) => (
                <li key={credit.id} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2">
                  <span>
                    <span className="block font-semibold">{credit.customerName}</span>
                    <span className="text-sm text-muted">{credit.receiptNo}</span>
                  </span>
                  <span className="num font-semibold">{money(credit.balance, currency)}</span>
                </li>
              ))}
            </ul>
          )}
          {low.length > 0 ? (
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="mb-2 text-sm font-semibold">Reorder soon</h3>
              <ul className="grid gap-1 text-sm">
                {low.map((product) => (
                  <li key={product.id} className="flex justify-between">
                    <span>{product.name}</span>
                    <span className="num text-warn">{product.stock} left</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </Page>
  );
}
