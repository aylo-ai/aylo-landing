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
    badge: '100+ kompaniya Aylo AI bilan savdoni avtomatlashtirmoqda',
    titleLead: 'Savdoni oshiradigan',
    titleAccent: 'AI agentlar yarating',
    subtitle:
      'Aylo AI yordamida ijtimoiy tarmoqlarda mijozlaringiz bilan 24/7 muloqot qiladigan kuchli AI agentlar yaratasiz. Savdoni oshiring, suhbatlarni avtomatlashtiring va biznesingizni osongina rivojlantiring.',
    ctaPrimary: 'Agent yaratish',
    ctaSecondary: 'Qanday ishlaydi',
  },

  logos: { label: '100+ kompaniya allaqachon Aylo AI dan foydalanmoqda' },

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
    // TODO(pre-launch): hali ishga tushmagan mahsulot uchun asossiz da'vo.
    subtitle: 'Aylo AI bilan o\'sayotgan minglab bizneslarga qo\'shiling',
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

  pricing: {
    title: 'Foydalanishga asoslangan oddiy narxlar',
    subtitle: 'Bepul boshlang, keyin faqat foydalanganingiz uchun to\'lang',
    popularBadge: 'ENG MASHHUR TARIF',
    plans: [
      {
        name: 'Boshlang\'ich',
        tagline: 'Kichik loyihalar uchun qulay',
        price: 'Bepul',
        period: '',
        cta: 'Bepul sinab ko\'rish',
        features: [
          'Cheklanmagan shaxsiy fayllar',
          'Email orqali qo\'llab-quvvatlash',
          'CSV formatida eksport',
          'Asosiy tahlil paneli',
          'Oyiga 1 000 API so\'rovi',
        ],
      },
      {
        name: 'Professional',
        tagline: 'Frilanser va startaplar uchun',
        price: '$15',
        period: '/foydalanuvchi',
        cta: 'Tarifni tanlash',
        features: [
          'Boshlang\'ich tarifdagi hammasi +',
          '5 tagacha foydalanuvchi',
          'Jamoa bilan ishlash vositalari',
          'Moslashtiriladigan panellar',
          'Turli eksport formatlari',
          'Asosiy maxsus integratsiyalar',
        ],
      },
      {
        name: 'Tashkilot',
        tagline: 'Tez o\'sayotgan bizneslar uchun',
        price: '$30',
        period: '/foydalanuvchi',
        cta: 'Tarifni tanlash',
        features: [
          'Professional tarifdagi hammasi +',
          'Korporativ xavfsizlik to\'plami',
          'Yagona tizimga kirish (SSO)',
          'Individual shartnoma shartlari',
          'Telefon orqali shaxsiy qo\'llab-quvvatlash',
          'Maxsus integratsiyalarni qo\'llab-quvvatlash',
          'Talablarga muvofiqlik vositalari',
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
        q: 'Tarifni qanday o\'zgartiraman?',
        a: 'Akkaunt sozlamalariga o\'tib, "Billing" bo\'limini oching. U yerdan tarifni istalgan vaqtda yuqoriga yoki pastga o\'zgartirishingiz mumkin — o\'zgarish darhol kuchga kiradi, to\'lov esa foydalanilgan muddatga mos qayta hisoblanadi.',
      },
      {
        q: 'Obunani qanday bekor qilaman?',
        a: 'Boshqaruv panelidagi "Billing" bo\'limiga o\'tib, "Obunani bekor qilish"ni tanlang. Tarifingiz joriy hisob-kitob davri oxirigacha amal qiladi, undan keyin qo\'shimcha to\'lov olinmaydi.',
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
