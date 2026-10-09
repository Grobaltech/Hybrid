import { useState, type FormEvent } from "react";
import { Globe, Laptop, Monitor, Smartphone } from "lucide-react";
import { digestPassword } from "@/lib/pos/password";
import { STAFF_HINTS } from "@/lib/pos/seed";
import { useShop } from "@/lib/pos/store";
import { Banner } from "./ui";

const PLATFORMS = [
  { icon: Globe, label: "Web" },
  { icon: Monitor, label: "Windows" },
  { icon: Laptop, label: "Mac" },
  { icon: Smartphone, label: "Android & iOS" },
];

export function LoginScreen() {
  const settings = useShop((state) => state.settings);
  const loginWithHash = useShop((state) => state.loginWithHash);
  const [username, setUsername] = useState("Grobaltech");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const hash = await digestPassword(password);
    const result = loginWithHash(username, hash);
    if (!result.ok) setError(result.error);
    setPending(false);
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(280px,420px)_1fr]">
      <section className="flex flex-col justify-between gap-8 bg-navy px-6 py-8 text-on-navy lg:px-10">
        <div>
          <img
            src="/logo.png"
            alt="Hybrid Phone Service Center"
            className="h-16 w-auto rounded-xl bg-surface p-1.5"
          />
          <h1 className="mt-6 text-3xl font-semibold text-on-navy">{settings.companyName}</h1>
          <p className="mt-2 max-w-sm text-on-navy-muted">
            {settings.companyAddress}. Same counter on the shop PC, a laptop, and the phones in the drawer.
          </p>
          <p className="mt-4 text-sm text-on-navy-muted">
            {settings.companyPhone}
            {settings.companyEmail ? ` · ${settings.companyEmail}` : ""}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((item) => (
            <li key={item.label} className="flex items-center gap-2 rounded-xl bg-navy-2 px-3 py-2 text-sm font-semibold">
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </section>
      <section className="flex items-center justify-center px-4 py-10">
        <form onSubmit={submit} className="card w-full max-w-md p-6">
          <p className="kicker">Staff sign-in</p>
          <h2 className="mt-1 text-2xl font-semibold">Open the counter</h2>
          <p className="mt-1 text-sm text-muted">
            Accounts live on this device. Export a backup from Settings when you move to another phone or PC.
          </p>
          <div className="mt-5 space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block font-semibold">Username</span>
              <input
                className="field"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold">Password</span>
              <input
                className="field"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error ? <Banner tone="danger">{error}</Banner> : null}
            <button className="btn btn-primary w-full" type="submit" disabled={pending}>
              {pending ? "Checking…" : "Sign in"}
            </button>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold text-muted">Staff already on this device</p>
            <ul className="mt-2 grid gap-2">
              {STAFF_HINTS.map((staff) => (
                <li key={staff.username}>
                  <button
                    type="button"
                    className="btn btn-line w-full justify-between"
                    onClick={() => {
                      setUsername(staff.username);
                      setPassword(staff.password);
                      setError("");
                    }}
                  >
                    <span>{staff.username}</span>
                    <span className="text-sm font-medium text-muted">
                      {staff.role} · {staff.password}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </section>
    </div>
  );
}
