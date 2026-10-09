import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useShop } from "@/lib/pos/store";
import { Banner, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const settings = useShop((state) => state.settings);
  const updateSettings = useShop((state) => state.updateSettings);
  const importBackup = useShop((state) => state.importBackup);
  const resetBooks = useShop((state) => state.resetBooks);
  const snapshot = useShop((state) => state);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function exportBooks() {
    const payload = {
      schema: 1,
      users: snapshot.users,
      products: snapshot.products,
      suppliers: snapshot.suppliers,
      sales: snapshot.sales,
      credits: snapshot.credits,
      expenses: snapshot.expenses,
      purchases: snapshot.purchases,
      creditors: snapshot.creditors,
      audit: snapshot.audit,
      settings: snapshot.settings,
      sessionUserId: null,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hybrid-phone-counter.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  }

  return (
    <Page kicker="Shop" title="Settings">
      <form
        className="card grid gap-3 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          updateSettings({
            companyName: String(data.get("companyName") ?? ""),
            companyAddress: String(data.get("companyAddress") ?? ""),
            companyPhone: String(data.get("companyPhone") ?? ""),
            companyEmail: String(data.get("companyEmail") ?? ""),
            currency: String(data.get("currency") ?? "UGX"),
            taxRate: Number(data.get("taxRate") ?? 0),
            lowStock: Number(data.get("lowStock") ?? 5),
          });
          setNotice("Shop details saved on this device.");
        }}
      >
        <TextField label="Shop name" name="companyName" defaultValue={settings.companyName} required />
        <TextField label="Address" name="companyAddress" defaultValue={settings.companyAddress} />
        <TextField label="Phone" name="companyPhone" defaultValue={settings.companyPhone} />
        <TextField label="Email" name="companyEmail" type="email" defaultValue={settings.companyEmail} />
        <TextField label="Currency" name="currency" defaultValue={settings.currency} />
        <TextField label="Default tax %" name="taxRate" type="number" min={0} step="0.01" defaultValue={settings.taxRate} />
        <TextField label="Low stock at" name="lowStock" type="number" min={0} defaultValue={settings.lowStock} />
        <div className="flex items-end">
          <button className="btn btn-primary" type="submit">
            Save details
          </button>
        </div>
        {notice ? (
          <div className="sm:col-span-2">
            <Banner tone="ok">{notice}</Banner>
          </div>
        ) : null}
      </form>

      <section className="card mt-4 p-4">
        <h2 className="text-lg font-semibold">Move the books</h2>
        <p className="mt-1 text-sm text-muted">
          Each phone, PC, and browser keeps its own copy. Download a backup here, then import it on the other device. Staff passwords travel with the file.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-navy" onClick={exportBooks}>
            Download backup
          </button>
          <label className="btn btn-line">
            Import backup
            <input
              className="sr-only"
              type="file"
              accept="application/json"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                void file.text().then((text) => {
                  try {
                    const result = importBackup(JSON.parse(text));
                    if (!result.ok) setError(result.error);
                    else {
                      setError("");
                      toast.success("Backup imported. Sign in again.");
                    }
                  } catch {
                    setError("Couldn't read that file.");
                  }
                });
              }}
            />
          </label>
        </div>
        {error ? (
          <div className="mt-3">
            <Banner tone="danger">{error}</Banner>
          </div>
        ) : null}
      </section>

      <section className="card mt-4 p-4">
        <h2 className="text-lg font-semibold">Restore the original books</h2>
        <p className="mt-1 text-sm text-muted">Puts back the Pioneer Mall snapshot and drops sales made on this device.</p>
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={() => {
            if (window.confirm("Replace the books on this device with the original shop snapshot?")) {
              resetBooks();
              toast.success("Books restored");
            }
          }}
        >
          Restore snapshot
        </button>
      </section>
    </Page>
  );
}
