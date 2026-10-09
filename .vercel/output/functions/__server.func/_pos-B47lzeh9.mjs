import { i as __toESM } from "./_runtime.mjs";
import { r as pageFromPath, t as canAccess } from "./_ssr/access-8byYH4jb.mjs";
import { S as useNavigate, X as require_react, Y as require_jsx_runtime, _ as Outlet, m as useRouterState, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as useShop, c as cn, i as STAFF_HINTS, t as Banner } from "./_ssr/ui-B3DByBpp.mjs";
import { t as digestPassword } from "./_ssr/password-Mxz4nyqg.mjs";
import { C as Laptop, D as ClipboardList, E as CreditCard, O as ChartColumn, S as LayoutDashboard, T as Globe, _ as Moon, b as Menu, c as Smartphone, d as Search, f as Scale, g as Package, i as Truck, l as ShoppingCart, n as Users, p as Receipt, r as UserRound, s as Sun, t as Wallet, u as Settings, v as Monitor, w as HandCoins, x as LogOut } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_pos-B47lzeh9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLATFORMS = [
	{
		icon: Globe,
		label: "Web"
	},
	{
		icon: Monitor,
		label: "Windows"
	},
	{
		icon: Laptop,
		label: "Mac"
	},
	{
		icon: Smartphone,
		label: "Android & iOS"
	}
];
function LoginScreen() {
	const settings = useShop((state) => state.settings);
	const loginWithHash = useShop((state) => state.loginWithHash);
	const [username, setUsername] = (0, import_react.useState)("Grobaltech");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		setPending(true);
		setError("");
		const hash = await digestPassword(password);
		const result = loginWithHash(username, hash);
		if (!result.ok) setError(result.error);
		setPending(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh lg:grid-cols-[minmax(280px,420px)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col justify-between gap-8 bg-navy px-6 py-8 text-on-navy lg:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.png",
					alt: "Hybrid Phone Service Center",
					className: "h-16 w-auto rounded-xl bg-surface p-1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-3xl font-semibold text-on-navy",
					children: settings.companyName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-sm text-on-navy-muted",
					children: [settings.companyAddress, ". Same counter on the shop PC, a laptop, and the phones in the drawer."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-on-navy-muted",
					children: [settings.companyPhone, settings.companyEmail ? ` · ${settings.companyEmail}` : ""]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-2",
				children: PLATFORMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 rounded-xl bg-navy-2 px-3 py-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
						className: "size-4",
						"aria-hidden": "true"
					}), item.label]
				}, item.label))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "card w-full max-w-md p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Staff sign-in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold",
						children: "Open the counter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Accounts live on this device. Export a backup from Settings when you move to another phone or PC."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-semibold",
									children: "Username"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									autoComplete: "username",
									value: username,
									onChange: (event) => setUsername(event.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-semibold",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "password",
									autoComplete: "current-password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									required: true
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
								tone: "danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary w-full",
								type: "submit",
								disabled: pending,
								children: pending ? "Checking…" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-muted",
							children: "Staff already on this device"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid gap-2",
							children: STAFF_HINTS.map((staff) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn btn-line w-full justify-between",
								onClick: () => {
									setUsername(staff.username);
									setPassword(staff.password);
									setError("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: staff.username }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-medium text-muted",
									children: [
										staff.role,
										" · ",
										staff.password
									]
								})]
							}) }, staff.username))
						})]
					})
				]
			})
		})]
	});
}
var NAV = [
	{
		to: "/",
		page: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		group: "Floor"
	},
	{
		to: "/sell",
		page: "sales",
		label: "New sale",
		icon: ShoppingCart,
		group: "Floor"
	},
	{
		to: "/receipts",
		page: "receipts",
		label: "Receipts",
		icon: Receipt,
		group: "Floor"
	},
	{
		to: "/products",
		page: "products",
		label: "Products",
		icon: Package,
		group: "Stock"
	},
	{
		to: "/purchases",
		page: "purchases",
		label: "Purchases",
		icon: ClipboardList,
		group: "Stock"
	},
	{
		to: "/suppliers",
		page: "suppliers",
		label: "Suppliers",
		icon: Truck,
		group: "Stock"
	},
	{
		to: "/credits",
		page: "credits",
		label: "Customer credit",
		icon: CreditCard,
		group: "Books"
	},
	{
		to: "/creditors",
		page: "creditors",
		label: "Creditors",
		icon: HandCoins,
		group: "Books"
	},
	{
		to: "/expenses",
		page: "expenses",
		label: "Expenses",
		icon: Wallet,
		group: "Books"
	},
	{
		to: "/reports",
		page: "reports",
		label: "Reports",
		icon: ChartColumn,
		group: "Books"
	},
	{
		to: "/balance",
		page: "balance",
		label: "Balance",
		icon: Scale,
		group: "Books"
	},
	{
		to: "/account",
		page: "account",
		label: "My account",
		icon: UserRound,
		group: "Shop"
	},
	{
		to: "/users",
		page: "users",
		label: "Staff",
		icon: Users,
		group: "Shop"
	},
	{
		to: "/settings",
		page: "settings",
		label: "Settings",
		icon: Settings,
		group: "Shop"
	},
	{
		to: "/activity",
		page: "activity",
		label: "Activity",
		icon: ClipboardList,
		group: "Shop"
	},
	{
		to: "/install",
		page: "install",
		label: "Install app",
		icon: Smartphone,
		group: "Shop"
	}
];
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/logo.png",
				alt: "",
				className: "h-16 w-auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-semibold",
				children: "Opening the counter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Hybrid Phone Service Center"
			})
		]
	});
}
function ShopFrame({ children }) {
	const hydrated = useShop((state) => state._hydrated);
	const sessionUserId = useShop((state) => state.sessionUserId);
	const users = useShop((state) => state.users);
	const theme = useShop((state) => state.settings.theme);
	const path = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		let live = true;
		const pending = useShop.persist.rehydrate();
		Promise.resolve(pending).finally(() => {
			if (live) useShop.getState().setHydrated(true);
		});
		return () => {
			live = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	const user = users.find((row) => row.id === sessionUserId) ?? null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {});
	const page = pageFromPath(path);
	if (!canAccess(user.role, page)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		userRole: user.role,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg px-4 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold",
					children: "That desk is locked"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: [
						"Your role (",
						user.role,
						") doesn't open this page."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "btn btn-primary mt-5",
					children: "Back to the floor"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		userRole: user.role,
		children
	});
}
function Shell({ children, userRole }) {
	const settings = useShop((state) => state.settings);
	const user = useShop((state) => state.users.find((row) => row.id === state.sessionUserId));
	const logout = useShop((state) => state.logout);
	const updateSettings = useShop((state) => state.updateSettings);
	const path = useRouterState({ select: (state) => state.location.pathname });
	const navigate = useNavigate();
	const [more, setMore] = (0, import_react.useState)(false);
	const items = NAV.filter((item) => canAccess(userRole, item.page));
	const groups = [
		"Floor",
		"Stock",
		"Books",
		"Shop"
	].filter((group) => items.some((item) => item.group === group));
	function search(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		navigate({
			to: "/search",
			search: { q: String(data.get("q") ?? "") }
		});
	}
	const tabs = [
		items.find((item) => item.to === "/"),
		items.find((item) => item.to === "/sell"),
		items.find((item) => item.to === "/products") ?? items.find((item) => item.to === "/receipts"),
		items.find((item) => item.to === "/credits") ?? items.find((item) => item.to === "/receipts")
	].filter((item) => Boolean(item));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh lg:grid lg:grid-cols-[240px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print hidden bg-navy text-on-navy lg:flex lg:min-h-dvh lg:flex-col lg:px-3 lg:py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-4 flex items-center gap-3 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo.png",
							alt: "",
							className: "h-11 w-11 rounded-lg bg-surface object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-sm font-semibold leading-tight",
							children: settings.companyName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-on-navy-muted",
							children: "Pioneer Mall · PC 90"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-4 overflow-auto",
						children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 pb-1 text-xs font-semibold text-on-navy-muted",
							children: group
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1",
							children: items.filter((item) => item.group === group).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("rail-link", active(path, item.to) && "is-active"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-4",
									"aria-hidden": "true"
								}), item.label]
							}) }, item.to))
						})] }, group))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "rail-link mt-3",
						onClick: logout,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
								className: "size-4",
								"aria-hidden": "true"
							}),
							"Sign out ",
							user?.username
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "no-print sticky top-0 z-20 flex items-center gap-2 border-b border-line bg-surface/95 px-3 py-2 backdrop-blur sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-sm font-semibold lg:hidden",
							children: settings.companyName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: search,
							className: "mx-auto hidden w-full max-w-md lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Search products"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "q",
										className: "field pl-9",
										placeholder: "Search name or SKU"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost btn-sm",
								"aria-label": settings.theme === "dark" ? "Use light theme" : "Use dark theme",
								onClick: () => updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" }),
								children: settings.theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/account",
								className: "btn btn-line btn-sm hidden sm:inline-flex",
								children: [user?.username, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: user?.role
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface lg:hidden",
				children: [tabs.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-muted", active(path, item.to) && "text-primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
						className: "size-5",
						"aria-hidden": "true"
					}), item.label.split(" ")[0]]
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-muted",
					onClick: () => setMore(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
						className: "size-5",
						"aria-hidden": "true"
					}), "More"]
				})]
			}),
			more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-navy/50 lg:hidden",
				onClick: () => setMore(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-auto rounded-t-3xl bg-surface p-4",
					onClick: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display font-semibold",
								children: user?.username
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost btn-sm",
								onClick: () => setMore(false),
								children: "Close"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-1",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "flex min-h-11 items-center gap-3 rounded-xl px-2 font-semibold",
								onClick: () => setMore(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-4 text-primary",
									"aria-hidden": "true"
								}), item.label]
							}) }, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line mt-3 w-full",
							onClick: () => {
								setMore(false);
								logout();
							},
							children: "Sign out"
						})
					]
				})
			}) : null
		]
	});
}
function active(path, to) {
	if (to === "/") return path === "/";
	return path === to || path.startsWith(`${to}/`);
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
