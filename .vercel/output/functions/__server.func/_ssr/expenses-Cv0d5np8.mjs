import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, g as todayKey, p as money, r as Page, s as TextField, t as Banner, u as formatDay } from "./ui-B3DByBpp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expenses-Cv0d5np8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExpensesPage() {
	const expenses = useShop((state) => state.expenses);
	const settings = useShop((state) => state.settings);
	const addExpense = useShop((state) => state.addExpense);
	const deleteExpense = useShop((state) => state.deleteExpense);
	const [date, setDate] = (0, import_react.useState)(todayKey());
	const [category, setCategory] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)(0);
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Books",
		title: "Expenses",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card grid gap-3 p-4 sm:grid-cols-2",
			onSubmit: (event) => {
				event.preventDefault();
				const result = addExpense({
					date,
					category,
					amount,
					note
				});
				if (!result.ok) {
					setError(result.error);
					return;
				}
				setCategory("");
				setAmount(0);
				setNote("");
				setError("");
				toast.success("Expense logged");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Date",
					type: "date",
					value: date,
					onChange: (event) => setDate(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Category",
					value: category,
					onChange: (event) => setCategory(event.target.value),
					placeholder: "Lunch, rent, airtime"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Amount",
					type: "number",
					min: 0,
					value: amount,
					onChange: (event) => setAmount(Number(event.target.value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Note",
					value: note,
					onChange: (event) => setNote(event.target.value)
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						tone: "danger",
						children: error
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					type: "submit",
					children: "Log expense"
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-2",
			children: expenses.map((expense) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card flex items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						expense.category,
						" · ",
						formatDay(expense.date)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: expense.note || "No note"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num font-semibold",
						children: money(expense.amount, settings.currency)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost btn-sm",
						onClick: () => deleteExpense(expense.id),
						children: "Remove"
					})]
				})]
			}, expense.id))
		})]
	});
}
//#endregion
export { ExpensesPage as component };
