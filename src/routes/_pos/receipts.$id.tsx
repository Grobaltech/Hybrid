import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { formatWhen, money } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/receipts/$id")({
  component: ReceiptPage,
});

function ReceiptPage() {
  const { id } = Route.useParams();
  const sale = useShop((state) => state.sales.find((row) => row.id === id));
  const credit = useShop((state) => state.credits.find((row) => row.saleId === id));
  const settings = useShop((state) => state.settings);

  if (!sale) {
    return (
      <Page title="Receipt missing">
        <p className="text-muted">That receipt isn't on this device.</p>
        <Link to="/receipts" className="btn btn-line mt-4">
          All receipts
        </Link>
      </Page>
    );
  }

  return (
    <Page
      kicker="Floor"
      title={sale.receiptNo}
      action={
        <button type="button" className="btn btn-navy no-print" onClick={() => window.print()}>
          <Printer className="size-4" />
          Print
        </button>
      }
    >
      <article className="receipt-sheet card mx-auto max-w-md p-6">
        <img src="/logo.png" alt="" className="mx-auto h-14 w-auto" />
        <h2 className="mt-3 text-center text-xl font-semibold">{settings.companyName}</h2>
        <p className="text-center text-sm text-muted">{settings.companyAddress}</p>
        <p className="text-center text-sm text-muted">
          {settings.companyPhone}
          {settings.companyEmail ? ` · ${settings.companyEmail}` : ""}
        </p>
        <dl className="mt-4 grid gap-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">When</dt>
            <dd>{formatWhen(sale.createdAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Cashier</dt>
            <dd>{sale.username}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Customer</dt>
            <dd>{sale.customerName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Payment</dt>
            <dd className="capitalize">{sale.paymentMethod}</dd>
          </div>
        </dl>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {sale.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 py-2 text-sm">
              <span>
                <span className="block font-semibold">{item.name}</span>
                <span className="text-muted">
                  {item.sku} · {item.quantity} × {money(item.actualPrice, settings.currency)}
                </span>
              </span>
              <span className="num">{money(item.lineTotal, settings.currency)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 grid gap-1 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="num">{money(sale.subtotal, settings.currency)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Tax ({sale.taxRate}%)</dt>
            <dd className="num">{money(sale.taxAmount, settings.currency)}</dd>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <dt>Total</dt>
            <dd className="num">{money(sale.grandTotal, settings.currency)}</dd>
          </div>
        </dl>
        {credit ? (
          <p className="mt-3 text-sm">
            Credit balance {money(credit.balance, settings.currency)} · {credit.status}
          </p>
        ) : null}
        {sale.notes ? <p className="mt-2 text-sm text-muted">{sale.notes}</p> : null}
        <p className="mt-6 text-center text-sm">Thank you. Pioneer Mall, shop PC 90.</p>
      </article>
    </Page>
  );
}
