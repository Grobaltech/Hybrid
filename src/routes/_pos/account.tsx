import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { digestPassword } from "@/lib/pos/password";
import { useShop } from "@/lib/pos/store";
import { Banner, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/account")({
  component: AccountPage,
});

function AccountPage() {
  const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
  const updateUser = useShop((state) => state.updateUser);
  const setPasswordHash = useShop((state) => state.setPasswordHash);
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;

  return (
    <Page kicker="Shop" title="My account">
      <form
        className="card grid max-w-xl gap-3 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          void (async () => {
            updateUser(user.id, { phone, email, about });
            if (password.trim()) {
              if (password.trim().length < 4) {
                setError("Use at least 4 characters.");
                return;
              }
              setPasswordHash(user.id, await digestPassword(password.trim()));
              setPassword("");
            }
            setError("");
            toast.success("Account saved");
          })();
        }}
      >
        <p className="text-sm text-muted">
          Signed in as <span className="font-semibold text-ink">{user.username}</span> · {user.role}
        </p>
        <TextField label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextField label="About" value={about} onChange={(event) => setAbout(event.target.value)} />
        <TextField label="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Leave blank to keep the current one" />
        {error ? <Banner tone="danger">{error}</Banner> : null}
        <button className="btn btn-primary" type="submit">
          Save account
        </button>
      </form>
    </Page>
  );
}
