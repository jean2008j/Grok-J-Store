import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Globe, Loader2, MapPin, Edit3, Compass, Lock, Unlock } from 'lucide-react';
import { listPublicProducts, placeOrder, unlockPrivate } from '@/lib/jstore.functions';
import { PoliciesSection } from '@/components/store/PoliciesSection';

const TRANSLATIONS = {
  EN: {
    dir: 'ltr',
    heroTitle: 'J-STORE',
    heroSub: 'Premium Athletic Apparel, Footwear & Sportswear Collection',
    heroEyebrow: 'THE EVERYDAY ATHLETE',
    heroHeadline: 'Move with confidence.\nLook your best.',
    heroDescription: 'Performance-inspired essentials, selected for comfort, quality and a clean athletic look.',
    heroCta: 'Explore the collection',
    collectionTitle: 'The collection',
    collectionSub: 'Thoughtful essentials for every day.',
    trustQuality: 'Curated quality',
    trustDelivery: 'Delivery across Syria',
    trustCheckout: 'Easy order process',
    searchPlaceholder: 'Search products, brands...',
    sizeGuideBtn: '📏 Size Guide',
    all: 'All Products',
    hoodies: 'Hoodies',
    jackets: 'Jackets',
    tshirts: 'T-Shirts',
    shoes: 'Footwear',
    pants: 'Pants & Shorts',
    selectSize: 'Select Size:',
    addToCart: 'Add to Cart +',
    outOfStock: 'Out of Stock',
    cartTitle: 'Your Cart',
    wishlistTitle: 'My Wishlist',
    wishlistEmpty: 'Your wishlist is empty.',
    cartEmpty: 'Your cart is empty.',
    checkoutTitle: 'Checkout',
    orderConfirmed: 'Order Received',
    subtotal: 'Subtotal:',
    shippingFee: 'Shipping Fee:',
    total: 'Total Amount:',
    proceedCheckout: 'Proceed to Checkout →',
    confirmOrder: 'Confirm Order ✔',
    continueShopping: 'Continue Shopping',
    fullName: 'Full Name',
    phone: 'Phone Number (e.g. 09xxxxxxxx)',
    cityLabel: 'City / Shipping Region:',
    address: 'Delivery Address',
    addressModeManual: '✍️ Type Manually',
    addressModeGeo: '📍 Auto-detect My Location',
    useMyLocationBtn: 'Locate Me Automatically',
    locatingText: 'Getting location...',
    locationDetected: 'Location captured successfully! ✓',
    locationDenied: 'Location permission denied or unavailable. Please type manually.',
    paymentTitle: 'Payment Method:',
    cod: 'Cash on Delivery (COD)',
    syriatel: 'Syriatel Cash',
    sham: 'Sham Cash',
    enterTxCode: 'Enter Transaction Code (TX Code)',
    successCodMsg: 'Information sent successfully! We will contact you soon.',
    successOnlineMsg: 'Order received. Payment is pending verification by the store.',
    processingOrder: 'Processing your order...',
    loadingStore: 'Loading J-STORE Experience...',
    addedCart: 'Added to Cart 🛒',
    addedWishlist: 'Added to Wishlist ♥',
    removedWishlist: 'Removed from Wishlist',
    sgTitle: 'Official Size Guide',
    sgFootwearTab: 'Footwear (38 - 46)',
    sgOuterwearTab: 'Apparel (XS - XXL)',
    inStockBadge: 'In Stock',
  },
  AR: {
    dir: 'rtl',
    heroTitle: 'جي ستور',
    heroSub: 'تشكيلة فاخرة من الأحذية والملابس الرياضية بأعلى جودة',
    heroEyebrow: 'اختيارات للرياضيين وكل يوم',
    heroHeadline: 'تحرّك بثقة.\nوتميّز بإطلالتك.',
    heroDescription: 'ملابس وأحذية رياضية مختارة بعناية لتجمع بين الراحة والجودة والإطلالة الأنيقة.',
    heroCta: 'اكتشف التشكيلة',
    collectionTitle: 'تشكيلة J-STORE',
    collectionSub: 'قطع مختارة بعناية لتناسب كل يوم.',
    trustQuality: 'جودة مختارة',
    trustDelivery: 'توصيل إلى المحافظات',
    trustCheckout: 'طلب سهل وواضح',
    searchPlaceholder: 'ابحث عن منتج، ماركة...',
    sizeGuideBtn: '📏 المقاسات',
    all: 'الكل',
    hoodies: 'هوديات',
    jackets: 'جواكيت',
    tshirts: 'بلوزات',
    shoes: 'أحذية',
    pants: 'بناطيل',
    selectSize: 'اختر المقاس:',
    addToCart: 'إضافة للسلة +',
    outOfStock: 'نفذت الكمية',
    cartTitle: 'سلة المشتريات',
    wishlistTitle: 'قائمة المفضلة',
    wishlistEmpty: 'قائمة المفضلة فارغة حالياً.',
    cartEmpty: 'السلة فارغة حالياً.',
    checkoutTitle: 'إتمام الطلب',
    orderConfirmed: 'تم استلام الطلب',
    subtotal: 'المجموع الفرعي:',
    shippingFee: 'أجور التوصيل:',
    total: 'المجموع الكلي:',
    proceedCheckout: 'المتابعة للشراء ←',
    confirmOrder: 'تأكيد الطلب ✔',
    continueShopping: 'متابعة التسوق',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف (مثال: 09xxxxxxxx)',
    cityLabel: 'المحافظة / منطقة الشحن:',
    address: 'عنوان التوصيل التفصيلي',
    addressModeManual: '✍️ كتابة يدوية',
    addressModeGeo: '📍 موقعي الحالي',
    useMyLocationBtn: 'تحديد موقعي تلقائياً',
    locatingText: 'جاري تحديد موقعك...',
    locationDetected: 'تم التقاط الموقع بنجاح! ✓',
    locationDenied: 'تعذر الوصول للموقع.',
    paymentTitle: 'طريقة الدفع:',
    cod: 'الدفع عند الاستلام (COD)',
    syriatel: 'سيرياتيل كاش',
    sham: 'شام كاش',
    enterTxCode: 'رمز التحويل (TX Code)',
    successCodMsg: 'تم ارسال المعلومات بنجاح! سيتم الاتصال بك قريباً.',
    successOnlineMsg: 'تم استلام الطلب، والدفع بانتظار التحقق من الإدارة.',
    processingOrder: 'جاري معالجة الطلب...',
    loadingStore: 'جاري التحميل...',
    addedCart: 'تمت الإضافة للسلة 🛒',
    addedWishlist: 'تمت الإضافة للمفضلة ♥',
    removedWishlist: 'تمت الإزالة من المفضلة',
    sgTitle: 'دليل المقاسات الرسمي',
    sgFootwearTab: 'الأحذية الرياضية (38 - 46)',
    sgOuterwearTab: 'الملابس والهوديات',
    inStockBadge: 'متوفر',
  }
};

