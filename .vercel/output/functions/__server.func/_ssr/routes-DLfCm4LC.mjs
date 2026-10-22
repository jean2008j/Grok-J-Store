import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as unlockPrivate, n as listPublicProducts, r as placeOrder } from "./jstore.functions-DYyiTHgu.mjs";
import { C as Globe, D as Compass, _ as MapPin, b as LockOpen, h as PenLine, x as LoaderCircle, y as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DLfCm4LC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRANSLATIONS = {
	EN: {
		dir: "ltr",
		heroTitle: "J-STORE",
		heroSub: "Premium Athletic Apparel, Footwear & Sportswear Collection",
		searchPlaceholder: "Search products, brands...",
		sizeGuideBtn: "📏 Size Guide",
		all: "All Products",
		hoodies: "Hoodies",
		jackets: "Jackets",
		tshirts: "T-Shirts",
		shoes: "Footwear",
		pants: "Pants & Shorts",
		selectSize: "Select Size:",
		addToCart: "Add to Cart +",
		outOfStock: "Out of Stock",
		cartTitle: "Your Cart",
		wishlistTitle: "My Wishlist",
		wishlistEmpty: "Your wishlist is empty.",
		cartEmpty: "Your cart is empty.",
		checkoutTitle: "Checkout",
		orderConfirmed: "Order Confirmed!",
		subtotal: "Subtotal:",
		shippingFee: "Shipping Fee:",
		total: "Total Amount:",
		proceedCheckout: "Proceed to Checkout →",
		confirmOrder: "Confirm Order ✔",
		continueShopping: "Continue Shopping",
		fullName: "Full Name",
		phone: "Phone Number (e.g. 09xxxxxxxx)",
		cityLabel: "City / Shipping Region:",
		address: "Delivery Address",
		addressModeManual: "✍️ Type Manually",
		addressModeGeo: "📍 Auto-detect My Location",
		useMyLocationBtn: "Locate Me Automatically",
		locatingText: "Getting location...",
		locationDetected: "Location captured successfully! ✓",
		locationDenied: "Location permission denied or unavailable. Please type manually.",
		paymentTitle: "Payment Method:",
		cod: "Cash on Delivery (COD)",
		syriatel: "Syriatel Cash",
		sham: "Sham Cash",
		enterTxCode: "Enter Transaction Code (TX Code)",
		successCodMsg: "Information sent successfully! We will contact you soon.",
		successOnlineMsg: "Payment transaction completed successfully! Order placed.",
		processingOrder: "Processing your order...",
		loadingStore: "Loading J-STORE Experience...",
		addedCart: "Added to Cart 🛒",
		addedWishlist: "Added to Wishlist ♥",
		removedWishlist: "Removed from Wishlist",
		sgTitle: "Official Size Guide",
		sgFootwearTab: "Footwear (38 - 46)",
		sgOuterwearTab: "Apparel (XS - XXL)"
	},
	AR: {
		dir: "rtl",
		heroTitle: "جي ستور",
		heroSub: "تشكيلة فاخرة من الأحذية والملابس الرياضية بأعلى جودة",
		searchPlaceholder: "ابحث عن منتج، ماركة...",
		sizeGuideBtn: "📏 المقاسات",
		all: "الكل",
		hoodies: "هوديات",
		jackets: "جواكيت",
		tshirts: "بلوزات",
		shoes: "أحذية",
		pants: "بناطيل",
		selectSize: "اختر المقاس:",
		addToCart: "إضافة للسلة +",
		outOfStock: "نفذت الكمية",
		cartTitle: "سلة المشتريات",
		wishlistTitle: "قائمة المفضلة",
		wishlistEmpty: "قائمة المفضلة فارغة حالياً.",
		cartEmpty: "السلة فارغة حالياً.",
		checkoutTitle: "إتمام الطلب",
		orderConfirmed: "تم تأكيد الطلب بنجاح!",
		subtotal: "المجموع الفرعي:",
		shippingFee: "أجور التوصيل:",
		total: "المجموع الكلي:",
		proceedCheckout: "المتابعة للشراء ←",
		confirmOrder: "تأكيد الطلب ✔",
		continueShopping: "متابعة التسوق",
		fullName: "الاسم الكامل",
		phone: "رقم الهاتف (مثال: 09xxxxxxxx)",
		cityLabel: "المحافظة / منطقة الشحن:",
		address: "عنوان التوصيل التفصيلي",
		addressModeManual: "✍️ كتابة يدوية",
		addressModeGeo: "📍 موقعي الحالي",
		useMyLocationBtn: "تحديد موقعي تلقائياً",
		locatingText: "جاري تحديد موقعك...",
		locationDetected: "تم التقاط الموقع بنجاح! ✓",
		locationDenied: "تعذر الوصول للموقع.",
		paymentTitle: "طريقة الدفع:",
		cod: "الدفع عند الاستلام (COD)",
		syriatel: "سيرياتيل كاش",
		sham: "شام كاش",
		enterTxCode: "رمز التحويل (TX Code)",
		successCodMsg: "تم ارسال المعلومات بنجاح! سيتم الاتصال بك قريباً.",
		successOnlineMsg: "تمت عملية الدفع بنجاح!",
		processingOrder: "جاري معالجة الطلب...",
		loadingStore: "جاري التحميل...",
		addedCart: "تمت الإضافة للسلة 🛒",
		addedWishlist: "تمت الإضافة للمفضلة ♥",
		removedWishlist: "تمت الإزالة من المفضلة",
		sgTitle: "دليل المقاسات الرسمي",
		sgFootwearTab: "الأحذية الرياضية (38 - 46)",
		sgOuterwearTab: "الملابس والهوديات"
	}
};
var SYRIAN_CITIES = [
	{
		id: "damascus",
		name: {
			EN: "Damascus",
			AR: "دمشق"
		},
		fee: 0
	},
	{
		id: "rif_damascus",
		name: {
			EN: "Rif Damascus",
			AR: "ريف دمشق"
		},
		fee: 1
	},
	{
		id: "aleppo",
		name: {
			EN: "Aleppo",
			AR: "حلب"
		},
		fee: 2
	},
	{
		id: "homs",
		name: {
			EN: "Homs",
			AR: "حمص"
		},
		fee: 2
	},
	{
		id: "hama",
		name: {
			EN: "Hama",
			AR: "حماة"
		},
		fee: 2
	},
	{
		id: "latakia",
		name: {
			EN: "Latakia",
			AR: "اللاذقية"
		},
		fee: 2
	},
	{
		id: "tartous",
		name: {
			EN: "Tartous",
			AR: "طرطوس"
		},
		fee: 2
	}
];
function StoreView() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [isLoadingProducts, setIsLoadingProducts] = (0, import_react.useState)(true);
	const [lockedProducts, setLockedProducts] = (0, import_react.useState)([]);
	const [isPrivateUnlocked, setIsPrivateUnlocked] = (0, import_react.useState)(false);
	const [isPrivateModalOpen, setIsPrivateModalOpen] = (0, import_react.useState)(false);
	const [privatePassword, setPrivatePassword] = (0, import_react.useState)("");
	const [privateError, setPrivateError] = (0, import_react.useState)(null);
	const [isCheckingPrivate, setIsCheckingPrivate] = (0, import_react.useState)(false);
	const [isInitialLoading, setIsInitialLoading] = (0, import_react.useState)(false);
	const [lang, setLang] = (0, import_react.useState)("EN");
	const t = TRANSLATIONS[lang];
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [isCartOpen, setIsCartOpen] = (0, import_react.useState)(false);
	const [isWishlistOpen, setIsWishlistOpen] = (0, import_react.useState)(false);
	const [isSizeGuideOpen, setIsSizeGuideOpen] = (0, import_react.useState)(false);
	const [sizeGuideTab, setSizeGuideTab] = (0, import_react.useState)("shoes");
	const [selectedSizes, setSelectedSizes] = (0, import_react.useState)({});
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [checkoutStep, setCheckoutStep] = (0, import_react.useState)("cart");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("cod");
	const [selectedCity, setSelectedCity] = (0, import_react.useState)(SYRIAN_CITIES[0]);
	const [addressInputType, setAddressInputType] = (0, import_react.useState)("manual");
	const [isLocating, setIsLocating] = (0, import_react.useState)(false);
	const [locationStatus, setLocationStatus] = (0, import_react.useState)(null);
	const [customerInfo, setCustomerInfo] = (0, import_react.useState)({
		name: "",
		phone: "",
		address: "",
		txCode: ""
	});
	(0, import_react.useEffect)(() => {
		fetchSupabaseProducts();
	}, []);
	const formatProduct = (p) => {
		const sizesStockMap = p.sizes_stock && typeof p.sizes_stock === "object" ? p.sizes_stock : {};
		const totalStock = Object.values(sizesStockMap).length > 0 ? Object.values(sizesStockMap).reduce((a, b) => a + Number(b), 0) : Number(p.stock) || 0;
		return {
			id: p.id,
			name: p.name,
			brand: "J-Store",
			category: p.category || "hoodies",
			price: p.price,
			stock: totalStock,
			sizes_stock: sizesStockMap,
			oldPrice: null,
			image: p.image_url || "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
			sizes: Object.keys(sizesStockMap).length > 0 ? Object.keys(sizesStockMap) : Array.isArray(p.sizes) ? p.sizes : [
				"M",
				"L",
				"XL"
			],
			inStock: totalStock > 0
		};
	};
	const handleUnlockPrivate = async (e) => {
		e.preventDefault();
		if (!privatePassword.trim()) return;
		setIsCheckingPrivate(true);
		setPrivateError(null);
		try {
			const result = await unlockPrivate({ data: { password: privatePassword } });
			if (result.ok === true) {
				setLockedProducts((result.products || []).map(formatProduct));
				setIsPrivateUnlocked(true);
				setIsPrivateModalOpen(false);
				setSelectedCategory("private");
			} else setPrivateError(lang === "AR" ? "كلمة السر غير صحيحة" : "Incorrect password");
		} catch (err) {
			setPrivateError(lang === "AR" ? "تعذر الاتصال، حاول مجدداً" : "Connection error, please try again");
		} finally {
			setIsCheckingPrivate(false);
		}
	};
	const handleLockPrivate = () => {
		setIsPrivateUnlocked(false);
		setLockedProducts([]);
		if (selectedCategory === "private") setSelectedCategory("all");
	};
	const fetchSupabaseProducts = async () => {
		setIsLoadingProducts(true);
		try {
			const data = await listPublicProducts();
			if (data && Array.isArray(data)) setProducts(data.filter((p) => !p.is_locked).map(formatProduct));
		} catch (err) {
			console.log("Error fetching products");
		} finally {
			setIsLoadingProducts(false);
		}
	};
	const showToast = (text) => {
		setToastMessage(text);
		setTimeout(() => setToastMessage(null), 3e3);
	};
	const handleSizeSelect = (productId, size) => {
		setSelectedSizes((prev) => ({
			...prev,
			[productId]: size
		}));
	};
	const toggleWishlist = (product) => {
		setWishlist((prev) => {
			if (prev.some((item) => item.id === product.id)) {
				showToast(t.removedWishlist);
				return prev.filter((item) => item.id !== product.id);
			} else {
				showToast(t.addedWishlist);
				return [...prev, product];
			}
		});
	};
	const addToCart = (product) => {
		const chosenSize = selectedSizes[product.id] || product.sizes && product.sizes[0] || "M";
		const sizesStockMap = product.sizes_stock || {};
		const sizeStock = sizesStockMap[chosenSize] !== void 0 ? Number(sizesStockMap[chosenSize]) : Number(product.stock) || 0;
		if (sizeStock <= 0) {
			alert(lang === "AR" ? `عذراً، المقاس (${chosenSize}) نفذت كميته!` : `Sorry, size (${chosenSize}) is out of stock!`);
			return;
		}
		const cartItemId = `${product.id}-${chosenSize}`;
		setCart((prevCart) => {
			const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
			if (existingIndex > -1) {
				const updated = [...prevCart];
				if (updated[existingIndex].quantity >= sizeStock) {
					alert(lang === "AR" ? `لقد وصلت للحد الأقصى المتاح لهذا القياس (${sizeStock})` : `Maximum available stock reached (${sizeStock})`);
					return prevCart;
				}
				updated[existingIndex].quantity += 1;
				return updated;
			}
			return [...prevCart, {
				...product,
				selectedSize: chosenSize,
				quantity: 1,
				cartItemId,
				sizeStock
			}];
		});
		showToast(t.addedCart);
	};
	const updateQuantity = (cartItemId, delta) => {
		setCart((prevCart) => {
			return prevCart.map((item) => {
				if (item.cartItemId === cartItemId) {
					const newQty = item.quantity + delta;
					if (newQty > item.sizeStock) {
						alert(`Maximum available stock is ${item.sizeStock}`);
						return item;
					}
					return newQty > 0 ? {
						...item,
						quantity: newQty
					} : null;
				}
				return item;
			}).filter(Boolean);
		});
	};
	const handleGetCurrentLocation = () => {
		if (!navigator.geolocation) {
			setLocationStatus(t.locationDenied);
			return;
		}
		setIsLocating(true);
		setLocationStatus(null);
		navigator.geolocation.getCurrentPosition((position) => {
			const geoAddress = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
			setCustomerInfo((prev) => ({
				...prev,
				address: geoAddress
			}));
			setIsLocating(false);
			setLocationStatus(t.locationDetected);
		}, () => {
			setIsLocating(false);
			setLocationStatus(t.locationDenied);
		}, {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	};
	const filteredProducts = (selectedCategory === "private" ? lockedProducts : products).filter((product) => {
		const matchesCategory = selectedCategory === "all" || selectedCategory === "private" || product.category === selectedCategory;
		const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});
	const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const shippingFee = selectedCity.fee;
	const totalAmount = subtotal + shippingFee;
	const handleCompleteOrder = async (e) => {
		e.preventDefault();
		if (!customerInfo.address.trim()) {
			alert(lang === "AR" ? "يرجى إدخال عنوان التوصيل أو التقاط موقعك الجغرافي" : "Please enter delivery address");
			return;
		}
		if ((paymentMethod === "syriatel" || paymentMethod === "sham") && !customerInfo.txCode.trim()) {
			alert(t.enterTxCode);
			return;
		}
		setIsProcessing(true);
		const paymentText = paymentMethod === "cod" ? "Cash" : paymentMethod === "syriatel" ? `Syriatel Cash (${customerInfo.txCode})` : `Sham Cash (${customerInfo.txCode})`;
		cart.map((item) => ({
			id: item.id,
			name: item.name,
			price: item.price,
			qty: item.quantity,
			selectedSize: item.selectedSize
		}));
		try {
			const result = await placeOrder({ data: {
				items: cart.map((item) => ({
					id: Number(item.id),
					qty: item.quantity,
					selectedSize: String(item.selectedSize),
					name: item.name,
					price: item.price
				})),
				customer_name: customerInfo.name || "Online Customer",
				phone: customerInfo.phone || "-",
				address: `${selectedCity.name[lang]} - ${customerInfo.address}`,
				payment_method: paymentText,
				order_type: "Online",
				status: "pending",
				cityId: selectedCity.id
			} });
			if (result.ok) {
				await fetchSupabaseProducts();
				if (isPrivateUnlocked) {
					const again = await unlockPrivate({ data: { password: privatePassword } });
					if (again.ok) setLockedProducts((again.products || []).map(formatProduct));
				}
				setCart([]);
				setCheckoutStep("success");
			} else alert(result.error || (lang === "AR" ? "حدث خطأ أثناء حفظ الطلب، يرجى المحاولة لاحقاً" : "Failed to save order"));
		} catch (err) {
			console.log("Order error:", err);
		} finally {
			setIsProcessing(false);
		}
	};
	const closeDrawer = () => {
		setIsCartOpen(false);
		setIsWishlistOpen(false);
		setTimeout(() => {
			setCheckoutStep("cart");
			setLocationStatus(null);
		}, 300);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen font-sans antialiased bg-black text-white overflow-x-hidden",
		dir: t.dir,
		children: [
			isInitialLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-16 h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center font-black text-xs text-white",
							children: "J"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-black tracking-widest text-white uppercase italic",
						children: "J-STORE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-gray-400 font-medium animate-pulse",
						children: t.loadingStore
					})
				]
			}),
			toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl border border-neutral-700 animate-bounce pointer-events-auto whitespace-nowrap",
					children: toastMessage
				})
			}),
			isPrivateModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4",
				onClick: () => {
					setIsPrivateModalOpen(false);
					setPrivateError(null);
					setPrivatePassword("");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleUnlockPrivate,
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-10 h-10 rounded-full bg-white text-black flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-black text-white",
							children: lang === "AR" ? "القسم الخاص" : "Private Section"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							autoFocus: true,
							value: privatePassword,
							onChange: (e) => {
								setPrivatePassword(e.target.value);
								setPrivateError(null);
							},
							placeholder: lang === "AR" ? "أدخل كلمة السر" : "Enter password",
							className: "w-full text-xs py-2.5 rounded-full border outline-none px-4 bg-black border-neutral-800 text-white placeholder-neutral-500 text-center"
						}),
						privateError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-red-400",
							children: privateError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: isCheckingPrivate,
							className: "w-full py-2.5 rounded-full text-xs font-bold bg-white text-black flex items-center justify-center gap-2 cursor-pointer",
							children: [isCheckingPrivate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "AR" ? "فتح" : "Unlock" })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 backdrop-blur-md border-b px-3 sm:px-8 py-3.5 bg-black/90 border-neutral-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl sm:text-4xl font-black tracking-tight uppercase italic text-white",
						children: t.heroTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] sm:text-xs font-medium text-neutral-400 mt-0.5",
						children: t.heroSub
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: t.searchPlaceholder,
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "w-full text-xs py-2 rounded-full border outline-none px-3.5 bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:gap-2 flex-shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setLang(lang === "AR" ? "EN" : "AR"),
								className: "flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-full border transition bg-zinc-900 border-zinc-800 text-zinc-200 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5" }), lang === "AR" ? "EN" : "عربي"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => isPrivateUnlocked ? handleLockPrivate() : setIsPrivateModalOpen(true),
								type: "button",
								title: isPrivateUnlocked ? lang === "AR" ? "إقفال القسم الخاص" : "Lock private section" : lang === "AR" ? "القسم الخاص" : "Private section",
								className: "p-2 rounded-full border flex items-center justify-center bg-neutral-900 border-neutral-800 cursor-pointer hover:bg-neutral-800 transition",
								children: isPrivateUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-neutral-300" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "hidden sm:block px-3 py-1.5 rounded-full text-xs font-bold border transition bg-neutral-900 border-neutral-800 text-gray-300",
								children: "Admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsSizeGuideOpen(true),
								className: "hidden sm:block px-3 py-1.5 rounded-full text-xs font-bold border transition bg-neutral-900 border-neutral-800 text-gray-300 cursor-pointer",
								children: t.sizeGuideBtn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setIsWishlistOpen(true),
								type: "button",
								className: "relative p-2 rounded-full border flex items-center justify-center bg-neutral-900 border-neutral-800 text-white cursor-pointer z-50 hover:bg-neutral-800 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-4 h-4 text-red-500 fill-current",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
								}), wishlist.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center",
									children: wishlist.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setIsCartOpen(true),
								type: "button",
								className: "relative p-2 rounded-full border flex items-center justify-center bg-white text-black border-white cursor-pointer z-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									})
								}), totalCartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center",
									children: totalCartCount
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-7xl mx-auto px-3 sm:px-4 pt-4 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-2 scrollbar-none",
					children: [
						{
							id: "all",
							label: t.all
						},
						{
							id: "hoodies",
							label: t.hoodies
						},
						{
							id: "jackets",
							label: t.jackets
						},
						{
							id: "tshirts",
							label: t.tshirts
						},
						{
							id: "shoes",
							label: t.shoes
						},
						{
							id: "pants",
							label: t.pants
						},
						...isPrivateUnlocked ? [{
							id: "private",
							label: lang === "AR" ? "🔒 خاص" : "🔒 Private"
						}] : []
					].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedCategory(tab.id),
						className: `px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === tab.id ? "bg-white text-black" : "bg-neutral-900 text-gray-300 border border-neutral-800 hover:bg-neutral-800"}`,
						children: tab.label
					}, tab.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-20",
				children: isLoadingProducts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6",
					children: [
						1,
						2,
						3,
						4,
						5,
						6
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl sm:rounded-2xl border p-3 sm:p-4 flex flex-col justify-between animate-pulse bg-neutral-900/60 border-neutral-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square rounded-lg sm:rounded-xl mb-3 bg-neutral-800" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 rounded w-1/4 bg-neutral-800" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 rounded w-3/4 bg-neutral-800" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 rounded-lg w-full mt-2 bg-neutral-800" })
							]
						})]
					}, n))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6",
					children: filteredProducts.map((product) => {
						const currentSelectedSize = selectedSizes[product.id] || product.sizes && product.sizes[0];
						const isWishlisted = wishlist.some((item) => item.id === product.id);
						const sizesStockMap = product.sizes_stock || {};
						sizesStockMap[currentSelectedSize] !== void 0 ? Number(sizesStockMap[currentSelectedSize]) : Number(product.stock);
						const isCompletelyOutOfStock = product.stock <= 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-neutral-900 border border-neutral-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between w-full relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										toggleWishlist(product);
									},
									type: "button",
									className: `absolute top-4 ${t.dir === "rtl" ? "left-4" : "right-4"} w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer z-30 shadow-lg`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `w-4 h-4 transition ${isWishlisted ? "text-red-500 fill-current" : "text-white"}`,
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-black mb-2 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: product.image,
											alt: product.name,
											className: "w-full h-full object-cover"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-bold text-gray-400 uppercase",
											children: product.brand
										}), isCompletelyOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400",
											children: lang === "AR" ? "نفذ" : "Out of Stock"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-bold text-white line-clamp-1 mb-2",
										children: product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-gray-400 block mb-1 font-medium",
											children: t.selectSize
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1",
											children: product.sizes && product.sizes.map((size) => {
												const isSizeOut = (sizesStockMap[size] !== void 0 ? Number(sizesStockMap[size]) : Number(product.stock) > 0 ? 1 : 0) <= 0;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													disabled: isSizeOut,
													onClick: () => handleSizeSelect(product.id, size),
													className: `text-[9px] font-semibold px-2 py-0.5 rounded border transition ${currentSelectedSize === size && !isSizeOut ? "bg-white text-black border-white" : "bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700 cursor-pointer"} ${isSizeOut ? "opacity-30 line-through cursor-not-allowed bg-neutral-900 text-neutral-500 border-neutral-800" : ""}`,
													children: size
												}, size);
											})
										})]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm sm:text-base font-black text-white mb-2",
										children: ["$", product.price]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => addToCart(product),
										disabled: isCompletelyOutOfStock || sizesStockMap[currentSelectedSize] !== void 0 && Number(sizesStockMap[currentSelectedSize]) <= 0,
										className: `w-full py-2 rounded-xl text-xs font-bold transition ${isCompletelyOutOfStock || sizesStockMap[currentSelectedSize] !== void 0 && Number(sizesStockMap[currentSelectedSize]) <= 0 ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-800" : "bg-white text-black hover:bg-gray-200 cursor-pointer"}`,
										children: isCompletelyOutOfStock || sizesStockMap[currentSelectedSize] !== void 0 && Number(sizesStockMap[currentSelectedSize]) <= 0 ? t.outOfStock : t.addToCart
									})]
								})
							]
						}, product.id);
					})
				})
			}),
			isWishlistOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-md h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-neutral-900 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center pb-4 border-b border-neutral-800 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-extrabold text-base flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♥" }),
								" ",
								t.wishlistTitle
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsWishlistOpen(false),
							className: "text-sm font-bold cursor-pointer p-1",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: wishlist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-center py-12 text-gray-500",
							children: t.wishlistEmpty
						}) : wishlist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs border-b border-neutral-800 pb-3 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: item.name,
									className: "w-12 h-12 object-cover rounded-lg border border-neutral-800 flex-shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-emerald-400 font-black",
									children: ["$", item.price]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										addToCart(item);
									},
									className: "px-3 py-1.5 bg-white text-black font-bold rounded-lg text-[10px] cursor-pointer hover:bg-gray-200",
									children: t.addToCart
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleWishlist(item),
									className: "p-1.5 text-neutral-400 hover:text-red-500 cursor-pointer",
									children: "✕"
								})]
							})]
						}, item.id))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-4 border-t border-neutral-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsWishlistOpen(false),
							className: "w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs cursor-pointer",
							children: t.continueShopping
						})
					})]
				})
			}),
			isSizeGuideOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xl rounded-3xl p-6 shadow-2xl border space-y-4 bg-neutral-900 border-neutral-800 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pb-3 border-b border-neutral-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-base",
								children: t.sgTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsSizeGuideOpen(false),
								className: "p-1.5 rounded-full hover:bg-neutral-800 font-bold cursor-pointer",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSizeGuideTab("shoes"),
								className: `flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${sizeGuideTab === "shoes" ? "bg-white text-black border-white" : "bg-neutral-800 text-gray-300 border-neutral-700"}`,
								children: t.sgFootwearTab
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSizeGuideTab("apparel"),
								className: `flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${sizeGuideTab === "apparel" ? "bg-white text-black border-white" : "bg-neutral-800 text-gray-300 border-neutral-700"}`,
								children: t.sgOuterwearTab
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto max-h-64",
							children: sizeGuideTab === "shoes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-xs text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-neutral-800 text-gray-300 font-bold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "EU Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Foot Length (cm)"
									})] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-neutral-800 font-mono",
									children: [
										{
											eu: "38",
											cm: "23.5 - 24.0"
										},
										{
											eu: "39",
											cm: "24.0 - 24.5"
										},
										{
											eu: "40",
											cm: "25.0"
										},
										{
											eu: "41",
											cm: "25.5 - 26.0"
										},
										{
											eu: "42",
											cm: "26.5"
										},
										{
											eu: "43",
											cm: "27.0 - 27.5"
										},
										{
											eu: "44",
											cm: "28.0"
										},
										{
											eu: "45",
											cm: "28.5 - 29.0"
										},
										{
											eu: "46",
											cm: "29.5 - 30.0"
										}
									].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-neutral-800/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-bold text-emerald-400",
											children: row.eu
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5",
											children: row.cm
										})]
									}, row.eu))
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-xs text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-neutral-800 text-gray-300 font-bold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Chest (cm)"
									})] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-neutral-800 font-mono",
									children: [
										{
											sz: "XS",
											chest: "86 - 91"
										},
										{
											sz: "S",
											chest: "92 - 97"
										},
										{
											sz: "M",
											chest: "98 - 103"
										},
										{
											sz: "L",
											chest: "104 - 109"
										},
										{
											sz: "XL",
											chest: "110 - 115"
										},
										{
											sz: "XXL",
											chest: "116 - 121"
										}
									].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-neutral-800/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-bold text-emerald-400",
											children: row.sz
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5",
											children: row.chest
										})]
									}, row.sz))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsSizeGuideOpen(false),
							className: "w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 font-bold rounded-xl text-xs cursor-pointer",
							children: "Close"
						})
					]
				})
			}),
			isCartOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-md h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-neutral-900 text-white",
					children: [
						isProcessing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-10 h-10 animate-spin text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold tracking-wide text-white",
								children: t.processingOrder
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pb-4 border-b border-neutral-800 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-extrabold text-base",
									children: [
										checkoutStep === "cart" && t.cartTitle,
										checkoutStep === "checkout" && t.checkoutTitle,
										checkoutStep === "success" && t.orderConfirmed
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: closeDrawer,
									className: "text-sm font-bold cursor-pointer",
									children: "✕"
								})]
							}),
							checkoutStep === "cart" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-center py-12 text-gray-500",
									children: t.cartEmpty
								}) : cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs border-b border-neutral-800 pb-3 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item.image,
											alt: item.name,
											className: "w-12 h-12 object-cover rounded-lg border border-neutral-800 flex-shrink-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-gray-400",
											children: [
												"$",
												item.price,
												" × ",
												item.quantity,
												" (",
												item.selectedSize,
												")"
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateQuantity(item.cartItemId, -1),
												className: "px-2 bg-neutral-800 rounded font-bold cursor-pointer",
												children: "-"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.quantity }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateQuantity(item.cartItemId, 1),
												className: "px-2 bg-neutral-800 rounded font-bold cursor-pointer",
												children: "+"
											})
										]
									})]
								}, item.cartItemId))
							}),
							checkoutStep === "checkout" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								id: "checkout-form",
								onSubmit: handleCompleteOrder,
								className: "space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: t.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: customerInfo.name,
										onChange: (e) => setCustomerInfo({
											...customerInfo,
											name: e.target.value
										}),
										className: "w-full p-2.5 rounded-xl border border-neutral-800 bg-black text-white"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: t.phone
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										required: true,
										value: customerInfo.phone,
										onChange: (e) => setCustomerInfo({
											...customerInfo,
											phone: e.target.value
										}),
										className: "w-full p-2.5 rounded-xl border border-neutral-800 bg-black text-white"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: t.cityLabel
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: selectedCity.id,
										onChange: (e) => setSelectedCity(SYRIAN_CITIES.find((c) => c.id === e.target.value)),
										className: "w-full p-2.5 rounded-xl border border-neutral-800 bg-black text-white font-bold cursor-pointer",
										children: SYRIAN_CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: c.id,
											children: [
												c.name[lang],
												" (",
												c.fee === 0 ? lang === "AR" ? "مجاني" : "Free" : `+$${c.fee}`,
												")"
											]
										}, c.id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 pt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold block",
												children: t.address
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-2 p-1 bg-black border border-neutral-800 rounded-xl",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setAddressInputType("manual"),
													className: `py-1.5 px-3 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${addressInputType === "manual" ? "bg-neutral-800 text-white shadow-sm" : "text-gray-400 hover:text-white"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-3.5 h-3.5" }), t.addressModeManual]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setAddressInputType("geo"),
													className: `py-1.5 px-3 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${addressInputType === "geo" ? "bg-neutral-800 text-white shadow-sm" : "text-gray-400 hover:text-white"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-3.5 h-3.5 text-blue-400" }), t.addressModeGeo]
												})]
											}),
											addressInputType === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: addressInputType === "manual",
												placeholder: lang === "AR" ? "مثال: جرمانا، شارع البلدية" : "e.g. Jaramana, Main St",
												value: customerInfo.address,
												onChange: (e) => setCustomerInfo({
													...customerInfo,
													address: e.target.value
												}),
												className: "w-full p-2.5 rounded-xl border border-neutral-800 bg-black text-white"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2 p-3 rounded-xl border border-neutral-800 bg-black text-center",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: handleGetCurrentLocation,
														disabled: isLocating,
														className: "w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition flex items-center justify-center gap-2 cursor-pointer",
														children: isLocating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.locatingText })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.useMyLocationBtn })] })
													}),
													customerInfo.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "pt-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															readOnly: true,
															value: customerInfo.address,
															className: "w-full p-2 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-mono text-[11px] text-center font-bold"
														})
													}),
													locationStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: `text-[10px] font-bold ${locationStatus.includes("✓") ? "text-emerald-400" : "text-amber-400"}`,
														children: locationStatus
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "font-bold block mb-2",
											children: t.paymentTitle
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2",
											children: [
												{
													id: "cod",
													label: t.cod
												},
												{
													id: "syriatel",
													label: t.syriatel
												},
												{
													id: "sham",
													label: t.sham
												}
											].map((pm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-2 border border-neutral-800 p-2.5 rounded-xl cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "payment",
													value: pm.id,
													checked: paymentMethod === pm.id,
													onChange: (e) => setPaymentMethod(e.target.value)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pm.label })]
											}, pm.id))
										})]
									}),
									(paymentMethod === "syriatel" || paymentMethod === "sham") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: t.enterTxCode
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: customerInfo.txCode,
										onChange: (e) => setCustomerInfo({
											...customerInfo,
											txCode: e.target.value
										}),
										className: "w-full p-2.5 rounded-xl border border-neutral-800 bg-black text-white font-mono"
									})] })
								]
							}),
							checkoutStep === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-8 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto font-bold text-lg",
										children: "✓"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-lg",
										children: t.orderConfirmed
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-emerald-400 font-semibold p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20",
										children: paymentMethod === "cod" ? t.successCodMsg : t.successOnlineMsg
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 border-t border-neutral-800 space-y-2",
							children: [
								checkoutStep === "cart" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-black text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.total }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", subtotal] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: cart.length === 0,
									onClick: () => setCheckoutStep("checkout"),
									className: "w-full py-3 bg-white text-black font-bold rounded-xl text-xs disabled:opacity-50 cursor-pointer",
									children: t.proceedCheckout
								})] }),
								checkoutStep === "checkout" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-xs border-b border-neutral-800 pb-2 mb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-gray-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.subtotal }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", subtotal] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-gray-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.shippingFee }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shippingFee === 0 ? lang === "AR" ? "مجاني" : "Free" : `$${shippingFee}` })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-black text-sm pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.total }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-emerald-400",
												children: ["$", totalAmount]
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									form: "checkout-form",
									className: "w-full py-3 bg-white text-black font-bold rounded-xl text-xs cursor-pointer",
									children: t.confirmOrder
								})] }),
								checkoutStep === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setCart([]);
										closeDrawer();
									},
									className: "w-full py-3 bg-white text-black font-bold rounded-xl text-xs cursor-pointer",
									children: t.continueShopping
								})
							]
						})
					]
				})
			})
		]
	});
}
var SplitComponent = StoreView;
//#endregion
export { SplitComponent as component };
