import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ClipboardList,
  CreditCard,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  Receipt,
  Scale,
  Search,
  Settings,
  ShoppingCart,
  Smartphone,
  Sun,
  Truck,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { canAccess, pageFromPath, type PageId } from "@/lib/pos/access";
import { cn } from "@/lib/cn";
import { useShop } from "@/lib/pos/store";
import { LoginScreen } from "./login";

type NavTo =
  | "/"
  | "/sell"
  | "/receipts"
  | "/products"
  | "/purchases"
  | "/suppliers"
  | "/credits"
  | "/creditors"
  | "/expenses"
  | "/reports"
  | "/balance"
  | "/account"
  | "/users"
  | "/settings"
  | "/activity"
  | "/install";

const NAV: { to: NavTo; page: PageId; label: string; icon: LucideIcon; group: string }[] = [
  { to: "/", page: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Floor" },
  { to: "/sell", page: "sales", label: "New sale", icon: ShoppingCart, group: "Floor" },
  { to: "/receipts", page: "receipts", label: "Receipts", icon: Receipt, group: "Floor" },
  { to: "/products", page: "products", label: "Products", icon: Package, group: "Stock" },
  { to: "/purchases", page: "purchases", label: "Purchases", icon: ClipboardList, group: "Stock" },
  { to: "/suppliers", page: "suppliers", label: "Suppliers", icon: Truck, group: "Stock" },
  { to: "/credits", page: "credits", label: "Customer credit", icon: CreditCard, group: "Books" },
  { to: "/creditors", page: "creditors", label: "Creditors", icon: HandCoins, group: "Books" },
  { to: "/expenses", page: "expenses", label: "Expenses", icon: Wallet, group: "Books" },
  { to: "/reports", page: "reports", label: "Reports", icon: BarChart3, group: "Books" },
  { to: "/balance", page: "balance", label: "Balance", icon: Scale, group: "Books" },
  { to: "/account", page: "account", label: "My account", icon: UserRound, group: "Shop" },
  { to: "/users", page: "users", label: "Staff", icon: Users, group: "Shop" },
  { to: "/settings", page: "settings", label: "Settings", icon: Settings, group: "Shop" },
  { to: "/activity", page: "activity", label: "Activity", icon: ClipboardList, group: "Shop" },
  { to: "/install", page: "install", label: "Install app", icon: Smartphone, group: "Shop" },
];

function BootScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center" aria-busy="true">
      <img src="/logo.png" alt="" className="h-16 w-auto" />
      <p className="font-display text-xl font-semibold">Opening the counter</p>
      <p className="text-sm text-muted">Hybrid Phone Service Center</p>
    </div>
  );
}

export function ShopFrame({ children }: { children: ReactNode }) {
  const hydrated = useShop((state) => state._hydrated);
  const sessionUserId = useShop((state) => state.sessionUserId);
  const users = useShop((state) => state.users);
  const theme = useShop((state) => state.settings.theme);
  const path = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let live = true;
    const pending = useShop.persist.rehydrate();
    void Promise.resolve(pending).finally(() => {
      if (live) useShop.getState().setHydrated(true);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  if (!hydrated) return <BootScreen />;
  const user = users.find((row) => row.id === sessionUserId) ?? null;
  if (!user) return <LoginScreen />;
  const page = pageFromPath(path);
  if (!canAccess(user.role, page)) {
    return (
      <Shell userRole={user.role}>
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">That desk is locked</h1>
          <p className="mt-2 text-muted">Your role ({user.role}) doesn't open this page.</p>
          <Link to="/" className="btn btn-primary mt-5">
            Back to the floor
          </Link>
        </div>
      </Shell>
    );
  }
  return <Shell userRole={user.role}>{children}</Shell>;
}

function Shell({ children, userRole }: { children: ReactNode; userRole: "admin" | "manager" | "cashier" }) {
  const settings = useShop((state) => state.settings);
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const logout = useShop((state) => state.logout);
  const updateSettings = useShop((state) => state.updateSettings);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const items = NAV.filter((item) => canAccess(userRole, item.page));
  const groups = ["Floor", "Stock", "Books", "Shop"].filter((group) => items.some((item) => item.group === group));

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void navigate({ to: "/search", search: { q: String(data.get("q") ?? "") } });
  }

  const tabs = [
    items.find((item) => item.to === "/"),
    items.find((item) => item.to === "/sell"),
    items.find((item) => item.to === "/products") ?? items.find((item) => item.to === "/receipts"),
    items.find((item) => item.to === "/credits") ?? items.find((item) => item.to === "/receipts"),
  ].filter((item): item is (typeof NAV)[number] => Boolean(item));

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="no-print hidden bg-navy text-on-navy lg:flex lg:min-h-dvh lg:flex-col lg:px-3 lg:py-4">
        <Link to="/" className="mb-4 flex items-center gap-3 px-2">
          <img src="/logo.png" alt="" className="h-11 w-11 rounded-lg bg-surface object-cover" />
          <span>
            <span className="block font-display text-sm font-semibold leading-tight">{settings.companyName}</span>
            <span className="block text-xs text-on-navy-muted">Pioneer Mall · PC 90</span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-4 overflow-auto">
          {groups.map((group) => (
            <div key={group}>
              <p className="px-3 pb-1 text-xs font-semibold text-on-navy-muted">{group}</p>
              <ul className="grid gap-1">
                {items
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn("rail-link", active(path, item.to) && "is-active")}
                      >
                        <item.icon className="size-4" aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
        <button type="button" className="rail-link mt-3" onClick={logout}>
          <LogOut className="size-4" aria-hidden="true" />
          Sign out {user?.username}
        </button>
      </aside>

      <div className="min-w-0">
        <header className="no-print sticky top-0 z-20 flex items-center gap-2 border-b border-line bg-surface/95 px-3 py-2 backdrop-blur sm:px-5">
          <Link to="/" className="font-display text-sm font-semibold lg:hidden">
            {settings.companyName}
          </Link>
          <form onSubmit={search} className="mx-auto hidden w-full max-w-md lg:block">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input name="q" className="field pl-9" placeholder="Search name or SKU" />
            </label>
          </form>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              aria-label={settings.theme === "dark" ? "Use light theme" : "Use dark theme"}
              onClick={() => updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" })}
            >
              {settings.theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link to="/account" className="btn btn-line btn-sm hidden sm:inline-flex">
              {user?.username}
              <span className="text-muted">{user?.role}</span>
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface lg:hidden">
        {tabs.slice(0, 4).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-muted",
              active(path, item.to) && "text-primary",
            )}
          >
            <item.icon className="size-5" aria-hidden="true" />
            {item.label.split(" ")[0]}
          </Link>
        ))}
        <button
          type="button"
          className="flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-muted"
          onClick={() => setMore(true)}
        >
          <Menu className="size-5" aria-hidden="true" />
          More
        </button>
      </nav>

      {more ? (
        <div className="fixed inset-0 z-40 bg-navy/50 lg:hidden" onClick={() => setMore(false)}>
          <div
            className="absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-auto rounded-t-3xl bg-surface p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display font-semibold">{user?.username}</p>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setMore(false)}>
                Close
              </button>
            </div>
            <ul className="grid gap-1">
              {items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex min-h-11 items-center gap-3 rounded-xl px-2 font-semibold"
                    onClick={() => setMore(false)}
                  >
                    <item.icon className="size-4 text-primary" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-line mt-3 w-full"
              onClick={() => {
                setMore(false);
                logout();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function active(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}
