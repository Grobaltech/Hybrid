import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Laptop, Monitor, Smartphone } from "lucide-react";
import { canAccess } from "@/lib/pos/access";
import { useShop } from "@/lib/pos/store";
import { Page } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/install")({
  component: InstallPage,
});

const GUIDES = [
  {
    icon: Globe,
    title: "Web",
    steps: [
      "Open the shop address in Chrome, Edge, or Safari.",
      "Sign in. The books stay in that browser until you export them.",
      "Bookmark the page so the counter is one tap away.",
    ],
  },
  {
    icon: Monitor,
    title: "Windows",
    steps: [
      "Open the shop in Edge or Chrome.",
      "Use the install icon in the address bar (a monitor with a down arrow).",
      "Hybrid opens in its own window, like any other desktop app. Pin it to the taskbar.",
    ],
  },
  {
    icon: Laptop,
    title: "Mac",
    steps: [
      "Chrome or Edge: use the install icon in the address bar, then keep it in the Dock.",
      "Safari: Share, then Add to Dock.",
      "The installed app uses the same books as that browser profile.",
    ],
  },
  {
    icon: Smartphone,
    title: "Android",
    steps: [
      "Open the shop in Chrome.",
      "Menu, then Install app or Add to Home screen.",
      "The icon sits with your other apps and opens full screen.",
    ],
  },
  {
    icon: Smartphone,
    title: "iPhone & iPad",
    steps: [
      "Open the shop in Safari.",
      "Tap Share, then Add to Home Screen.",
      "Name it Hybrid and open it from the icon. iOS keeps the books on that device.",
    ],
  },
];

function InstallPage() {
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const canBackup = user ? canAccess(user.role, "settings") : false;
  return (
    <Page kicker="Shop" title="Install on every counter">
      <p className="max-w-2xl text-muted">
        This is one app. Publish it once, then install that same address on the shop PC, a Mac, and the phones. Books are stored on each device — download a backup in Settings and import it where you need the same till.
      </p>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {GUIDES.map((guide) => (
          <article key={guide.title} className="card p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <guide.icon className="size-5 text-primary" aria-hidden="true" />
              {guide.title}
            </h2>
            <ol className="mt-3 grid list-decimal gap-2 pl-5 text-sm">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      {canBackup ? (
        <Link to="/settings" className="btn btn-primary mt-5">
          Open backup settings
        </Link>
      ) : (
        <p className="mt-5 text-sm text-muted">Ask an admin to export a backup from Settings when this phone should match the shop PC.</p>
      )}
    </Page>
  );
}
