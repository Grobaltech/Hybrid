import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatDay, money, todayKey } from "@/lib/pos/money";
import { useShop } from "@/lib/pos/store";
import { Banner, Page, TextField } from "@/components/pos/ui";

export const Route = createFileRoute("/_pos/expenses")({
  component: ExpensesPage,
});

function ExpensesPage() {
  const expenses = useShop((state) => state.expenses);
  const settings = useShop((state) => state.settings);
  const addExpense = useShop((state) => state.addExpense);
  const deleteExpense = useShop((state) => state.deleteExpense);
  const [date, setDate] = useState(todayKey());
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  return (
    <Page kicker="Books" title="Expenses">
      <form
        className="card grid gap-3 p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const result = addExpense({ date, category, amount, note });
          if (!result.ok) {
            setError(result.error);
            return;
          }
          setCategory("");
          setAmount(0);
          setNote("");
          setError("");
          toast.success("Expense logged");
        }}
      >
        <TextField label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <TextField label="Category" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Lunch, rent, airtime" />
        <TextField label="Amount" type="number" min={0} value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
        <TextField label="Note" value={note} onChange={(event) => setNote(event.target.value)} />
        {error ? (
          <div className="sm:col-span-2">
            <Banner tone="danger">{error}</Banner>
          </div>
        ) : null}
        <div>
          <button className="btn btn-primary" type="submit">
            Log expense
          </button>
        </div>
      </form>
      <ul className="mt-4 grid gap-2">
        {expenses.map((expense) => (
          <li key={expense.id} className="card flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="font-semibold">
                {expense.category} · {formatDay(expense.date)}
              </p>
              <p className="text-sm text-muted">{expense.note || "No note"}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="num font-semibold">{money(expense.amount, settings.currency)}</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => deleteExpense(expense.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}