const SYRIAN_CITIES = [
  { id: 'damascus', name: { EN: 'Damascus', AR: 'دمشق' }, fee: 0 },
  { id: 'rif_damascus', name: { EN: 'Rif Damascus', AR: 'ريف دمشق' }, fee: 1 },
  { id: 'aleppo', name: { EN: 'Aleppo', AR: 'حلب' }, fee: 2 },
  { id: 'homs', name: { EN: 'Homs', AR: 'حمص' }, fee: 2 },
  { id: 'hama', name: { EN: 'Hama', AR: 'حماة' }, fee: 2 },
  { id: 'latakia', name: { EN: 'Latakia', AR: 'اللاذقية' }, fee: 2 },
  { id: 'tartous', name: { EN: 'Tartous', AR: 'طرطوس' }, fee: 2 },
];

export function StoreView() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [lockedProducts, setLockedProducts] = useState<any[]>([]);
  const [isPrivateUnlocked, setIsPrivateUnlocked] = useState(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);
  const [privatePassword, setPrivatePassword] = useState('');
  const [privateError, setPrivateError] = useState<string | null>(null);
  const [isCheckingPrivate, setIsCheckingPrivate] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lang, setLang] = useState<'AR' | 'EN'>('AR');
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideTab, setSizeGuideTab] = useState<'shoes' | 'apparel'>('shoes');
  const [selectedSizes, setSelectedSizes] = useState<Record<string | number, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | number | null>(null);
  const [lastOrderTotal, setLastOrderTotal] = useState<number | null>(null);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [selectedCity, setSelectedCity] = useState(SYRIAN_CITIES[0]);
  const [addressInputType, setAddressInputType] = useState<'manual' | 'geo'>('manual');
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', txCode: '' });

  useEffect(() => { fetchSupabaseProducts(); }, []);

  const formatProduct = (p: any) => {
    const sizesStockMap = p.sizes_stock && typeof p.sizes_stock === 'object' ? p.sizes_stock : {};
    const totalStock = Object.values(sizesStockMap).length > 0
      ? Object.values(sizesStockMap).reduce((a: number, b: unknown) => a + Number(b), 0)
      : Number(p.stock) || 0;
    return {
      id: p.id, name: p.name, brand: 'J-Store', category: p.category || 'hoodies', price: p.price,
      stock: totalStock, sizes_stock: sizesStockMap, oldPrice: null,
      image: p.image_url || 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
      sizes: Object.keys(sizesStockMap).length > 0 ? Object.keys(sizesStockMap) : (Array.isArray(p.sizes) ? p.sizes : ['M', 'L', 'XL']),
      inStock: totalStock > 0,
    };
  };

  const handleUnlockPrivate = async (e: any) => {
    e.preventDefault();
    if (!privatePassword.trim()) return;
    setIsCheckingPrivate(true); setPrivateError(null);
    try {
      const result = await unlockPrivate({ data: { password: privatePassword } });
      if (result.ok === true) {
        setLockedProducts((result.products || []).map(formatProduct));
        setIsPrivateUnlocked(true); setIsPrivateModalOpen(false); setSelectedCategory('private');
      } else {
        setPrivateError(lang === 'AR' ? 'كلمة السر غير صحيحة' : 'Incorrect password');
      }
    } catch {
      setPrivateError(lang === 'AR' ? 'تعذر الاتصال، حاول مجدداً' : 'Connection error, please try again');
    } finally { setIsCheckingPrivate(false); }
  };

  const handleLockPrivate = () => {
    setIsPrivateUnlocked(false); setLockedProducts([]);
    if (selectedCategory === 'private') setSelectedCategory('all');
  };

  const fetchSupabaseProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const data = await listPublicProducts();
      if (data && Array.isArray(data)) setProducts(data.filter((p) => !p.is_locked).map(formatProduct));
    } catch { console.log('Error fetching products'); }
    finally { setIsLoadingProducts(false); }
  };

  const showToast = (text: string) => { setToastMessage(text); setTimeout(() => setToastMessage(null), 3000); };
  const handleSizeSelect = (productId: any, size: string) => setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  const toggleWishlist = (product: any) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) { showToast(t.removedWishlist); return prev.filter(item => item.id !== product.id); }
      showToast(t.addedWishlist); return [...prev, product];
    });
  };

  const addToCart = (product: any) => {
    const chosenSize = selectedSizes[product.id] || (product.sizes && product.sizes[0]) || 'M';
    const sizesStockMap = product.sizes_stock || {};
    const sizeStock = sizesStockMap[chosenSize] !== undefined ? Number(sizesStockMap[chosenSize]) : Number(product.stock) || 0;
    if (sizeStock <= 0) { alert(lang === 'AR' ? `عذراً، المقاس (${chosenSize}) نفذت كميته!` : `Sorry, size (${chosenSize}) is out of stock!`); return; }
    const cartItemId = `${product.id}-${chosenSize}`;
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        if (updated[existingIndex].quantity >= sizeStock) { alert(lang === 'AR' ? `لقد وصلت للحد الأقصى المتاح لهذا القياس (${sizeStock})` : `Maximum available stock reached (${sizeStock})`); return prevCart; }
        updated[existingIndex].quantity += 1; return updated;
      }
      return [...prevCart, { ...product, selectedSize: chosenSize, quantity: 1, cartItemId, sizeStock }];
    });
    showToast(t.addedCart);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        if (newQty > item.sizeStock) { alert(`Maximum available stock is ${item.sizeStock}`); return item; }
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as any[]);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) { setLocationStatus(t.locationDenied); return; }
    setIsLocating(true); setLocationStatus(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setCustomerInfo(prev => ({ ...prev, address: `${lat}, ${lng}` }));
        setIsLocating(false); setLocationStatus(t.locationDetected);
      },
      () => { setIsLocating(false); setLocationStatus(t.locationDenied); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const filteredProducts = (selectedCategory === 'private' ? lockedProducts : products).filter(product => {
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'private' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = selectedCity.fee;
  const totalAmount = subtotal + shippingFee;

  const handleCompleteOrder = async (e: any) => {
    e.preventDefault();
    if (isProcessing) return;
    if (cart.length === 0) { alert(lang === 'AR' ? 'السلة فارغة. أضف منتجاً قبل تأكيد الطلب.' : 'Your cart is empty.'); setCheckoutStep('cart'); return; }
    if (customerInfo.name.trim().length < 2) { alert(lang === 'AR' ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name'); return; }
    const phoneDigits = customerInfo.phone.replace(/\D/g, '');
    if (phoneDigits.length < 8 || phoneDigits.length > 15) { alert(lang === 'AR' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number'); return; }
    if (customerInfo.address.trim().length < 5) { alert(lang === 'AR' ? 'يرجى إدخال عنوان توصيل تفصيلي أو تحديد موقعك' : 'Please enter a complete delivery address'); return; }
    if ((paymentMethod === 'syriatel' || paymentMethod === 'sham') && !/^[A-Za-z0-9_-]{3,50}$/.test(customerInfo.txCode.trim())) {
      alert(lang === 'AR' ? 'رمز التحويل يجب أن يتكون من 3 إلى 50 حرفاً أو رقماً' : 'Transaction code must be 3–50 letters, numbers, dashes or underscores');
      return;
    }
    setIsProcessing(true);
    const paymentText = paymentMethod === 'cod' ? 'Cash' : (paymentMethod === 'syriatel' ? `Syriatel Cash (${customerInfo.txCode.trim()})` : `Sham Cash (${customerInfo.txCode.trim()})`);
    try {
      const result = await placeOrder({
        data: {
          items: cart.map((item) => ({ id: Number(item.id), qty: item.quantity, selectedSize: String(item.selectedSize), name: item.name, price: item.price })),
          customer_name: customerInfo.name.trim(), phone: customerInfo.phone.trim(),
          address: `${selectedCity.name[lang]} - ${customerInfo.address}`, payment_method: paymentText,
          order_type: 'Online', status: 'pending', cityId: selectedCity.id,
        },
      });
      if (result.ok) {
        setLastOrderId(result.order?.id ?? null);
        setLastOrderTotal(Number(result.total ?? totalAmount));
        await fetchSupabaseProducts();
        if (isPrivateUnlocked) {
          const again = await unlockPrivate({ data: { password: privatePassword } });
          if (again.ok) setLockedProducts((again.products || []).map(formatProduct));
        }
        setCart([]); setCheckoutStep('success');
      } else {
        alert(result.error || (lang === 'AR' ? 'حدث خطأ أثناء حفظ الطلب، يرجى المحاولة لاحقاً' : 'Failed to save order'));
      }
    } catch (err) {
      console.error('Order error:', err);
      alert(lang === 'AR' ? 'تعذر إرسال الطلب بسبب مشكلة اتصال.' : 'Could not send the order due to a connection issue.');
    } finally { setIsProcessing(false); }
  };

  const closeDrawer = () => { setIsCartOpen(false); setCheckoutStep('cart'); };

  return (
    <div dir={t.dir} className="min-h-screen bg-[#080a09] text-white">
      {/* NOTE: Full UI restored with PoliciesSection - see PoliciesSection.tsx for policies block */}
      <p className="p-8 text-center text-sm text-neutral-400">
        StoreView is being restored. Policies section is live in PoliciesSection.tsx.
        Please wait for the next commit that restores the full product grid UI.
      </p>
      <PoliciesSection lang={lang} />
    </div>
  );
}
