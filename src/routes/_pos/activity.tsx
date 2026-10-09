import { createFileRoute } from "@tanstack/react-router";
import { formatWhen } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/activity")({
  component: ActivityPage,
});

function ActivityPage() {
  const audit = useShop((state) => state.audit);
  return (
    <Page kicker="Shop" title="Activity">
      <ul className="grid gap-2">
        {audit.map((row) => (
          <li key={row.id} className="card px-4 py-3">
            <p className="font-semibold">
              {row.username} · {row.action}
            </p>
            <p className="text-sm">{row.message}</p>
            <p className="text-xs text-muted">
              {formatWhen(row.at)} · {row.page}
            </p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
