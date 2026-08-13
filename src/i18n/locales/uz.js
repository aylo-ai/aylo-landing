/*
  O'zbekcha (lotin yozuvi) — sahifaning asosiy tili.

  This is the default language AND the fallback for any key missing from
  another locale, so it must always be complete. Latin script throughout, as
  used in Uzbekistan. Apostrophes in o' / g' are the ASCII ' character to
  match the rest of the codebase's string quoting.
*/
export default {
  meta: {
    title: 'Aylo AI — Sizning o\'rningizga savdo qiladigan AI agentlar',
    description:
      'Aylo AI yordamida ijtimoiy tarmoqlarda mijozlaringiz bilan 24/7 muloqot qiladigan kuchli AI agentlar yarating. Savdoni oshiring, suhbatlarni avtomatlashtiring va biznesingizni osongina rivojlantiring.',
  },

  language: { label: 'Til' },

  nav: {
    features: 'Imkoniyatlar',
    howItWorks: 'Qanday ishlaydi',
    pricing: 'Narxlar',
    testimonials: 'Fikrlar',
    contact: 'Aloqa',
    signIn: 'Kirish',
    getStarted: 'Boshlash',
    toggleMenu: 'Menyuni ochish yoki yopish',
  },

  hero: {
    badge: 'Ijtimoiy tarmoqlarda savdoni avtomatlashtiring — 24/7',
    titleLead: 'Savdoni oshiradigan',
    titleAccent: 'AI agentlar yarating',
    subtitle:
      'Aylo AI yordamida ijtimoiy tarmoqlarda mijozlaringiz bilan 24/7 muloqot qiladigan kuchli AI agentlar yaratasiz. Savdoni oshiring, suhbatlarni avtomatlashtiring va biznesingizni osongina rivojlantiring.',
    ctaPrimary: 'Agent yaratish',
    ctaSecondary: 'Qanday ishlaydi',
    freeNote: 'Bepul boshlang — oyiga 100 suhbat, karta talab qilinmaydi.',
  },

  logos: { label: 'Mijozlaringiz allaqachon foydalanadigan joyda ishlaydi' },

  features: {
    title: 'Nega Aylo AI?',
    subtitle:
      'Mijozlar bilan muloqotni avtomatlashtirish va savdoni oshirish uchun barcha kerakli imkoniyatlar',
    linkLabel: 'Qanday ishlaydi',
    items: [
      {
        title: 'Bir zumda javob',
        desc: 'Mijoz savollariga daqiqalarda emas, millisekundlarda javob bering. AI savolni darhol qayta ishlab, javob qaytaradi.',
      },
      {
        title: 'Tabiiy muloqot',
        desc: 'AI kontekstni, kasbiy atamalarni va hatto kayfiyatni tushunadi — suhbat inson bilan gaplashayotgandek tabiiy o\'tadi.',
      },
      {
        title: 'CRM integratsiyasi',
        desc: 'Mavjud mijoz tizimlaringizga uzluksiz ulanadi va xizmat ko\'rsatishni yagona oqimga jamlaydi.',
      },
      {
        title: 'Operatorga uzatish',
        desc: 'Zarur bo\'lganda suhbatni jonli operatorga aqlli tarzda uzatadi — murakkab masalalar e\'tibordan chetda qolmaydi.',
      },
      {
        title: 'Ko\'p tilli',
        desc: '100 dan ortiq tilda muloqot qiling va qo\'llab-quvvatlash qamrovini kengaytiring.',
      },
      {
        title: 'Tahlil va hisobotlar',
        desc: 'Har bir muloqotdan xulosa chiqaring — batafsil hisobotlar va boshqaruv paneli orqali.',
      },
    ],
  },

  howItWorks: {
    title: 'Qanday ishlaydi',
    subtitle: 'Uch oddiy qadamda boshlang',
    cta: 'Agent yaratish',
    steps: [
      {
        title: 'Ro\'yxatdan o\'tib ulang',
        desc: 'Ro\'yxatdan o\'ting va ijtimoiy tarmoq akkauntlaringizni bir necha soniyada ulang.',
      },
      {
        title: 'AI agentingizni yarating',
        desc: 'Tayyor aqlli shablonlar yordamida kod yozmasdan AI agentingizni yig\'ing.',
      },
      {
        title: 'Ishga tushiring',
        desc: 'Agentni ishga tushiring — u mijozlar bilan avtomatik suhbatlashishni boshlaydi.',
      },
    ],
  },

  testimonials: {
    title: 'Mijozlarimiz fikri',
    subtitle: 'Ishga tushirishdan oldin bu yerda haqiqiy mijozlar fikri turadi',
    // NAMUNA MATN — Testimonials.jsx dagi izohga qarang. Bular haqiqiy fikrlar emas.
    items: [
      {
        quote: 'Namunaviy fikr. Buni hech kim aytmagan — bu yerda haqiqiy mijoz fikri turishi kerak.',
        name: 'Mijoz ismi A',
        role: 'Lavozim, A kompaniyasi (namuna)',
      },
      {
        quote:
          'Sozlash va kundalik foydalanish haqidagi mijoz hikoyasi o\'rnini bosuvchi namunaviy matn. Ishga tushirishdan oldin bu yerda ularning o\'z so\'zlari, roziligi bilan turadi.',
        name: 'Mijoz ismi B',
        role: 'Lavozim, B kompaniyasi (namuna)',
      },
      {
        quote:
          'Bu namunaviy matn, tavsiya emas. Mijoz o\'z fikrini keltirishga rozilik bergach, bu yerda uning jamoasida nima o\'zgargani haqidagi hikoyasi turadi — barcha raqamlar avval tekshiriladi.',
        name: 'Mijoz ismi C',
        role: 'Lavozim, C kompaniyasi (namuna)',
      },
      {
        quote:
          'Faqat sahifa tuzilishi uchun namunaviy matn. Haqiqiy, rozilik olingan mijoz fikri bilan almashtiring.',
        name: 'Mijoz ismi D',
        role: 'Lavozim, D kompaniyasi (namuna)',
      },
    ],
  },

  metaVerified: {
    title: 'Meta tomonidan tasdiqlangan',
    body: 'Aylo AI Meta tomonidan rasman tasdiqlangan va Facebook hamda Instagram platformalari bilan ishonchli, xavfsiz integratsiyani ta\'minlaydi. Bu tasdiq xavfsizlik va talablarga muvofiqlik standartlarini yuqori darajada saqlab kelayotganimizni bildiradi.',
    points: ['Xavfsiz ma\'lumot almashinuvi', 'Qoidalarga muvofiq', 'Rasmiy integratsiya'],
    cta: 'Agent yaratish',
  },

  integrations: {
    title: 'Ijtimoiy tarmoqlar bilan uzluksiz aloqa',
    subtitle: 'Aylo AI mijozlaringiz allaqachon foydalanadigan platformalar bilan ishlaydi',
    website: 'Veb-sayt',
  },

  useCases: {
    title: 'Aylo AI kimlar uchun',
    subtitle: 'Mijozlar bilan yozishmalar savdoning bir qismi bo\'lgan har qanday biznes uchun',
    items: [
      {
        title: 'Onlayn savdo va Instagram do\'konlar',
        desc: 'Narx, o\'lcham va mavjudlik haqidagi savollarga javob beradi, buyurtmani qabul qiladi va yetkazib berish shartlarini tushuntiradi.',
      },
      {
        title: 'Restoran va kafelar',
        desc: 'Menyu va narxlarni ko\'rsatadi, joy band qiladi, yetkazib berish buyurtmasini oladi va ish vaqtini aytadi.',
      },
      {
        title: 'Klinika va go\'zallik salonlari',
        desc: 'Qabulga yozadi, xizmat narxlarini tushuntiradi, bo\'sh vaqtlarni taklif qiladi va eslatma yuboradi.',
      },
      {
        title: 'Ta\'lim markazlari',
        desc: 'Kurslar, narxlar va jadval haqida ma\'lumot beradi, sinov darsiga yozadi va nomzod ma\'lumotlarini yig\'adi.',
      },
      {
        title: 'Ko\'chmas mulk va xizmatlar',
        desc: 'Mijoz talabini aniqlaydi, mos variantlarni saralaydi va ko\'rikni kelishish uchun menejerga uzatadi.',
      },
      {
        title: 'Yetkazib berish va logistika',
        desc: 'Buyurtma holatini aytadi, yetkazib berish hududi va narxini hisoblaydi, murakkab holatlarni operatorga o\'tkazadi.',
      },
    ],
  },

  roi: {
    title: 'Qancha tejashingizni hisoblang',
    subtitle: 'O\'z raqamlaringizni kiriting — hisob shu yerda, oshkora tarzda amalga oshadi',
    inputsTitle: 'Sizning raqamlaringiz',
    messagesPerDay: 'Kuniga kelgan xabarlar',
    salary: 'Menejerning oylik maoshi',
    autoShare: 'Agent mustaqil hal qiladigan ulush',
    currency: 'so\'m',
    outHandled: 'Oyiga agent hal qiladigan xabarlar',
    outHours: 'Oyiga bo\'shaydigan menejer soatlari',
    outSaving: 'Oyiga taxminiy tejam',
    disclaimer:
      'Bu — kafolat emas, balki siz kiritgan raqamlar asosidagi taxminiy hisob. Har bir xabar menejerning {minutes} daqiqasini oladi va bir oyda {hours} ish soati bor deb olindi. Haqiqiy natija biznesingizga va savollar murakkabligiga bog\'liq.',
    cta: 'Tariflarni ko\'rish',
  },

  pricing: {
    title: 'Suhbatlar soniga qarab, so\'mda',
    subtitle: 'Bepul boshlang. Xodim soni uchun emas — agent hal qilgan suhbatlar uchun to\'lang',
    popularBadge: 'ENG MASHHUR TARIF',
    billingLabel: 'To\'lov davri',
    monthly: 'Oylik',
    annual: 'Yillik',
    annualSave: '-20%',
    currency: ' so\'m',
    perMonth: '/oy',
    freePrice: 'Bepul',
    noCard: 'Karta talab qilinmaydi',
    cancelAnytime: 'Istalgan vaqtda bekor qilinadi',
    billedAnnually: 'Yillik to\'lovda, bir yilga',
    note: 'Narxlar so\'mda va QQS hisobga olinmagan. Suhbat — agent bilan bir mijozning bir muloqoti; 24 soat harakatsizlikdan keyin yopiladi. Limitdan oshsangiz, agent to\'xtamaydi — keyingi tarifga o\'tishni taklif qilamiz.',
    plans: [
      {
        name: 'Bepul',
        tagline: 'Sinab ko\'rish uchun',
        priceMonthly: 0,
        allowance: 'Oyiga 100 suhbat',
        cta: 'Bepul boshlash',
        features: [
          '1 ta kanal',
          'Asosiy bilim bazasi',
          'Suhbatlar tarixi',
          'Email orqali qo\'llab-quvvatlash',
        ],
      },
      {
        name: 'Boshlang\'ich',
        tagline: 'Kichik do\'kon va salonlar uchun',
        priceMonthly: 199000,
        allowance: 'Oyiga 500 suhbat',
        cta: 'Tarifni tanlash',
        features: [
          '3 ta kanal',
          'Cheklanmagan bilim bazasi',
          'Operatorga uzatish',
          'Asosiy tahlil paneli',
          '100 dan ortiq til',
        ],
      },
      {
        name: 'Biznes',
        tagline: 'O\'sayotgan bizneslar uchun',
        priceMonthly: 499000,
        allowance: 'Oyiga 2 500 suhbat',
        cta: 'Tarifni tanlash',
        features: [
          'Barcha kanallar',
          'Boshlang\'ich tarifdagi hammasi +',
          '5 tagacha jamoa a\'zosi',
          'Batafsil hisobotlar',
          'API va webhook',
        ],
      },
      {
        name: 'Kompaniya',
        tagline: 'Katta hajmli murojaatlar uchun',
        priceMonthly: 1190000,
        allowance: 'Oyiga 10 000 suhbat',
        cta: 'Bog\'lanish',
        features: [
          'Biznes tarifdagi hammasi +',
          'Cheklanmagan jamoa a\'zolari',
          'Ustuvor qo\'llab-quvvatlash',
          'Individual shartnoma shartlari',
          'Yagona tizimga kirish (SSO)',
        ],
      },
    ],
  },
  faq: {
    title: 'Ko\'p so\'raladigan savollar',
    items: [
      {
        q: 'Aylo dan qanday foydalanaman?',
        a: 'Bepul akkaunt ochib, ijtimoiy tarmoq kanallaringizni ulang va kod yozishni talab qilmaydigan konstruktorimizda AI agentingizni loyihalang. Sozlab bo\'lgach, uni ishga tushiring — u ulangan barcha kanallarda mijozlar bilan avtomatik muloqot qilishni boshlaydi.',
      },
      {
        q: 'Suhbat deb nima hisoblanadi?',
        a: 'Suhbat — bir mijozning agent bilan bir muloqoti: uning ichida qancha xabar yozilsa ham, bu bitta suhbat sanaladi. 24 soat harakatsizlikdan keyin suhbat yopiladi, shuning uchun o\'sha mijoz keyingi hafta yana yozsa, bu yangi suhbat bo\'ladi. To\'lov xabarlar soni yoki xodimlar soni uchun emas, agent hal qilgan suhbatlar uchun olinadi.',
      },
      {
        q: 'Limitdan oshib ketsam nima bo\'ladi?',
        a: 'Agent javob berishni to\'xtatmaydi — suhbat o\'rtasida uzilmaydi va sizni o\'z ixtiyorimiz bilan qimmatroq tarifga o\'tkazmaymiz. Limitdan oshganingizni ko\'rasiz va biz hajmingizga mos tarifni taklif qilamiz; o\'tish yoki o\'tmaslik — sizning qaroringiz.',
      },
      {
        q: 'Bepul tarif haqiqatan bepulmi?',
        a: 'Ha: oyiga 100 suhbat, 1 ta kanal, karta talab qilinmaydi. Bu muddati cheklangan sinov emas, balki alohida tarif — 100 suhbat ichida qolsangiz, unda davom etishingiz mumkin. Ko\'proq hajm yoki ko\'proq kanal kerak bo\'lganda, pullik tarifni o\'zingiz tanlaysiz.',
      },
      {
        q: 'Tarifni o\'zgartirsam yoki obunani bekor qilsam bo\'ladimi?',
        a: 'Ikkisi ham, istalgan vaqtda — akkauntingizdagi "Billing" bo\'limidan. Tarifni yuqoriga yoki pastga o\'zgartirish darhol kuchga kiradi, to\'lov esa foydalanilgan muddatga mos qayta hisoblanadi. Bekor qilsangiz, tarif siz to\'lab qo\'ygan davr oxirigacha amal qiladi, undan keyin qo\'shimcha to\'lov olinmaydi.',
      },
      {
        q: 'Yillik narx nimani bildiradi, QQS kiradimi?',
        a: 'Yillik to\'lovda oylik narxdan 20% chegirma bo\'ladi va to\'lov bir yilga bir yo\'la amalga oshiriladi — kartochkadagi raqam shu shartdagi oylik narxni ko\'rsatadi. Barcha narxlar so\'mda va QQS hisobga olinmagan.',
      },
      {
        q: 'Loyihani qanday yarataman?',
        a: 'Boshqaruv panelida "Yangi loyiha"ni bosing, nom bering va shablon tanlang yoki noldan boshlang. So\'ngra o\'sha loyihaga agentlar, ma\'lumot manbalari va integratsiyalarni ulashingiz mumkin.',
      },
      {
        q: 'Yopiq ma\'lumotlar to\'plamini yaratsam bo\'ladimi?',
        a: 'Ha. Har bir ish maydoni faqat jamoangizga ochiq bo\'lgan yopiq ma\'lumot to\'plamlarini qo\'llab-quvvatlaydi. CSV fayllarni yuklashingiz, ma\'lumotlar bazasini ulashingiz yoki CRM tizimingizdan xavfsiz sinxronlashingiz mumkin.',
      },
    ],
  },

  contact: {
    title: 'Keling, gaplashamiz',
    subtitle: 'Mijozlar bilan muloqotni o\'zgartirishga tayyormisiz? Biz bilan bog\'laning.',
    nameLabel: 'Ismingiz',
    emailLabel: 'Email manzilingiz',
    messageLabel: 'Xabaringiz',
    messagePlaceholder: 'Loyihangiz haqida qisqacha yozing...',
    send: 'Xabar yuborish',
    sending: 'Yuborilmoqda…',
    sent: 'Xabar yuborildi',
    tryAgain: 'Qayta urinish',
    srSending: 'Xabaringiz yuborilmoqda…',
    errors: {
      name: 'Iltimos, ismingizni kiriting.',
      email: 'Iltimos, email manzilingizni kiriting.',
      emailInvalid: 'Email manzili noto\'g\'ri ko\'rinadi — xato yozilmaganini tekshirib ko\'ring.',
      message: 'Iltimos, loyihangiz haqida qisqacha yozing.',
    },
    status: {
      fixFields: 'Belgilangan maydonlarni to\'g\'rilab, qayta urinib ko\'ring.',
      unconfigured:
        'Xabar yuborish hali sozlanmagan, shuning uchun bu forma bizga yetib bormaydi — xabaringiz YUBORILMADI. Hozircha boshqa aloqa kanallarimiz orqali murojaat qiling.',
      success: 'Rahmat! Xabaringiz yo\'lda — tez orada javob beramiz.',
      timeout: 'Juda uzoq davom etdi va vaqt tugadi. Xabaringiz yuborilmadi — qayta urinib ko\'ring.',
      generic: 'Nimadir xato ketdi va xabaringiz yuborilmadi. Iltimos, qayta urinib ko\'ring.',
      server: 'Serverimizda muammo yuz berdi ({code}-xato). Bir ozdan so\'ng qayta urinib ko\'ring.',
      client:
        'Xabaringizni yuborib bo\'lmadi ({code}-xato). Ma\'lumotlarni tekshirib, qayta urinib ko\'ring.',
    },
  },

  cta: {
    title: 'Agentingizni yarating',
    subtitle:
      'Savdoni oshiring, menejerlarni murakkabroq vazifalar uchun bo\'shatib oling va tez javoblar bilan mijozlar ishonchini qozoning.',
    button: 'Agent yaratish',
  },

  footer: {
    tagline: 'Shaxsiy AI menejer bilan biznesingizni yuksaltirishni boshlang',
    links: {
      features: 'Imkoniyatlar',
      testimonials: 'Fikrlar',
      howItWorks: 'Qanday ishlaydi',
      metaVerified: 'Meta tasdig\'i',
      pricing: 'Narxlar',
      contact: 'Bog\'lanish',
    },
    rights: '© {year} Aylo AI. Barcha huquqlar himoyalangan.',
  },

  mockup: {
    upgrade: 'Yangilash',
    upgradeTitle: 'Tarifni yangilang',
    upgradeBody: 'Cheklanmagan agentlarni oching',
    sidebar: ['Bosh sahifa', 'Agentlar', 'Bilimlar', 'O\'qitish', 'Sozlamalar'],
    balance: 'Obuna balansi',
    buy: 'Obuna olish',
    howTo: 'Aylo.uz dan qanday foydalanish?',
    keywords: 'Kalit so\'z qo\'shish',
    widget: 'Vidjetni sozlash',
    replied: 'Agent 0,4 s da javob berdi',
    agentRole: 'Aylo AI dagi sotuv menejeri',
    cards: [
      { title: 'Chatbot yarating', subtitle: 'mijozlar savollariga javob berish' },
      { title: 'Telegramni avtomatlashtiring', subtitle: 'har bir xabarga avtojavob' },
      { title: 'Instagramni yaxshilang', subtitle: 'DM va izohlarga javob' },
      { title: 'Har qanday yordam', subtitle: 'agentdan yordam so\'rang' },
    ],
  },
}
