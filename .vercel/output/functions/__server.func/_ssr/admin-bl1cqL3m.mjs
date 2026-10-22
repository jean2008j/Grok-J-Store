import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as verifyAdmin, r as placeOrder, t as adminCall } from "./jstore.functions-DYyiTHgu.mjs";
import { A as Check, E as CreditCard, M as Calendar, N as Award, O as ClipboardList, S as Heart, T as DollarSign, a as TrendingUp, c as SquarePen, d as Search, f as RefreshCw, g as Package, i as TriangleAlert, j as ChartColumn, k as CircleCheck, l as ShoppingCart, m as Plus, n as Users, o as TrendingDown, p as Printer, r as Upload, s as Trash2, t as X, u as ShoppingBag, v as LogOut, w as FileSpreadsheet, x as LoaderCircle, y as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-bl1cqL3m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function qEq(col, val) {
	return `${col}=eq.${encodeURIComponent(String(val))}`;
}
function createAdminApi(password) {
	const call = (payload) => adminCall({ data: {
		password,
		...payload
	} });
	return {
		rpc(name, args) {
			return call({
				op: "rpc",
				rpc: name,
				args
			});
		},
		from(table) {
			return {
				select(columns = "*") {
					const pending = call({
						op: "select",
						table,
						query: `select=${columns}`
					});
					pending.order = (col, opts) => {
						const dir = opts?.ascending === false ? "desc" : "asc";
						return call({
							op: "select",
							table,
							query: `select=${columns}&order=${col}.${dir}`
						});
					};
					return pending;
				},
				insert(rows) {
					const run = () => call({
						op: "insert",
						table,
						rows,
						imageFields: table === "products"
					});
					return { select: run };
				},
				update(patch) {
					return { eq(col, val) {
						return call({
							op: "update",
							table,
							query: qEq(col, val),
							patch
						});
					} };
				},
				delete() {
					return {
						eq(col, val) {
							return call({
								op: "delete",
								table,
								query: qEq(col, val)
							});
						},
						in(col, vals) {
							const list = vals.map((v) => encodeURIComponent(String(v))).join(",");
							return call({
								op: "delete",
								table,
								query: `${col}=in.(${list})`
							});
						}
					};
				}
			};
		}
	};
}
/** Shrink a picked photo before it ever hits the database. */
function compressImageFile(file, max = 960, quality = .72) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("read"));
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				const scale = Math.min(1, max / Math.max(img.width, img.height));
				const w = Math.max(1, Math.round(img.width * scale));
				const h = Math.max(1, Math.round(img.height * scale));
				const canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					resolve(String(reader.result || ""));
					return;
				}
				ctx.drawImage(img, 0, 0, w, h);
				resolve(canvas.toDataURL("image/jpeg", quality));
			};
			img.onerror = () => resolve(String(reader.result || ""));
			img.src = String(reader.result || "");
		};
		reader.readAsDataURL(file);
	});
}
var ADMIN_STORE_KEY = "jstore_admin_pw";
function AdminView() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [orderSubTab, setOrderSubTab] = (0, import_react.useState)("pending");
	const [products, setProducts] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [selectedOrderIds, setSelectedOrderIds] = (0, import_react.useState)([]);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [inventorySearch, setInventorySearch] = (0, import_react.useState)("");
	const [selectedPosCategory, setSelectedPosCategory] = (0, import_react.useState)("all");
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const [selectedSizes, setSelectedSizes] = (0, import_react.useState)({});
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isSubmittingOrder, setIsSubmittingOrder] = (0, import_react.useState)(false);
	const [showPrintPrompt, setShowPrintPrompt] = (0, import_react.useState)(false);
	const [isRefreshingOrders, setIsRefreshingOrders] = (0, import_react.useState)(false);
	const [updatingOrderId, setUpdatingOrderId] = (0, import_react.useState)(null);
	const [deletingOrderIds, setDeletingOrderIds] = (0, import_react.useState)([]);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editCostPrice, setEditCostPrice] = (0, import_react.useState)("");
	const [editPrice, setEditPrice] = (0, import_react.useState)("");
	const [editCategory, setEditCategory] = (0, import_react.useState)("hoodies");
	const [editSizesStock, setEditSizesStock] = (0, import_react.useState)({});
	const [editImagePreview, setEditImagePreview] = (0, import_react.useState)("");
	const [isSavingEdit, setIsSavingEdit] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const showToast = (messageEn, type = "success") => {
		setToast({
			message: messageEn,
			type
		});
		setTimeout(() => {
			setToast(null);
		}, 4e3);
	};
	const [isCheckoutOpen, setIsCheckoutOpen] = (0, import_react.useState)(false);
	const [customerInfo, setCustomerInfo] = (0, import_react.useState)({
		name: "",
		phone: "",
		address: "In-Store",
		paymentMethod: "Cash",
		txCode: ""
	});
	const [pName, setPName] = (0, import_react.useState)("");
	const [pCostPrice, setPCostPrice] = (0, import_react.useState)("");
	const [pPrice, setPPrice] = (0, import_react.useState)("");
	const [pCategory, setPCategory] = (0, import_react.useState)("hoodies");
	const [pSizesStock, setPSizesStock] = (0, import_react.useState)({});
	const [pwOld, setPwOld] = (0, import_react.useState)("");
	const [pwNew, setPwNew] = (0, import_react.useState)("");
	const [pwConfirm, setPwConfirm] = (0, import_react.useState)("");
	const [isChangingPw, setIsChangingPw] = (0, import_react.useState)(false);
	const [authState, setAuthState] = (0, import_react.useState)("checking");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [adminSecret, setAdminSecret] = (0, import_react.useState)("");
	const supabase = createAdminApi(adminSecret);
	const [loginError, setLoginError] = (0, import_react.useState)(null);
	const [isLoggingIn, setIsLoggingIn] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [admOld, setAdmOld] = (0, import_react.useState)("");
	const [admNew, setAdmNew] = (0, import_react.useState)("");
	const [admConfirm, setAdmConfirm] = (0, import_react.useState)("");
	const [isChangingAdm, setIsChangingAdm] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let saved = null;
		try {
			saved = localStorage.getItem(ADMIN_STORE_KEY) || sessionStorage.getItem(ADMIN_STORE_KEY);
		} catch (err) {}
		if (!saved) {
			setAuthState("out");
			return;
		}
		verifyAdmin({ data: { password: saved } }).then(({ ok }) => {
			if (ok) {
				setAdminSecret(saved);
				setAuthState("in");
			} else {
				try {
					localStorage.removeItem(ADMIN_STORE_KEY);
					sessionStorage.removeItem(ADMIN_STORE_KEY);
				} catch (err) {}
				setAuthState("out");
			}
		});
	}, []);
	const handleAdminLogin = async (e) => {
		e.preventDefault();
		if (!loginPassword) return;
		setIsLoggingIn(true);
		setLoginError(null);
		const { ok } = await verifyAdmin({ data: { password: loginPassword } });
		setIsLoggingIn(false);
		if (ok) {
			try {
				(rememberMe ? localStorage : sessionStorage).setItem(ADMIN_STORE_KEY, loginPassword);
			} catch (err) {}
			setAdminSecret(loginPassword);
			setLoginPassword("");
			setAuthState("in");
		} else setLoginError("Incorrect password");
	};
	const handleAdminLogout = () => {
		try {
			localStorage.removeItem(ADMIN_STORE_KEY);
			sessionStorage.removeItem(ADMIN_STORE_KEY);
		} catch (err) {}
		setAdminSecret("");
		setAuthState("out");
	};
	const handleChangeAdminPassword = async (e) => {
		e.preventDefault();
		if (admNew.length < 4) {
			showToast("New password must be at least 4 characters", "error");
			return;
		}
		if (admNew !== admConfirm) {
			showToast("New password and confirmation do not match", "error");
			return;
		}
		setIsChangingAdm(true);
		const { data, error } = await supabase.rpc("change_admin_password", {
			old_pw: admOld,
			new_pw: admNew
		});
		setIsChangingAdm(false);
		if (!error && data === true) {
			try {
				if (localStorage.getItem(ADMIN_STORE_KEY)) localStorage.setItem(ADMIN_STORE_KEY, admNew);
				if (sessionStorage.getItem(ADMIN_STORE_KEY)) sessionStorage.setItem(ADMIN_STORE_KEY, admNew);
			} catch (err) {}
			setAdminSecret(admNew);
			setAdmOld("");
			setAdmNew("");
			setAdmConfirm("");
			showToast("🔑 Admin login password changed");
		} else if (!error) showToast("Current password is incorrect", "error");
		else showToast("Could not change password (did you run the admin SQL setup?)", "error");
	};
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [imagePreview, setImagePreview] = (0, import_react.useState)("");
	const [currentDateTime, setCurrentDateTime] = (0, import_react.useState)("");
	const [currentMonthInfo, setCurrentMonthInfo] = (0, import_react.useState)({
		month: 0,
		year: 2026
	});
	(0, import_react.useEffect)(() => {
		const now = /* @__PURE__ */ new Date();
		setCurrentDateTime(now.toLocaleString());
		setCurrentMonthInfo({
			month: now.getMonth(),
			year: now.getFullYear()
		});
	}, []);
	const getAvailableSizes = (category) => {
		if (category === "shoes") return [
			"38",
			"39",
			"40",
			"41",
			"42",
			"43",
			"44",
			"45",
			"46"
		];
		return [
			"XS",
			"S",
			"M",
			"L",
			"XL",
			"XXL",
			"3XL"
		];
	};
	const handleCategoryChange = (newCat) => {
		setPCategory(newCat);
		setPSizesStock({});
	};
	const handleEditCategoryChange = (newCat) => {
		setEditCategory(newCat);
		setEditSizesStock({});
	};
	const handleSizeStockChange = (size, qtyStr) => {
		const qty = parseInt(qtyStr) || 0;
		setPSizesStock((prev) => {
			const updated = { ...prev };
			if (qty <= 0) delete updated[size];
			else updated[size] = qty;
			return updated;
		});
	};
	const handleEditSizeStockChange = (size, qtyStr) => {
		const qty = parseInt(qtyStr) || 0;
		setEditSizesStock((prev) => {
			const updated = { ...prev };
			if (qty <= 0) delete updated[size];
			else updated[size] = qty;
			return updated;
		});
	};
	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImagePreview(await compressImageFile(file));
		}
	};
	(0, import_react.useEffect)(() => {
		if (authState === "in") fetchAllData();
	}, [authState]);
	const fetchAllData = async () => {
		await Promise.all([fetchProducts(), fetchOrders()]);
	};
	const fetchProducts = async () => {
		const { data } = await supabase.from("products").select("*");
		if (data) setProducts(data);
	};
	const fetchOrders = async () => {
		setIsRefreshingOrders(true);
		setSelectedOrderIds([]);
		const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
		if (data) setOrders(data);
		else if (error) console.log("Error fetching orders:", error.message);
		setTimeout(() => {
			setIsRefreshingOrders(false);
		}, 600);
	};
	const calculateAnalytics = () => {
		const currentMonth = currentMonthInfo.month;
		const currentYear = currentMonthInfo.year;
		const now = currentDateTime ? new Date(currentDateTime) : /* @__PURE__ */ new Date();
		let todaySales = 0;
		let yesterdaySales = 0;
		let currentMonthSales = 0;
		let previousMonthSales = 0;
		let totalEstimatedProfit = 0;
		const productSalesMap = {};
		const customerMap = {};
		const paymentMethodsMap = {
			Cash: 0,
			"Syriatel Cash": 0,
			"Sham Cash": 0
		};
		const daysInMonthMap = {};
		const monthsInYearMap = {};
		const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		for (let day = 1; day <= totalDaysInMonth; day++) daysInMonthMap[day] = 0;
		for (let m = 0; m < 12; m++) monthsInYearMap[m] = 0;
		orders.forEach((o) => {
			const orderDate = o.created_at ? new Date(o.created_at) : /* @__PURE__ */ new Date();
			const orderTotal = Number(o.totals ?? o.total) || 0;
			const isToday = orderDate.getDate() === now.getDate() && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
			const yesterday = new Date(now);
			yesterday.setDate(now.getDate() - 1);
			const isYesterday = orderDate.getDate() === yesterday.getDate() && orderDate.getMonth() === yesterday.getMonth() && orderDate.getFullYear() === yesterday.getFullYear();
			if (isToday) todaySales += orderTotal;
			if (isYesterday) yesterdaySales += orderTotal;
			if (orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth) {
				currentMonthSales += orderTotal;
				const dayNum = orderDate.getDate();
				daysInMonthMap[dayNum] = (daysInMonthMap[dayNum] || 0) + orderTotal;
			}
			const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
			const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
			if (orderDate.getFullYear() === prevYear && orderDate.getMonth() === prevMonth) previousMonthSales += orderTotal;
			if (orderDate.getFullYear() === currentYear) {
				const monthNum = orderDate.getMonth();
				monthsInYearMap[monthNum] = (monthsInYearMap[monthNum] || 0) + orderTotal;
			}
			const pm = o.payment_method || "Cash";
			if (pm.includes("Syriatel Cash")) paymentMethodsMap["Syriatel Cash"] = (paymentMethodsMap["Syriatel Cash"] || 0) + 1;
			else if (pm.includes("Sham Cash")) paymentMethodsMap["Sham Cash"] = (paymentMethodsMap["Sham Cash"] || 0) + 1;
			else paymentMethodsMap["Cash"] = (paymentMethodsMap["Cash"] || 0) + 1;
			const cName = o.customer_name || "General";
			const cPhone = o.phone || "-";
			const cKey = `${cName}-${cPhone}`;
			if (!customerMap[cKey]) customerMap[cKey] = {
				name: cName,
				phone: cPhone,
				ordersCount: 0,
				totalSpent: 0
			};
			customerMap[cKey].ordersCount += 1;
			customerMap[cKey].totalSpent += orderTotal;
			if (Array.isArray(o.items)) o.items.forEach((item) => {
				const itemPName = item.name || "Unknown Product";
				const qty = Number(item.qty) || 1;
				const revenue = (Number(item.price) || 0) * qty;
				const matchedProduct = products.find((p) => p.id === item.id || p.name === item.name);
				const costPrice = Number(item.cost_price) || Number(matchedProduct?.cost_price) || 0;
				const sellingPrice = Number(item.price) || 0;
				totalEstimatedProfit += (sellingPrice - costPrice) * qty;
				if (!productSalesMap[itemPName]) productSalesMap[itemPName] = {
					qty: 0,
					revenue: 0
				};
				productSalesMap[itemPName].qty += qty;
				productSalesMap[itemPName].revenue += revenue;
			});
		});
		const productSalesList = Object.entries(productSalesMap).map(([name, data]) => ({
			name,
			...data
		})).sort((a, b) => b.qty - a.qty);
		const topProduct = productSalesList.length > 0 ? productSalesList[0] : null;
		const leastProduct = productSalesList.length > 0 ? productSalesList[productSalesList.length - 1] : null;
		const topCustomersList = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
		let maxDay = 1;
		let maxDaySales = 0;
		Object.entries(daysInMonthMap).forEach(([day, val]) => {
			if (val > maxDaySales) {
				maxDaySales = val;
				maxDay = Number(day);
			}
		});
		const lowStockProducts = products.filter((p) => {
			let totalStock = 0;
			if (p.sizes_stock && typeof p.sizes_stock === "object") totalStock = Object.values(p.sizes_stock).reduce((sum, val) => sum + (Number(val) || 0), 0);
			else totalStock = Number(p.stock) || 0;
			return totalStock <= 2;
		});
		const totalSalesSum = orders.reduce((s, o) => s + (Number(o.totals ?? o.total) || 0), 0);
		return {
			todaySales,
			yesterdaySales,
			currentMonthSales,
			previousMonthSales,
			topProduct,
			leastProduct,
			daysInMonthMap,
			monthsInYearMap,
			maxDay,
			maxDaySales,
			productSalesList,
			topCustomersList,
			paymentMethodsMap,
			lowStockProducts,
			totalEstimatedProfit,
			totalSalesSum
		};
	};
	const analytics = calculateAnalytics();
	const exportToExcelCSV = () => {
		let csvContent = "data:text/csv;charset=utf-8,Order ID,Customer Name,Phone,Payment Method,Total Amount,Status,Date\r\n";
		orders.forEach((o) => {
			const row = [
				o.id,
				`"${o.customer_name || "General"}"`,
				o.phone || "-",
				`"${o.payment_method || "Cash"}"`,
				o.totals ?? o.total,
				o.status || "pending",
				`"${o.created_at ? new Date(o.created_at).toLocaleDateString() : ""}"`
			];
			csvContent += row.join(",") + "\r\n";
		});
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `J-Store_Sales_Report_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		showToast("Sales report exported successfully!");
	};
	const handleUpdateOrderStatus = async (orderId, newStatus) => {
		setUpdatingOrderId(orderId);
		const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
		if (!error) {
			setOrders(orders.map((o) => o.id === orderId ? {
				...o,
				status: newStatus
			} : o));
			if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder({
				...selectedOrder,
				status: newStatus
			});
			showToast(`Order #${orderId} status updated successfully`);
		} else showToast("Failed to update order status", "error");
		setTimeout(() => {
			setUpdatingOrderId(null);
		}, 400);
	};
	const handleDeleteOrder = async (orderId) => {
		if (!window.confirm("Are you sure you want to delete this order?")) return;
		setDeletingOrderIds([orderId]);
		const { error } = await supabase.from("orders").delete().eq("id", orderId);
		if (!error) setTimeout(() => {
			setOrders(orders.filter((o) => o.id !== orderId));
			setSelectedOrderIds((prev) => prev.filter((id) => id !== orderId));
			if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder(null);
			setDeletingOrderIds([]);
			showToast("Order deleted successfully");
		}, 500);
		else {
			showToast("Failed to delete order", "error");
			setDeletingOrderIds([]);
		}
	};
	const handleDeleteSelectedOrders = async () => {
		if (selectedOrderIds.length === 0) return;
		if (!window.confirm(`Are you sure you want to delete ${selectedOrderIds.length} selected order(s)?`)) return;
		setDeletingOrderIds(selectedOrderIds);
		const { error } = await supabase.from("orders").delete().in("id", selectedOrderIds);
		if (!error) setTimeout(() => {
			setOrders(orders.filter((o) => !selectedOrderIds.includes(o.id)));
			if (selectedOrder && selectedOrderIds.includes(selectedOrder.id)) setSelectedOrder(null);
			setSelectedOrderIds([]);
			setDeletingOrderIds([]);
			showToast("Selected orders deleted successfully");
		}, 600);
		else {
			showToast("Failed to delete selected orders", "error");
			setDeletingOrderIds([]);
		}
	};
	const handleAddProduct = async (e, locked = false) => {
		e.preventDefault();
		if (!pName || !pPrice) return;
		setIsLoading(true);
		const finalImage = imagePreview || "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&q=80";
		const sizesList = Object.keys(pSizesStock);
		const totalStockQty = Object.values(pSizesStock).reduce((a, b) => a + b, 0);
		const newP = {
			name: pName,
			price: parseFloat(pPrice),
			stock: totalStockQty,
			category: pCategory,
			image_url: finalImage,
			sizes: sizesList.length > 0 ? sizesList : getAvailableSizes(pCategory).slice(0, 4),
			sizes_stock: pSizesStock
		};
		if (pCostPrice !== "") newP.cost_price = parseFloat(pCostPrice) || 0;
		if (locked) newP.is_locked = true;
		let { data, error } = await supabase.from("products").insert([newP]).select();
		if (error && error.message && error.message.includes("cost_price")) {
			delete newP.cost_price;
			const retryResult = await supabase.from("products").insert([newP]).select();
			data = retryResult.data;
			error = retryResult.error;
		}
		setIsLoading(false);
		if (!error && data) {
			setProducts([...products, data[0]]);
			setPName("");
			setPCostPrice("");
			setPPrice("");
			setPSizesStock({});
			setImageFile(null);
			setImagePreview("");
			showToast("✨ Product added successfully!");
		} else if (locked && error && error.message && error.message.includes("is_locked")) showToast("Run the Supabase SQL setup first (is_locked column is missing)", "error");
		else showToast(error?.message === "IMAGE_TOO_LARGE" ? "Image is too large. Pick a smaller photo." : "Error saving product", "error");
	};
	const handleToggleProductLock = async (product) => {
		const makeLocked = !product.is_locked;
		const { error } = await supabase.from("products").update({ is_locked: makeLocked }).eq("id", product.id);
		if (!error) {
			setProducts(products.map((p) => p.id === product.id ? {
				...p,
				is_locked: makeLocked
			} : p));
			showToast(makeLocked ? "🔒 Moved to the private section" : "🔓 Moved to the public store");
		} else showToast("Failed to update product (did you run the SQL setup?)", "error");
	};
	const handleChangePrivatePassword = async (e) => {
		e.preventDefault();
		if (pwNew.length < 4) {
			showToast("New password must be at least 4 characters", "error");
			return;
		}
		if (pwNew !== pwConfirm) {
			showToast("New password and confirmation do not match", "error");
			return;
		}
		setIsChangingPw(true);
		const { data, error } = await supabase.rpc("change_private_password", {
			old_pw: pwOld,
			new_pw: pwNew
		});
		setIsChangingPw(false);
		if (!error && data === true) {
			setPwOld("");
			setPwNew("");
			setPwConfirm("");
			showToast("🔑 Password changed successfully");
		} else if (!error) showToast("Current password is incorrect", "error");
		else showToast("Could not change password (did you run the SQL setup?)", "error");
	};
	const openEditModal = (product) => {
		setEditingProduct(product);
		setEditName(product.name || "");
		setEditCostPrice(product.cost_price ? String(product.cost_price) : "0");
		setEditPrice(String(product.price || 0));
		setEditCategory(product.category || "hoodies");
		setEditSizesStock(product.sizes_stock && typeof product.sizes_stock === "object" ? product.sizes_stock : {});
		setEditImagePreview(product.image_url || "");
	};
	const handleSaveProductEdit = async (e) => {
		e.preventDefault();
		if (!editingProduct) return;
		setIsSavingEdit(true);
		const sizesList = Object.keys(editSizesStock);
		const totalStockQty = Object.values(editSizesStock).reduce((a, b) => a + b, 0);
		const updatedData = {
			name: editName,
			price: parseFloat(editPrice) || 0,
			stock: totalStockQty,
			category: editCategory,
			sizes: sizesList.length > 0 ? sizesList : getAvailableSizes(editCategory),
			sizes_stock: editSizesStock,
			image_url: editImagePreview || editingProduct.image_url
		};
		if (editCostPrice !== "") updatedData.cost_price = parseFloat(editCostPrice) || 0;
		let { error } = await supabase.from("products").update(updatedData).eq("id", editingProduct.id);
		if (error && error.message && error.message.includes("cost_price")) {
			delete updatedData.cost_price;
			error = (await supabase.from("products").update(updatedData).eq("id", editingProduct.id)).error;
		}
		setIsSavingEdit(false);
		if (!error) {
			setProducts(products.map((p) => p.id === editingProduct.id ? {
				...p,
				...updatedData
			} : p));
			setEditingProduct(null);
			showToast("✨ Product updated successfully!");
		} else showToast(error?.message === "IMAGE_TOO_LARGE" ? "Image is too large. Pick a smaller photo." : "Error updating product", "error");
	};
	const handleDeleteProduct = async (id) => {
		if (!window.confirm("Are you sure you want to delete this product?")) return;
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (!error) {
			setProducts(products.filter((p) => p.id !== id));
			showToast("Product deleted successfully");
		} else showToast("Failed to delete product", "error");
	};
	const handlePosSizeSelect = (productId, size) => {
		setSelectedSizes((prev) => ({
			...prev,
			[productId]: size
		}));
	};
	const addToCart = async (prod) => {
		const sizeToUse = selectedSizes[prod.id] || Array.isArray(prod.sizes) && prod.sizes[0] || "M";
		const sizesStockMap = prod.sizes_stock || {};
		const currentSizeStock = sizesStockMap[sizeToUse] !== void 0 ? Number(sizesStockMap[sizeToUse]) : Number(prod.stock) || 0;
		if (currentSizeStock <= 0) {
			showToast(`Size "${sizeToUse}" is Out of Stock!`, "error");
			return;
		}
		const cartItemId = `${prod.id}-${sizeToUse}`;
		if (cart.filter((item) => item.id === prod.id && item.selectedSize === sizeToUse).reduce((s, item) => s + Number(item.qty || 0), 0) + 1 > currentSizeStock) {
			showToast(`Only ${currentSizeStock} left for size "${sizeToUse}"`, "error");
			return;
		}
		const exist = cart.find((item) => item.cartItemId === cartItemId);
		const productCost = Number(prod.cost_price) || 0;
		if (exist) setCart(cart.map((item) => item.cartItemId === cartItemId ? {
			...item,
			qty: item.qty + 1
		} : item));
		else setCart([...cart, {
			...prod,
			cartItemId,
			selectedSize: sizeToUse,
			qty: 1,
			cost_price: productCost
		}]);
		showToast(`Added "${prod.name}" (${sizeToUse}) to cart`);
	};
	const removeFromCart = async (cartItemId) => {
		setCart(cart.filter((item) => item.cartItemId !== cartItemId));
		showToast("Removed item from cart", "info");
	};
	const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1), 0);
	const handlePOSCheckout = async (e) => {
		e.preventDefault();
		if (cart.length === 0) return;
		if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
			alert("Please fill in Customer Name and Phone Number");
			return;
		}
		if ((customerInfo.paymentMethod === "Syriatel Cash" || customerInfo.paymentMethod === "Sham Cash") && !customerInfo.txCode.trim()) {
			alert("Please enter Transaction Code / Account No.");
			return;
		}
		setIsSubmittingOrder(true);
		const paymentText = customerInfo.paymentMethod === "Cash" ? "Cash" : `${customerInfo.paymentMethod} (${customerInfo.txCode})`;
		customerInfo.name.trim(), customerInfo.phone.trim(), customerInfo.address, (/* @__PURE__ */ new Date()).toISOString();
		const result = await placeOrder({ data: {
			items: cart.map((item) => ({
				id: Number(item.id),
				qty: Number(item.qty) || 1,
				selectedSize: String(item.selectedSize || "M"),
				name: item.name,
				price: item.price
			})),
			customer_name: customerInfo.name.trim(),
			phone: customerInfo.phone.trim(),
			address: customerInfo.address || "In-Store",
			payment_method: paymentText,
			order_type: "POS",
			status: "completed"
		} });
		setIsSubmittingOrder(false);
		if (result.ok) {
			if (result.order) setOrders([result.order, ...orders]);
			await fetchProducts();
			setIsCheckoutOpen(false);
			setShowPrintPrompt(true);
			showToast("🎉 Sale completed successfully!");
		} else showToast("Error saving POS order", "error");
	};
	const handleConfirmPrint = () => {
		setShowPrintPrompt(false);
		window.print();
		setCart([]);
		setCustomerInfo({
			name: "",
			phone: "",
			address: "In-Store",
			paymentMethod: "Cash",
			txCode: ""
		});
	};
	const handleSkipPrint = () => {
		setShowPrintPrompt(false);
		setCart([]);
		setCustomerInfo({
			name: "",
			phone: "",
			address: "In-Store",
			paymentMethod: "Cash",
			txCode: ""
		});
	};
	const filteredProducts = products.filter((p) => {
		const matchesCategory = selectedPosCategory === "all" || p.category === selectedPosCategory;
		const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});
	const filteredInventoryProducts = products.filter((p) => p.name.toLowerCase().includes(inventorySearch.toLowerCase()));
	const filteredOrders = orders.filter((o) => {
		const status = (o.status || "pending").toLowerCase();
		if (orderSubTab === "completed") return status === "completed";
		else return status !== "completed";
	});
	const isAllFilteredSelected = filteredOrders.length > 0 && filteredOrders.every((o) => selectedOrderIds.includes(o.id));
	const toggleSelectAll = () => {
		if (isAllFilteredSelected) {
			const filteredIds = filteredOrders.map((o) => o.id);
			setSelectedOrderIds(selectedOrderIds.filter((id) => !filteredIds.includes(id)));
		} else {
			const filteredIds = filteredOrders.map((o) => o.id);
			const combined = Array.from(/* @__PURE__ */ new Set([...selectedOrderIds, ...filteredIds]));
			setSelectedOrderIds(combined);
		}
	};
	const toggleSelectOrder = (id) => {
		if (selectedOrderIds.includes(id)) setSelectedOrderIds(selectedOrderIds.filter((i) => i !== id));
		else setSelectedOrderIds([...selectedOrderIds, id]);
	};
	const getStatusColorClass = (status) => {
		const s = (status || "").toLowerCase();
		if (s === "completed") return "text-emerald-400 font-bold";
		if (s === "pending") return "text-amber-500 font-bold";
		return "text-zinc-300 font-bold";
	};
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	if (authState !== "in") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		dir: "ltr",
		className: "dark",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-screen flex items-center justify-center p-4 font-sans bg-zinc-950 text-zinc-100",
			children: authState === "checking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-zinc-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAdminLogin,
				className: "w-full max-w-sm p-6 rounded-3xl border shadow-xl space-y-5 bg-zinc-900 border-zinc-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-100 text-zinc-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-black tracking-wider",
								children: "J-STORE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-zinc-400",
								children: "Admin Login"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						autoFocus: true,
						required: true,
						value: loginPassword,
						onChange: (e) => {
							setLoginPassword(e.target.value);
							setLoginError(null);
						},
						placeholder: "Password",
						className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-zinc-400 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: rememberMe,
							onChange: (e) => setRememberMe(e.target.checked)
						}), "Keep me signed in on this device"]
					}),
					loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-red-400",
						children: loginError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: isLoggingIn,
						className: "w-full py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-200 transition shadow-md flex items-center justify-center gap-2",
						children: [isLoggingIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign In" })]
					})
				]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		dir: "ltr",
		className: "dark",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen transition-colors duration-200 font-sans bg-zinc-950 text-zinc-100",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          .print-only {
            display: none !important;
          }
          .print-only-inline {
            display: none !important;
          }
          @keyframes pulse-bg {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          .animate-skeleton {
            animation: pulse-bg 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #09090b;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #27272a;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #3f3f46;
          }

          @media print {
            header, nav, main, .no-print, .print-hidden-checkbox, .print-hidden-actions, .screen-only-select {
              display: none !important;
            }

            #printable-invoice {
              display: block !important;
              width: 100% !important;
              margin: 0 auto !important;
              padding: 20px !important;
              background-color: #ffffff !important;
              color: #000000 !important;
            }

            html, body {
              background-color: #ffffff !important;
              color: #000000 !important;
            }
          }
        ` }),
				toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all duration-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `px-5 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-3 ${toast.type === "error" ? "bg-red-950 border-red-500/50 text-red-200" : toast.type === "info" ? "bg-blue-950 border-blue-500/50 text-blue-200" : "bg-emerald-950 border-emerald-500/50 text-emerald-200"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toast.message })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b sticky top-0 z-40 px-6 py-4 flex justify-between items-center transition-colors shadow-sm no-print border-zinc-800 bg-zinc-950/90 backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2.5 rounded-xl shadow-sm bg-zinc-100 text-zinc-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-black tracking-wider",
							children: "J-STORE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-zinc-400",
							children: "Admin & POS Dashboard"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleAdminLogout,
						className: "px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "max-w-7xl mx-auto px-6 py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b pb-2 mb-8 gap-4 overflow-x-auto border-zinc-800 no-print",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "flex gap-2",
								children: [
									{
										id: "overview",
										label: "Overview",
										icon: ChartColumn
									},
									{
										id: "inventory",
										label: "Inventory",
										icon: Package
									},
									{
										id: "pos",
										label: "POS Terminal",
										icon: ShoppingCart
									},
									{
										id: "orders",
										label: "Orders & Sales",
										icon: ClipboardList
									},
									{
										id: "private",
										label: "Private & Security",
										icon: Lock
									}
								].map((tab) => {
									const Icon = tab.icon;
									const active = activeTab === tab.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab(tab.id),
										className: `flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition whitespace-nowrap ${active ? "bg-zinc-100 text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }), tab.label]
									}, tab.id);
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: exportToExcelCSV,
									className: "p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-bold bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600 hover:text-white",
									title: "Export Sales to Excel (CSV)",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Export Excel"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: fetchOrders,
									disabled: isRefreshingOrders,
									className: "p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-bold bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 ${isRefreshingOrders ? "animate-spin text-emerald-400" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Refresh"
									})]
								})]
							})]
						}),
						activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [
								analytics.lowStockProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-6 h-6 text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-black text-amber-400 uppercase",
											children: "Low Stock Warning"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-300 mt-0.5",
											children: analytics.lowStockProducts.map((p) => `${p.name}`).join(", ")
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-zinc-400",
														children: "Total Revenue"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-5 h-5 text-emerald-400" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-3xl font-black",
													children: ["$", analytics.totalSalesSum]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-zinc-500 font-semibold mt-2 block",
													children: "All-time Sales"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-emerald-500/30 bg-gradient-to-br from-zinc-900 to-emerald-950/20",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-emerald-400",
														children: "Estimated Net Profit"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "w-5 h-5 text-emerald-400" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-3xl font-black text-emerald-400",
													children: ["$", analytics.totalEstimatedProfit]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-zinc-400 font-semibold mt-2 block",
													children: "(Selling Price - Cost) × Qty"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-zinc-400",
														children: "Today vs Yesterday"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5 text-blue-400" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-baseline gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-3xl font-black",
														children: ["$", analytics.todaySales]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-zinc-400",
														children: ["/ $", analytics.yesterdaySales]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center gap-1 text-[10px] font-bold mt-2",
													children: analytics.todaySales >= analytics.yesterdaySales ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-emerald-400 flex items-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3 mr-0.5" }), " Higher than yesterday"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-amber-500 flex items-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "w-3 h-3 mr-0.5" }), " Lower than yesterday"]
													})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-zinc-400",
														children: "This Month vs Last Month"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-5 h-5 text-purple-400" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-baseline gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-3xl font-black",
														children: ["$", analytics.currentMonthSales]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-zinc-400",
														children: ["/ $", analytics.previousMonthSales]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-zinc-500 font-semibold mt-2 block",
													children: "Monthly Comparative Analysis"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-zinc-400",
														children: "Top Sales Day This Month"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-5 h-5 text-amber-400" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-3xl font-black text-amber-400",
													children: ["Day ", analytics.maxDay]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-zinc-400 font-bold mt-2 block",
													children: [
														"$",
														analytics.maxDaySales,
														" recorded sales"
													]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lg:col-span-2 p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "text-sm font-black text-white flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4 text-blue-400" }), " Top Customers"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-zinc-400",
												children: "Most Valuable Buyers"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-x-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
												className: "w-full text-xs text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
													className: "border-b font-bold bg-zinc-800/60 text-zinc-300",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3 text-left",
															children: "Customer Name"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Phone"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Orders"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Total Spent"
														})
													] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
													className: "divide-y divide-zinc-800",
													children: analytics.topCustomersList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														colSpan: 4,
														className: "py-6 text-zinc-500 text-center",
														children: "No customer data yet."
													}) }) : analytics.topCustomersList.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3 font-bold text-left text-white",
															children: c.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3 font-mono text-zinc-400",
															children: c.phone
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3 font-bold text-zinc-300",
															children: c.ordersCount
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3 font-mono font-black text-emerald-400",
															children: ["$", c.totalSpent]
														})
													] }, i))
												})]
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-sm font-black text-white flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "w-4 h-4 text-emerald-400" }), " Payment Methods Breakdown"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3 pt-2",
											children: Object.entries(analytics.paymentMethodsMap).map(([method, count]) => {
												const percentage = (count / (orders.length || 1) * 100).toFixed(0);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-xs font-bold",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-zinc-300",
															children: method
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-mono text-emerald-400",
															children: [
																count,
																" orders (",
																percentage,
																"%)"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-full bg-zinc-800 h-2 rounded-full overflow-hidden",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "bg-emerald-500 h-full rounded-full transition-all duration-500",
															style: { width: `${percentage}%` }
														})
													})]
												}, method);
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 rounded-3xl border flex items-center justify-between shadow-sm bg-zinc-900 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-4 h-4" }), " Top Selling Product"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-lg font-black",
													children: analytics.topProduct ? analytics.topProduct.name : "N/A"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-zinc-400 font-semibold",
													children: analytics.topProduct ? `${analytics.topProduct.qty} Units Sold · Total Revenue: $${analytics.topProduct.revenue}` : "No sales data yet"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-8 h-8" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 rounded-3xl border flex items-center justify-between shadow-sm bg-zinc-900 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4" }), " Least Selling Product"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-lg font-black",
													children: analytics.leastProduct ? analytics.leastProduct.name : "N/A"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-zinc-400 font-semibold",
													children: analytics.leastProduct ? `${analytics.leastProduct.qty} Units Sold · Total Revenue: $${analytics.leastProduct.revenue}` : "No sales data yet"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "w-8 h-8" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-black text-white",
											children: "Daily Sales Breakdown (Current Month)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-400",
											children: "Day by day comparison of total sales in USD ($)"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300",
											children: [
												monthNames[currentMonthInfo.month],
												" ",
												currentMonthInfo.year
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-y-auto max-h-72 pr-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-xs text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "border-b font-bold sticky top-0 bg-zinc-900 text-zinc-300",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Day"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Sales Amount ($)"
												})] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-zinc-800",
												children: Object.entries(analytics.daysInMonthMap).map(([day, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: Number(val) > 0 ? "bg-emerald-950/30" : "",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-3 font-bold font-mono",
														children: ["Day ", day]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: `p-3 font-mono font-bold ${Number(val) > 0 ? "text-emerald-400" : "text-zinc-500"}`,
														children: ["$", val]
													})]
												}, day))
											})]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-black text-white",
											children: "Annual Monthly Performance Comparison"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-400",
											children: "Overview of total sales per month across the current year"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300",
											children: ["Year ", currentMonthInfo.year]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-xs text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "border-b font-bold bg-zinc-800 text-zinc-300",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Month"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Sales Amount ($)"
												})] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-zinc-800",
												children: monthNames.map((mName, mIdx) => {
													const val = analytics.monthsInYearMap[mIdx] || 0;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
														className: val > 0 ? "bg-emerald-950/30" : "",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3 font-bold",
															children: mName
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: `p-3 font-mono font-bold ${val > 0 ? "text-emerald-400" : "text-zinc-500"}`,
															children: ["$", val]
														})]
													}, mName);
												})
											})]
										})
									})]
								})
							]
						}),
						activeTab === "inventory" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-sm font-black flex items-center gap-2 mb-6 text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 text-emerald-400" }), "Add New Product & Size Quantities"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleAddProduct,
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-3 gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Product Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													placeholder: "e.g. Nike Air Force",
													value: pName,
													onChange: (e) => setPName(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Cost Price ($) (Optional)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													placeholder: "25",
													value: pCostPrice,
													onChange: (e) => setPCostPrice(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Selling Price ($)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													required: true,
													placeholder: "45",
													value: pPrice,
													onChange: (e) => setPPrice(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-2 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold block mb-1 text-zinc-400",
												children: "Category"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: pCategory,
												onChange: (e) => handleCategoryChange(e.target.value),
												className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none cursor-pointer bg-zinc-950 border-zinc-800 text-white",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "hoodies",
														children: "🧥 Hoodies"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "jackets",
														children: "🧥 Jackets"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "tshirts",
														children: "👕 T-Shirts"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "shoes",
														children: "👟 Shoes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "pants",
														children: "👖 Pants & Shorts"
													})
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold block mb-1 text-zinc-400",
												children: "Product Image"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "image/*",
													onChange: handleImageChange,
													className: "hidden",
													id: "product-image-upload"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													htmlFor: "product-image-upload",
													className: "w-full px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: imageFile ? imageFile.name : "Choose Image..." })]
												})]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 rounded-2xl border bg-zinc-950 border-zinc-800 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-black block text-emerald-400",
												children: "Set Quantity per Size:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3",
												children: getAvailableSizes(pCategory).map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-bold text-zinc-400 block",
														children: ["Size ", size]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: "0",
														placeholder: "Qty",
														value: pSizesStock[size] || "",
														onChange: (e) => handleSizeStockChange(size, e.target.value),
														className: "w-full px-3 py-2 rounded-xl border text-xs outline-none bg-zinc-900 border-zinc-700 text-white text-center font-mono"
													})]
												}, size))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: isLoading,
											className: "w-full py-3 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-200 transition shadow-md flex items-center justify-center gap-2",
											children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Product" })]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col md:flex-row justify-between items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-extrabold text-white",
										children: "Inventory List"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative w-full md:w-64",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 absolute top-3 left-4 text-zinc-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Search inventory...",
											value: inventorySearch,
											onChange: (e) => setInventorySearch(e.target.value),
											className: "w-full text-xs py-2 rounded-full border outline-none pl-10 pr-4 bg-zinc-950 border-zinc-800 text-white"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-xs text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "border-b font-bold bg-zinc-800/60 text-zinc-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Image"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Product"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Cost Price"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Selling Price"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Stock by Size"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Action"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-zinc-800",
											children: filteredInventoryProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												colSpan: 6,
												className: "text-center py-12 text-zinc-500",
												children: "No products found."
											}) }) : filteredInventoryProducts.map((p) => {
												const sizesStock = p.sizes_stock || {};
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-zinc-800/30 transition",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "w-12 h-12 mx-auto rounded-xl bg-zinc-950 overflow-hidden flex items-center justify-center border border-zinc-800",
																children: p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: p.image_url,
																	alt: p.name,
																	className: "w-full h-full object-cover"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-5 h-5 text-zinc-600" })
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3 font-bold text-white",
															children: [p.is_locked ? "🔒 " : "", p.name]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3 font-mono text-zinc-400",
															children: ["$", p.cost_price || 0]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3 font-mono font-bold text-emerald-400",
															children: ["$", p.price]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex flex-wrap gap-1 justify-center",
																children: Object.keys(sizesStock).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-zinc-500",
																	children: ["Stock: ", p.stock]
																}) : Object.entries(sizesStock).map(([sz, qty]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "px-2 py-0.5 bg-zinc-800 rounded font-mono text-[10px]",
																	children: [
																		sz,
																		": ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																			className: Number(qty) <= 0 ? "text-red-400" : "text-emerald-400",
																			children: String(qty)
																		})
																	]
																}, sz))
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-center gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => openEditModal(p),
																	className: "px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit" })]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => handleDeleteProduct(p.id),
																	className: "p-1.5 rounded-xl text-red-400 hover:bg-red-500/10 transition",
																	title: "Delete Product",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
																})]
															})
														})
													]
												}, p.id);
											})
										})]
									})
								})]
							})]
						}),
						activeTab === "private" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "text-sm font-black flex items-center gap-2 mb-2 text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-emerald-400" }), "Change Admin Login Password"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-400 mb-6",
											children: "This is the password you use to sign in to this dashboard."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleChangeAdminPassword,
											className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Current Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													value: admOld,
													onChange: (e) => setAdmOld(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "New Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													value: admNew,
													onChange: (e) => setAdmNew(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Confirm New Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													value: admConfirm,
													onChange: (e) => setAdmConfirm(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "submit",
													disabled: isChangingAdm,
													className: "py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-200 transition shadow-md flex items-center justify-center gap-2",
													children: [isChangingAdm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change Password" })]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "text-sm font-black flex items-center gap-2 mb-2 text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-amber-400" }), "Change Private Section Password"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-400 mb-6",
											children: "Customers use this password (the lock icon in the store header) to see the private products."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleChangePrivatePassword,
											className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Current Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													value: pwOld,
													onChange: (e) => setPwOld(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "New Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													value: pwNew,
													onChange: (e) => setPwNew(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Confirm New Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													required: true,
													value: pwConfirm,
													onChange: (e) => setPwConfirm(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "submit",
													disabled: isChangingPw,
													className: "py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-200 transition shadow-md flex items-center justify-center gap-2",
													children: [isChangingPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change Password" })]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm bg-zinc-900 border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-sm font-black flex items-center gap-2 mb-6 text-white",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 text-amber-400" }), "Add Private Product (hidden behind the password)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: (e) => handleAddProduct(e, true),
										className: "space-y-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-3 gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-bold block mb-1 text-zinc-400",
														children: "Product Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														required: true,
														placeholder: "e.g. Limited Edition Hoodie",
														value: pName,
														onChange: (e) => setPName(e.target.value),
														className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-bold block mb-1 text-zinc-400",
														children: "Cost Price ($) (Optional)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														placeholder: "25",
														value: pCostPrice,
														onChange: (e) => setPCostPrice(e.target.value),
														className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-bold block mb-1 text-zinc-400",
														children: "Selling Price ($)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														required: true,
														placeholder: "45",
														value: pPrice,
														onChange: (e) => setPPrice(e.target.value),
														className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Category"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: pCategory,
													onChange: (e) => handleCategoryChange(e.target.value),
													className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none cursor-pointer bg-zinc-950 border-zinc-800 text-white",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "hoodies",
															children: "🧥 Hoodies"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "jackets",
															children: "🧥 Jackets"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "tshirts",
															children: "👕 T-Shirts"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "shoes",
															children: "👟 Shoes"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "pants",
															children: "👖 Pants & Shorts"
														})
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-bold block mb-1 text-zinc-400",
													children: "Product Image"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "file",
														accept: "image/*",
														onChange: handleImageChange,
														className: "hidden",
														id: "private-product-image-upload"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														htmlFor: "private-product-image-upload",
														className: "w-full px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: imageFile ? imageFile.name : "Choose Image..." })]
													})]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 rounded-2xl border bg-zinc-950 border-zinc-800 space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-black block text-amber-400",
													children: "Set Quantity per Size:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3",
													children: getAvailableSizes(pCategory).map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[10px] font-bold text-zinc-400 block",
															children: ["Size ", size]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															min: "0",
															placeholder: "Qty",
															value: pSizesStock[size] || "",
															onChange: (e) => handleSizeStockChange(size, e.target.value),
															className: "w-full px-3 py-2 rounded-xl border text-xs outline-none bg-zinc-900 border-zinc-700 text-white text-center font-mono"
														})]
													}, size))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "submit",
												disabled: isLoading,
												className: "w-full py-3 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-200 transition shadow-md flex items-center justify-center gap-2",
												children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Private Product" })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-sm font-extrabold text-white",
											children: [
												"Private Products (",
												products.filter((p) => p.is_locked).length,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-x-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
												className: "w-full text-xs text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
													className: "border-b font-bold bg-zinc-800/60 text-zinc-300",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Image"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Product"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Selling Price"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Stock by Size"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "p-3",
															children: "Action"
														})
													] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
													className: "divide-y divide-zinc-800",
													children: products.filter((p) => p.is_locked).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														colSpan: 5,
														className: "text-center py-12 text-zinc-500",
														children: "No private products yet."
													}) }) : products.filter((p) => p.is_locked).map((p) => {
														const sizesStock = p.sizes_stock || {};
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
															className: "hover:bg-zinc-800/30 transition",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "w-12 h-12 mx-auto rounded-xl bg-zinc-950 overflow-hidden flex items-center justify-center border border-zinc-800",
																		children: p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																			src: p.image_url,
																			alt: p.name,
																			className: "w-full h-full object-cover"
																		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-5 h-5 text-zinc-600" })
																	})
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3 font-bold text-white",
																	children: p.name
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
																	className: "p-3 font-mono font-bold text-emerald-400",
																	children: ["$", p.price]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "flex flex-wrap gap-1 justify-center",
																		children: Object.keys(sizesStock).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: "text-zinc-500",
																			children: ["Stock: ", p.stock]
																		}) : Object.entries(sizesStock).map(([sz, qty]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: "px-2 py-0.5 bg-zinc-800 rounded font-mono text-[10px]",
																			children: [
																				sz,
																				": ",
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																					className: Number(qty) <= 0 ? "text-red-400" : "text-emerald-400",
																					children: String(qty)
																				})
																			]
																		}, sz))
																	})
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																	className: "p-3",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-center justify-center gap-2",
																		children: [
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																				onClick: () => openEditModal(p),
																				className: "px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit" })]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																				onClick: () => handleToggleProductLock(p),
																				className: "px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold hover:bg-zinc-700 transition",
																				title: "Move to the public store",
																				children: "Make Public"
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																				onClick: () => handleDeleteProduct(p.id),
																				className: "p-1.5 rounded-xl text-red-400 hover:bg-red-500/10 transition",
																				title: "Delete Product",
																				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
																			})
																		]
																	})
																})
															]
														}, p.id);
													})
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-zinc-500",
											children: "Tip: you can also hide an existing public product with the \"Move an Existing Product to Private\" box below."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-3xl border shadow-sm space-y-4 bg-zinc-900 border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-extrabold text-white",
										children: "Move an Existing Product to Private"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: products.filter((p) => !p.is_locked).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-zinc-500",
											children: "No public products."
										}) : products.filter((p) => !p.is_locked).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleToggleProductLock(p),
											className: "px-3 py-1.5 rounded-full text-[11px] font-bold bg-zinc-950 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 transition flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3" }), p.name]
										}, p.id))
									})]
								})
							]
						}),
						activeTab === "pos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto pb-2 scrollbar-none",
								children: [
									{
										id: "all",
										label: "All Products"
									},
									{
										id: "hoodies",
										label: "Hoodies"
									},
									{
										id: "jackets",
										label: "Jackets"
									},
									{
										id: "tshirts",
										label: "T-Shirts"
									},
									{
										id: "shoes",
										label: "Footwear"
									},
									{
										id: "pants",
										label: "Pants & Shorts"
									}
								].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedPosCategory(tab.id),
									className: `px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedPosCategory === tab.id ? "bg-white text-black" : "bg-neutral-900 text-gray-300 border border-neutral-800"}`,
									children: tab.label
								}, tab.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6",
									children: filteredProducts.map((product) => {
										const sizesStockMap = product.sizes_stock || {};
										const availableSizes = Object.keys(sizesStockMap).length > 0 ? Object.keys(sizesStockMap) : Array.isArray(product.sizes) ? product.sizes : [
											"XS",
											"S",
											"M",
											"L"
										];
										const currentSelectedSize = selectedSizes[product.id] || availableSizes[0];
										const isSizeOutOfStock = (sizesStockMap[currentSelectedSize] !== void 0 ? Number(sizesStockMap[currentSelectedSize]) : Number(product.stock) || 0) <= 0;
										const totalStock = Object.values(sizesStockMap).length > 0 ? Object.values(sizesStockMap).reduce((a, b) => a + Number(b), 0) : Number(product.stock) || 0;
										const isProductFullyOut = totalStock <= 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border overflow-hidden flex flex-col justify-between hover:shadow-2xl transition duration-300 bg-neutral-900 border-neutral-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative aspect-square p-4 flex items-center justify-center cursor-pointer bg-black",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: product.image_url,
													alt: product.name,
													className: "w-full h-full object-cover rounded-xl"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-transform hover:scale-110 z-20",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4 text-white/80" })
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 flex flex-col flex-1 justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider",
															children: "J-STORE"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `text-[10px] font-bold px-2 py-0.5 rounded-md ${isSizeOutOfStock ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`,
															children: isSizeOutOfStock ? `Size ${currentSelectedSize} Out of Stock` : `Stock: ${totalStock}`
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-bold mb-2",
														children: product.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mb-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-gray-400 block mb-1",
															children: "Select Size:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex flex-wrap gap-1",
															children: availableSizes.map((size) => {
																const isSzOut = (sizesStockMap[size] !== void 0 ? Number(sizesStockMap[size]) : 1) <= 0;
																return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => {
																		if (!isSzOut) handlePosSizeSelect(product.id, size);
																	},
																	disabled: isSzOut,
																	className: `text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition ${currentSelectedSize === size ? "bg-white text-black border-white font-bold" : "bg-neutral-800 text-gray-300 border-transparent hover:bg-neutral-700"} ${isSzOut ? "opacity-30 line-through cursor-not-allowed bg-neutral-900 text-neutral-600" : ""}`,
																	children: size
																}, size);
															})
														})]
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-lg font-black mb-3",
													children: ["$", product.price]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => addToCart(product),
													disabled: isSizeOutOfStock || isProductFullyOut,
													className: `w-full py-2.5 rounded-xl text-xs font-bold transition ${isSizeOutOfStock || isProductFullyOut ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border-neutral-700" : "bg-white hover:bg-gray-200 text-black border-black"}`,
													children: isSizeOutOfStock ? "Size Out of Stock" : "Add to Cart +"
												})] })]
											})]
										}, product.id);
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 rounded-2xl border shadow-sm flex flex-col justify-between h-[580px] sticky top-24 bg-neutral-900 border-neutral-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-extrabold text-sm mb-4",
										children: "POS Cart"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3 overflow-y-auto max-h-[360px]",
										children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-center py-20 text-gray-500",
											children: "Cart is empty"
										}) : cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center text-xs border-b pb-2.5 border-neutral-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold",
												children: item.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-gray-400",
												children: [
													"$",
													item.price,
													" × ",
													item.qty,
													" (Size: ",
													item.selectedSize,
													")"
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => removeFromCart(item.cartItemId),
												className: "text-red-500 font-bold",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
											})]
										}, item.cartItemId))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-4 border-t border-neutral-800 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-black text-base",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-400",
												children: ["$", cartTotal]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsCheckoutOpen(true),
											disabled: cart.length === 0,
											className: "w-full py-3 text-xs font-bold rounded-xl bg-white text-black disabled:opacity-50 cursor-pointer hover:bg-gray-200 transition",
											children: "Checkout"
										})]
									})]
								})]
							})]
						}),
						activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setOrderSubTab("pending");
											setSelectedOrderIds([]);
										},
										className: `px-4 py-2 text-xs font-bold rounded-xl border transition ${orderSubTab === "pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/50" : "bg-zinc-900 border-zinc-800 text-zinc-400"}`,
										children: "Pending Orders"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setOrderSubTab("completed");
											setSelectedOrderIds([]);
										},
										className: `px-4 py-2 text-xs font-bold rounded-xl border transition ${orderSubTab === "completed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : "bg-zinc-900 border-zinc-800 text-zinc-400"}`,
										children: "Completed Orders"
									})]
								}), selectedOrderIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleDeleteSelectedOrders,
									className: "px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Delete Selected (",
										selectedOrderIds.length,
										")"
									] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border overflow-hidden shadow-sm bg-zinc-900 border-zinc-800",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-xs text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "border-b font-bold bg-zinc-800/60 text-zinc-300",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 w-10 print-hidden-checkbox",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: isAllFilteredSelected,
													onChange: toggleSelectAll,
													className: "w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-500 focus:ring-0 cursor-pointer accent-emerald-500"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Order ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Type"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Customer"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Phone"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Payment"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Total"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Change Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 print-hidden-actions",
												children: "Details"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-zinc-800",
										children: isRefreshingOrders ? [
											1,
											2,
											3,
											4,
											5
										].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "animate-skeleton",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 print-hidden-checkbox",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded w-4 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded-lg w-12 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded-lg w-16 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded-lg w-28 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded-lg w-24 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded-lg w-20 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-zinc-800 rounded-lg w-12 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 bg-zinc-800 rounded-lg w-24 mx-auto" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 print-hidden-actions",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 bg-zinc-800 rounded-lg w-16 mx-auto" })
												})
											]
										}, item)) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 9,
											className: "text-center py-12 text-gray-400",
											children: "No orders found."
										}) }) : filteredOrders.map((o) => {
											if (deletingOrderIds.includes(o.id)) return null;
											const isSelected = selectedOrderIds.includes(o.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: isSelected ? "bg-zinc-800/40" : "",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4 w-10 print-hidden-checkbox",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: isSelected,
															onChange: () => toggleSelectOrder(o.id),
															className: "w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-500 focus:ring-0 cursor-pointer accent-emerald-500"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-4 font-mono font-bold",
														children: ["#", o.id]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4 font-bold",
														children: o.order_type || "Online"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4 font-bold",
														children: o.customer_name || "General"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4 font-mono",
														children: o.phone || "-"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4",
														children: o.payment_method || "Cash"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-4 font-bold",
														children: ["$", o.totals ?? o.total]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "screen-only-select",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																value: o.status || "pending",
																disabled: updatingOrderId === o.id,
																onChange: (e) => handleUpdateOrderStatus(o.id, e.target.value),
																className: `px-3 py-1.5 rounded-lg font-extrabold text-xs bg-zinc-950 border border-zinc-800 cursor-pointer outline-none focus:border-zinc-500 ${getStatusColorClass(o.status)}`,
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "pending",
																	className: "text-amber-500 font-bold bg-zinc-900",
																	children: "Pending"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "completed",
																	className: "text-emerald-400 font-bold bg-zinc-900",
																	children: "Completed"
																})]
															})
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-4 print-hidden-actions",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => setSelectedOrder(o),
																className: "px-3 py-1.5 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition",
																children: "View"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => handleDeleteOrder(o.id),
																title: "Delete Order",
																className: "p-1.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
															})]
														})
													})
												]
											}, o.id);
										})
									})]
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "printable-invoice",
					className: "print-only",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center pb-3 border-b border-black mb-4 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-black uppercase tracking-wider text-black",
								children: "J-STORE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-black font-semibold",
								children: "POS Direct Sale Invoice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-black font-mono",
								children: currentDateTime
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs text-black font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 border border-black rounded-xl flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold block text-black",
									children: "Customer Name:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-black text-black",
									children: selectedOrder ? selectedOrder.customer_name : customerInfo.name || "Direct Sale"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold block text-black",
										children: "Phone:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-mono font-bold text-black",
										children: selectedOrder ? selectedOrder.phone : customerInfo.phone || "-"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 border border-black rounded-xl space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-black border-b border-black pb-2 grid grid-cols-4 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Item" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-center",
											children: "Size"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-center",
											children: "Qty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right",
											children: "Price"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 pt-1",
									children: selectedOrder && Array.isArray(selectedOrder.items) ? selectedOrder.items.map((item, idx) => {
										const price = Number(item.price) || 0;
										const qty = Number(item.qty) || 1;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-4 items-center text-left text-black",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-black text-xs text-black",
													children: item.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-center font-normal",
													children: item.selectedSize || item.size || "N/A"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-center font-normal",
													children: qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-right font-mono font-black",
													children: ["$", price * qty]
												})
											]
										}, idx);
									}) : cart.map((item, idx) => {
										const price = Number(item.price) || 0;
										const qty = Number(item.qty) || 1;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-4 items-center text-left text-black",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-black text-xs text-black",
													children: item.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-center font-normal",
													children: item.selectedSize || "M"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-center font-normal",
													children: qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-right font-mono font-black",
													children: ["$", price * qty]
												})
											]
										}, idx);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 border-2 border-black rounded-xl flex justify-between items-center font-black text-sm text-black",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-base text-black",
									children: ["$", selectedOrder ? selectedOrder.totals ?? selectedOrder.total : cartTotal]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center pt-8 mt-6 border-t border-black",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-xs text-black",
									children: "Thank you for shopping with J-STORE!"
								})
							})
						]
					})]
				}),
				editingProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-2xl rounded-3xl p-6 shadow-2xl border space-y-5 my-8 bg-zinc-900 border-zinc-800 text-white relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pb-4 border-b border-zinc-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "w-5 h-5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-black text-lg text-white",
									children: "Edit Product & Size Stock"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingProduct(null),
								className: "p-1.5 rounded-full hover:bg-zinc-800 font-bold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveProductEdit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold block mb-1 text-zinc-400",
										children: "Product Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: editName,
										onChange: (e) => setEditName(e.target.value),
										className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold block mb-1 text-zinc-400",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: editCategory,
										onChange: (e) => handleEditCategoryChange(e.target.value),
										className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none cursor-pointer bg-zinc-950 border-zinc-800 text-white",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hoodies",
												children: "🧥 Hoodies"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "jackets",
												children: "🧥 Jackets"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "tshirts",
												children: "👕 T-Shirts"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "shoes",
												children: "👟 Shoes"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "pants",
												children: "👖 Pants & Shorts"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold block mb-1 text-zinc-400",
										children: "Cost Price ($)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: editCostPrice,
										onChange: (e) => setEditCostPrice(e.target.value),
										className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold block mb-1 text-zinc-400",
										children: "Selling Price ($)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: editPrice,
										onChange: (e) => setEditPrice(e.target.value),
										className: "w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-zinc-950 border-zinc-800 text-white focus:border-zinc-600"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-2xl border bg-zinc-950 border-zinc-800 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-black block text-amber-400",
										children: "Update Quantity per Size:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3",
										children: getAvailableSizes(editCategory).map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-bold text-zinc-400 block",
												children: ["Size ", size]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												placeholder: "Qty",
												value: editSizesStock[size] ?? "",
												onChange: (e) => handleEditSizeStockChange(size, e.target.value),
												className: "w-full px-3 py-2 rounded-xl border text-xs outline-none bg-zinc-900 border-zinc-700 text-white text-center font-mono"
											})]
										}, size))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 pt-3 border-t border-zinc-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setEditingProduct(null),
										className: "w-1/2 py-3 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: isSavingEdit,
										className: "w-1/2 py-3 rounded-xl font-bold text-xs bg-amber-400 text-black hover:bg-amber-500 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50",
										children: [isSavingEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Changes" })]
									})]
								})
							]
						})]
					})
				}),
				selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-lg rounded-3xl p-6 shadow-2xl border space-y-5 my-8 bg-zinc-900 border-zinc-800 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pb-4 border-b border-neutral-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-black text-lg flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "w-5 h-5 text-emerald-400" }),
										"J-STORE - Order Details #",
										selectedOrder.id
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedOrder(null),
									className: "p-1.5 rounded-full hover:bg-neutral-800 font-bold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border flex items-center justify-between bg-zinc-950 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-400 font-bold",
											children: "Order Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: selectedOrder.status || "pending",
											onChange: (e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value),
											className: `px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-700 cursor-pointer outline-none ${getStatusColorClass(selectedOrder.status)}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "pending",
												className: "text-amber-500 font-bold bg-zinc-900",
												children: "Pending"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "completed",
												className: "text-emerald-400 font-bold bg-zinc-900",
												children: "Completed"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border flex items-center justify-between bg-zinc-950 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-400 block mb-1",
											children: "Customer Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-extrabold text-sm",
											children: selectedOrder.customer_name || "General"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-gray-400 block mb-1",
												children: "Phone Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `tel:${selectedOrder.phone || ""}`,
												className: "font-mono font-extrabold text-sm text-blue-400 underline",
												children: selectedOrder.phone || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border bg-zinc-950 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-400 block mb-1",
											children: "Delivery Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono font-bold text-red-500",
											children: selectedOrder.address || "In-Store"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border space-y-3 bg-zinc-950 border-zinc-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-extrabold text-xs border-b pb-2 border-zinc-800",
											children: "Order Items & Sizes:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2 max-h-48 overflow-y-auto pr-1",
											children: selectedOrder && Array.isArray(selectedOrder.items) && selectedOrder.items.map((item, idx) => {
												const itemPrice = Number(item.price) || 0;
												const itemQty = Number(item.qty) || 1;
												const itemTotal = itemPrice * itemQty;
												const itemSize = item.selectedSize || item.size || "N/A";
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center border-b border-zinc-800/50 pb-2 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-bold",
														children: item.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono font-bold mt-1 inline-block",
														children: ["Size: ", itemSize]
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-mono font-bold",
														children: [
															"$",
															itemPrice,
															" × ",
															itemQty,
															" = ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-emerald-400",
																children: ["$", itemTotal]
															})
														]
													})]
												}, idx);
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-2xl border flex justify-between items-center font-black text-sm bg-zinc-950 border-zinc-800 text-zinc-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-lg font-black text-emerald-400",
											children: ["$", selectedOrder.totals ?? selectedOrder.total]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => window.print(),
									className: "flex-1 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-4 h-4" }), " Print Invoice"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedOrder(null),
									className: "flex-1 py-3 rounded-xl font-bold text-xs transition border bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700",
									children: "Close Card"
								})]
							})
						]
					})
				}),
				isCheckoutOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 no-print",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-md rounded-3xl p-6 shadow-2xl border bg-zinc-900 border-zinc-800 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-base",
								children: "Confirm Sale"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsCheckoutOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handlePOSCheckout,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold block mb-1",
									children: "Customer Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: customerInfo.name,
									onChange: (e) => setCustomerInfo({
										...customerInfo,
										name: e.target.value
									}),
									className: "w-full px-4 py-2.5 rounded-xl border text-xs bg-zinc-950 border-zinc-800 text-white outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold block mb-1",
									children: "Phone Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									value: customerInfo.phone,
									onChange: (e) => setCustomerInfo({
										...customerInfo,
										phone: e.target.value
									}),
									className: "w-full px-4 py-2.5 rounded-xl border text-xs bg-zinc-950 border-zinc-800 text-white outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold block mb-2",
									children: "Payment Method:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: [
										{
											id: "Cash",
											label: "Cash"
										},
										{
											id: "Syriatel Cash",
											label: "Syriatel Cash"
										},
										{
											id: "Sham Cash",
											label: "Sham Cash"
										}
									].map((pm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition ${customerInfo.paymentMethod === pm.id ? "bg-zinc-800 border-zinc-600 text-white font-bold" : "bg-zinc-950 border-zinc-800 text-zinc-400"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "posPayment",
											value: pm.id,
											checked: customerInfo.paymentMethod === pm.id,
											onChange: (e) => setCustomerInfo({
												...customerInfo,
												paymentMethod: e.target.value
											}),
											className: "w-4 h-4 accent-white cursor-pointer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pm.label })]
									}, pm.id))
								})] }),
								(customerInfo.paymentMethod === "Syriatel Cash" || customerInfo.paymentMethod === "Sham Cash") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold block mb-1 text-emerald-400",
									children: "Enter Transaction Code / Account No. *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. TX-984201",
									value: customerInfo.txCode,
									onChange: (e) => setCustomerInfo({
										...customerInfo,
										txCode: e.target.value
									}),
									className: "w-full px-4 py-2.5 rounded-xl border text-xs bg-zinc-950 border-zinc-800 text-white outline-none font-mono"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsCheckoutOpen(false),
										disabled: isSubmittingOrder,
										className: "px-4 py-3 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-300",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isSubmittingOrder,
										className: "flex-1 py-3 rounded-xl font-bold text-xs bg-white text-black flex items-center justify-center gap-2 cursor-pointer",
										children: isSubmittingOrder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-black" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Complete Sale" })
									})]
								})
							]
						})]
					})
				}),
				showPrintPrompt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 no-print",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-sm rounded-3xl p-6 text-center space-y-5 border bg-zinc-900 border-zinc-800 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-10 h-10 text-emerald-400 mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-base",
								children: "Sale Completed Successfully!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-400",
								children: "Would you like to print the invoice for this order now?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleSkipPrint,
									className: "flex-1 py-3 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-300",
									children: "No, Skip"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleConfirmPrint,
									className: "flex-1 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-4 h-4" }), " Print Invoice"]
								})]
							})
						]
					})
				})
			]
		})
	});
}
var SplitComponent = AdminView;
//#endregion
export { SplitComponent as component };
