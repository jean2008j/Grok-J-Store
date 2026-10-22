import { MapPin, Truck, RefreshCw, CreditCard, MessageCircle, CheckCircle2, Store } from 'lucide-react';

// غيّر الرقم لرقم واتساب المتجر الحقيقي (صيغة دولية بدون + أو 00)
export const STORE_WHATSAPP = '963900000000';

const WHATSAPP_LINK = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent('مرحباً، عندي استفسار عن منتجات J-STORE')}`;

type Lang = 'AR' | 'EN';

const COPY = {
  EN: {
    policyTitle: 'Store Policies & Info',
    policySub: 'These details help you trust the store before sharing your name, number, or making any payment.',
    storeInfoTitle: 'About the Store',
    storeInfoText: 'J-STORE — Premium athletic apparel, footwear & sportswear. Based in Syria, we deliver nationwide with care.',
    deliveryTitle: 'Delivery Policy',
    deliveryItems: [
      'Damascus: Free delivery',
      'Other governorates: $1–$2 depending on the city',
      'Delivery time: 1–3 business days in Damascus, 2–5 days elsewhere',
      'We contact you to confirm the order before shipping',
    ],
    returnTitle: 'Exchange & Returns',
    returnItems: [
      'Exchange within 48 hours of delivery if unused and in original condition',
      'Size issues: free exchange for available sizes',
      'Returns accepted only for manufacturing defects',
      'Contact us on WhatsApp to arrange exchange/return',
    ],
    paymentPolicyTitle: 'Payment Methods',
    paymentItems: [
      'Cash on Delivery (COD)',
      'Syriatel Cash',
      'Sham Cash',
      'For online transfers, send the transaction code after placing the order',
    ],
    availabilityTitle: 'Product Availability',
    availabilityItems: [
      'Green “In Stock” badge = ready to ship immediately',
      '“Needs confirmation” = we verify stock within 1–2 hours before asking for payment',
      'Out-of-stock sizes cannot be ordered',
    ],
    contactTitle: 'Contact Us Directly',
    contactText: 'Questions before ordering? Message us on WhatsApp — we reply quickly.',
    whatsappBtn: 'Chat on WhatsApp',
    rights: 'All rights reserved',
  },
  AR: {
    policyTitle: 'سياسات ومعلومات المتجر',
    policySub: 'هاي التفاصيل بتساعدك تثق فينا قبل ما تبعت اسمك ورقمك أو تحوّل أي مصاري.',
    storeInfoTitle: 'معلومات المتجر',
    storeInfoText: 'جي ستور — ملابس وأحذية رياضية مختارة بعناية. نعمل من سوريا ونوصل لكل المحافظات.',
    deliveryTitle: 'سياسة التوصيل',
    deliveryItems: [
      'دمشق: توصيل مجاني',
      'باقي المحافظات: 1–2$ حسب المحافظة',
      'مدة التوصيل: 1–3 أيام عمل داخل دمشق، و2–5 أيام لباقي المحافظات',
      'يتم التواصل معك لتأكيد الطلب قبل الشحن',
    ],
    returnTitle: 'الاستبدال والإرجاع',
    returnItems: [
      'يمكن الاستبدال خلال 48 ساعة من الاستلام بشرط أن يكون المنتج غير مستخدم وبحالته الأصلية',
      'مشاكل المقاس: استبدال مجاني للمقاسات المتوفرة',
      'الإرجاع مقبول فقط في حال وجود عيب مصنعي',
      'تواصل معنا عبر واتساب لترتيب الاستبدال/الإرجاع',
    ],
    paymentPolicyTitle: 'طرق الدفع',
    paymentItems: [
      'الدفع عند الاستلام (COD)',
      'سيرياتيل كاش',
      'شام كاش',
      'في حال التحويل، أرسل رمز العملية بعد تأكيد الطلب',
    ],
    availabilityTitle: 'توفر المنتجات',
    availabilityItems: [
      'شارة «متوفر» الخضراء = جاهز للشحن فوراً',
      '«يحتاج تأكيد» = نتأكد من التوفر خلال ساعة أو ساعتين قبل أي تحويل',
      'المقاسات النافذة ما بتنطلب',
    ],
    contactTitle: 'تواصل مباشر',
    contactText: 'عندك سؤال قبل ما تطلب؟ راسلنا على واتساب — نرد بسرعة.',
    whatsappBtn: 'تواصل عبر واتساب',
    rights: 'جميع الحقوق محفوظة',
  },
};

function PolicyCard({
  icon,
  title,
  items,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  items?: string[];
  text?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101310] p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300/15 text-emerald-300">
          {icon}
        </span>
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      {text && <p className="text-[11px] sm:text-xs leading-relaxed text-neutral-300">{text}</p>}
      {items && (
        <ul className="space-y-1.5 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-emerald-400/80 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PoliciesSection({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <section id="policies" className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14 border-t border-white/[0.06]">
      <div className="mb-8 text-center">
        <p className="mb-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">J-STORE</p>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{t.policyTitle}</h2>
        <p className="mt-2 text-[11px] sm:text-xs text-neutral-400 max-w-lg mx-auto">{t.policySub}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <PolicyCard icon={<Store className="w-4 h-4" />} title={t.storeInfoTitle} text={t.storeInfoText} />
        <PolicyCard icon={<Truck className="w-4 h-4" />} title={t.deliveryTitle} items={t.deliveryItems} />
        <PolicyCard icon={<RefreshCw className="w-4 h-4" />} title={t.returnTitle} items={t.returnItems} />
        <PolicyCard icon={<CreditCard className="w-4 h-4" />} title={t.paymentPolicyTitle} items={t.paymentItems} />
        <PolicyCard icon={<CheckCircle2 className="w-4 h-4" />} title={t.availabilityTitle} items={t.availabilityItems} />

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300/20 text-emerald-300">
              <MessageCircle className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">{t.contactTitle}</h3>
          </div>
          <p className="text-[11px] sm:text-xs leading-relaxed text-neutral-300 flex-1">{t.contactText}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition shadow-lg shadow-emerald-900/20"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.whatsappBtn}
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-[10px] text-neutral-500">
        © {new Date().getFullYear()} J-STORE · {t.rights}
      </p>
    </section>
  );
}
