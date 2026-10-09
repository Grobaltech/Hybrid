import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { digestPassword } from "@/lib/pos/password";
import { useShop } from "@/lib/pos/store";
import type { Role } from "@/lib/pos/types";
import { Banner, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/users")({
  component: UsersPage,
});

function UsersPage() {
  const users = useShop((state) => state.users);
  const addUser = useShop((state) => state.addUser);
  const updateUser = useShop((state) => state.updateUser);
  const deleteUser = useShop((state) => state.deleteUser);
  const setPasswordHash = useShop((state) => state.setPasswordHash);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("cashier");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  return (
    <Page kicker="Shop" title="Staff">
      <form
        className="card grid gap-3 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          void (async () => {
            const result = addUser({
              username,
              passwordHash: await digestPassword(password),
              role,
              phone,
              email: "",
            });
            if (!result.ok) {
              setError(result.error);
              return;
            }
            setUsername("");
            setPassword("");
            setPhone("");
            setError("");
            toast.success("Staff account added");
          })();
        }}
      >
        <TextField label="Username" value={username} onChange={(event) => setUsername(event.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <label className="text-sm">
          <span className="mb-1 block font-semibold">Role</span>
          <select className="field" value={role} onChange={(event) => setRole(event.target.value as Role)}>
            <option value="cashier">Cashier — sell and collect credit</option>
            <option value="manager">Manager — stock and books</option>
            <option value="admin">Admin — everything</option>
          </select>
        </label>
        <TextField label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        {error ? (
          <div className="sm:col-span-2">
            <Banner tone="danger">{error}</Banner>
          </div>
        ) : null}
        <div>
          <button className="btn btn-primary" type="submit">
            Add staff
          </button>
        </div>
      </form>
      <ul className="mt-4 grid gap-3">
        {users.map((user) => (
          <li key={user.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-muted">{user.phone || "No phone"}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="field w-auto"
                value={user.role}
                aria-label={`Role for ${user.username}`}
                onChange={(event) => updateUser(user.id, { role: event.target.value as Role })}
              >
                <option value="cashier">Cashier</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="button"
                className="btn btn-line btn-sm"
                onClick={() => {
                  const next = window.prompt(`New password for ${user.username}`);
                  if (!next) return;
                  void digestPassword(next).then((hash) => {
                    setPasswordHash(user.id, hash);
                    toast.success("Password updated");
                  });
                }}
              >
                Reset password
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  const result = deleteUser(user.id);
                  if (!result.ok) toast.error(result.error);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}
