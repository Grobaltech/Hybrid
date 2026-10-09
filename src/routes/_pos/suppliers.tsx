import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useShop } from "@/lib/pos/store";
import { Banner, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/suppliers")({
  component: SuppliersPage,
});

function SuppliersPage() {
  const suppliers = useShop((state) => state.suppliers);
  const upsertSupplier = useShop((state) => state.upsertSupplier);
  const deleteSupplier = useShop((state) => state.deleteSupplier);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <Page kicker="Stock" title="Suppliers">
      <form
        className="card grid gap-3 p-4 sm:grid-cols-4"
        onSubmit={(event) => {
          event.preventDefault();
          const result = upsertSupplier({ name, phone, email });
          if (!result.ok) {
            setError(result.error);
            return;
          }
          setName("");
          setPhone("");
          setEmail("");
          setError("");
          toast.success("Supplier saved");
        }}
      >
        <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} required />
        <TextField label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <div className="flex items-end">
          <button className="btn btn-primary w-full" type="submit">
            Add supplier
          </button>
        </div>
        {error ? (
          <div className="sm:col-span-4">
            <Banner tone="danger">{error}</Banner>
          </div>
        ) : null}
      </form>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="card flex items-start justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{supplier.name}</p>
              <p className="text-sm text-muted">{supplier.phone || "No phone"}</p>
              <p className="text-sm text-muted">{supplier.email || "No email"}</p>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => deleteSupplier(supplier.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </Page>
  );
}
