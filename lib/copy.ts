export const nav = {
  logo: "STɅFFLY",
  links: [
    { label: "Mahsulot", href: "#mahsulot" },
    { label: "Yechimlar", href: "#yechimlar" },
    { label: "Integratsiyalar", href: "#integratsiyalar" },
    { label: "Resurslar", href: "#resurslar" },
    { label: "Blog", href: "#blog" },
    { label: "About", href: "#about" },
  ],
  login: "Kirish",
  cta: "So'rov yuborish",
};

export const hero = {
  badge: "✨ AI Xodimlar Platformasi",
  headlineBefore: "Biznesingiz uchun AI ",
  headlineAfter: " xodim yollang.",
  rotatingAgents: [
    "Sales Agent",
    "Support Agent",
    "HR Agent",
    "Content Agent",
    "Marketing Agent",
    "Finance Agent",
    "Research Agent",
    "Developer Agent",
    "Custom Agent",
  ],
  subheadline:
    "STɅFFLY yordamida kompaniyangiz uchun AI xodimlarni yarating, ularga vazifa bering, ularni kuzating, ularni boshqaring va butun operatsiyani bitta platformadan nazorat qiling.",
  primaryCta: "→ So'rov yuborish",
  secondaryCta: "→ Demo ko'rish",
};

export const socialProof = {
  title: "Innovatsion jamoalar ishonadi",
  logos: [
    { name: "Stripe", src: "/logos/social/stripe.svg" },
    { name: "Vercel", src: "/logos/social/vercel.svg" },
    { name: "Notion", src: "/logos/social/notion.svg" },
    { name: "Linear", src: "/logos/social/linear.svg" },
    { name: "Figma", src: "/logos/social/figma.svg" },
    { name: "OpenAI", src: "/logos/social/openai.svg" },
  ],
};

export const whyStaffly = {
  title: "Nima uchun STɅFFLY?",
  subtitle:
    "Oddiy chatbot emas — butun AI ish kuchingiz uchun yashagan operatsion miya.",
  eyebrow: "Platformaning yuragi",
  features: [
    {
      title: "Operations Center",
      description: "Barcha AI xodimlaringizni real vaqtda kuzating.",
      icon: "monitor",
      accent: "purple",
      size: "md",
    },
    {
      title: "Cognitive Profiles",
      description:
        "Har bir AI xodimning o'z roli, qobiliyati va fikrlash usuli mavjud.",
      icon: "brain",
      accent: "emerald",
      size: "md",
    },
    {
      title: "Shared Memory",
      description:
        "AI xodimlar bilimlarini unutmaydi. Har safar yanada aqlli ishlaydi.",
      icon: "memory",
      accent: "purple",
      size: "lg",
    },
    {
      title: "Autonomous Chief of Staff",
      description: "Jarvis butun AI jamoani boshqaradi.",
      icon: "jarvis",
      accent: "emerald",
      size: "lg",
    },
    {
      title: "3D Office",
      description: "AI xodimlaringizni virtual ofisda kuzating.",
      icon: "office",
      accent: "purple",
      size: "md",
    },
    {
      title: "Outcome Intelligence",
      description: "Natijalarni emas, biznes ta'sirini o'lchang.",
      icon: "chart",
      accent: "emerald",
      size: "md",
    },
  ],
};

export const howItWorks = {
  title: "Qanday ishlaydi",
  subtitle: "To'rt qadamda AI jamoangizni ishga tushiring.",
  steps: [
    { step: 1, title: "So'rov yuboring" },
    { step: 2, title: "Biz siz bilan bog'lanamiz" },
    { step: 3, title: "Platformani sozlaymiz" },
    { step: 4, title: "AI jamoangiz ish boshlaydi" },
  ],
};

export const operations = {
  title: "3D Virtual Office",
  subtitle:
    "AI agentlaringiz uchun 3D virtual ofis yarating — ularni kuzating, boshqaring va jamoangizni jonli muhitda boshqaring.",
};

export const employeeTypes = {
  title: "AI xodim turlari",
  subtitle: "Har bir rol uchun maxsus AI agentlar.",
  agents: [
    {
      role: "Sales Agent",
      status: "Faol",
      tools: ["CRM", "Email", "Telegram"],
      avatar: "SA",
      image: "/agents/sales.jpg",
      blurb: "Lidlar, follow-up va CRM bilan ishlaydi.",
      accent: "purple" as const,
    },
    {
      role: "Support Agent",
      status: "Faol",
      tools: ["Chat", "Tickets", "Knowledge"],
      avatar: "SU",
      image: "/agents/support.jpg",
      blurb: "Mijozlarga 24/7 javob beradi va ticketlarni yopadi.",
      accent: "emerald" as const,
    },
    {
      role: "HR Agent",
      status: "Faol",
      tools: ["Recruiting", "Onboarding"],
      avatar: "HR",
      image: "/agents/hr.jpg",
      blurb: "Nomzodlar va onboarding jarayonini boshqaradi.",
      accent: "purple" as const,
    },
    {
      role: "Content Agent",
      status: "Faol",
      tools: ["Notion", "Docs", "SEO"],
      avatar: "CA",
      image: "/agents/content.jpg",
      blurb: "Maqola, post va hujjatlarni yozadi.",
      accent: "emerald" as const,
    },
    {
      role: "Marketing Agent",
      status: "Faol",
      tools: ["Ads", "Analytics", "Social"],
      avatar: "MA",
      image: "/agents/marketing.jpg",
      blurb: "Kampaniyalar va analitika bilan shug'ullanadi.",
      accent: "purple" as const,
    },
    {
      role: "Finance Agent",
      status: "Kuzatuv",
      tools: ["Reports", "Invoices"],
      avatar: "FA",
      image: "/agents/finance.jpg",
      blurb: "Hisobot va moliyaviy kuzatuvni avtomatlashtiradi.",
      accent: "emerald" as const,
    },
    {
      role: "Research Agent",
      status: "Faol",
      tools: ["Web", "Summaries"],
      avatar: "RA",
      image: "/agents/research.jpg",
      blurb: "Bozor va raqobatchilarni tahlil qiladi.",
      accent: "purple" as const,
    },
    {
      role: "Developer Agent",
      status: "Faol",
      tools: ["GitHub", "CI", "Code"],
      avatar: "DA",
      image: "/agents/developer.jpg",
      blurb: "Kod, PR va deploy vazifalarida yordam beradi.",
      accent: "emerald" as const,
    },
    {
      role: "Custom Agent",
      status: "Sozlanadi",
      tools: ["API", "Workflows"],
      avatar: "CU",
      image: "/agents/custom.jpg",
      blurb: "Biznesingizga mos maxsus agent yarating.",
      accent: "purple" as const,
    },
  ],
};

export const security = {
  title: "Korxonaviy xavfsizlik",
  subtitle: "Enterprise darajasidagi himoya va nazorat.",
  badge: "Enterprise Security",
  highlight:
    "Ma'lumotlaringiz, AI xotirasi va operatsiyalar bir xil himoya qatlamida.",
  stats: [
    { label: "Shifrlangan", value: "AES-256" },
    { label: "Audit", value: "Real-time" },
    { label: "Compliance", value: "SOC2 Ready" },
  ],
  cards: [
    {
      title: "Role permissions",
      description: "Har bir foydalanuvchi va AI uchun aniq ruxsatlar.",
      tag: "Access",
    },
    {
      title: "Encrypted memory",
      description: "Xotira va bilimlar shifrlangan holda saqlanadi.",
      tag: "Data",
    },
    {
      title: "Audit logs",
      description: "Barcha harakatlar to'liq kuzatiladi va yozib olinadi.",
      tag: "Visibility",
    },
    {
      title: "SOC2 Ready",
      description: "Xavfsizlik standartlariga tayyor arxitektura.",
      tag: "Compliance",
    },
    {
      title: "SSO",
      description: "Korxonaviy autentifikatsiya bilan birlashtiring.",
      tag: "Identity",
    },
    {
      title: "API",
      description: "Xavfsiz API orqali tizimlaringizni ulang.",
      tag: "Connect",
    },
  ],
};

export const integrations = {
  title: "Integratsiyalar",
  subtitle: "Siz allaqachon ishlatayotgan vositalar bilan ishlaydi.",
  items: [
    { name: "Telegram", src: "/logos/integrations/telegram.svg" },
    { name: "WhatsApp", src: "/logos/integrations/whatsapp.svg" },
    { name: "Slack", src: "/logos/integrations/slack.svg" },
    { name: "Discord", src: "/logos/integrations/discord.svg" },
    { name: "Gmail", src: "/logos/integrations/gmail.svg" },
    { name: "Google Drive", src: "/logos/integrations/googledrive.svg" },
    { name: "Notion", src: "/logos/integrations/notion.svg" },
    { name: "HubSpot", src: "/logos/integrations/hubspot.svg" },
    { name: "Salesforce", src: "/logos/integrations/salesforce.svg" },
    { name: "Zapier", src: "/logos/integrations/zapier.svg" },
    { name: "OpenAI", src: "/logos/integrations/openai.svg" },
    { name: "Anthropic", src: "/logos/integrations/anthropic.svg" },
  ],
};

export const whoIsItFor = {
  title: "Kimlar uchun?",
  subtitle: "Har qanday o'sayotgan jamoa uchun mos.",
  audiences: [
    {
      title: "Startup",
      description: "Kichik jamoa bilan katta natijaga erishing.",
      tag: "Scale fast",
    },
    {
      title: "Agency",
      description: "Mijozlar uchun AI xodimlarni tez ishga tushiring.",
      tag: "Client ops",
    },
    {
      title: "Education",
      description: "O'quv jarayonlarini avtomatlashtiring.",
      tag: "Learning",
    },
    {
      title: "Healthcare",
      description: "Operatsiyalarni xavfsiz va samarali boshqaring.",
      tag: "Care ops",
    },
    {
      title: "E-commerce",
      description: "Sotuv, qo'llab-quvvatlash va marketingni kengaytiring.",
      tag: "Commerce",
    },
    {
      title: "Enterprise",
      description: "Butun AI ish kuchini markazlashtirilgan boshqaring.",
      tag: "Org-wide",
    },
  ],
};

export const requestAccess = {
  title: "Erta kirish uchun so'rov yuboring",
  eyebrow: "Early Access",
  subtitle:
    "Staffly hozir beta bosqichida. Birinchilardan bo'lib AI xodimlardan foydalanishni boshlang.",
  fields: {
    name: "Ismingiz",
    namePlaceholder: "Ismingizni kiriting",
    email: "Email manzilingiz",
    emailPlaceholder: "you@example.com",
    phone: "Telefon raqamingiz",
    phonePlaceholder: "+998 90 123 45 67",
    userType: "Siz kimsiz?",
    business: "Biznes",
    individual: "Individual",
    reason: "Staffly'dan nima maqsadda foydalanmoqchisiz?",
    reasonPlaceholder:
      "Masalan: mijozlarga avtomatik javob, kontent yaratish, marketing, sotuvlar, AI support...",
  },
  submit: "So'rov yuborish",
  submitting: "Yuborilmoqda...",
  note: "O'rtacha javob berish vaqti: 24 soat",
  successTitle: "Tabriklaymiz!",
  successText:
    "So'rovingiz muvaffaqiyatli yuborildi.\n\nJamoamiz uni ko'rib chiqadi va 24 soat ichida email orqali siz bilan bog'lanadi.",
  telegram: {
    title: "Yangiliklardan birinchilardan bo'lib xabardor bo'ling",
    description:
      "Staffly yangiliklari, beta yangilanishlar va yangi funksiyalarni o'tkazib yubormang.",
    button: "Telegram kanalga qo'shilish",
    url: "https://t.me/stafflyio",
  },
  homeButton: "Bosh sahifaga qaytish",
  progress: [
    { label: "So'rov yuborildi", icon: "check", state: "done" },
    { label: "Ko'rib chiqilmoqda", icon: "pending", state: "active" },
    { label: "Email orqali javob", icon: "mail", state: "todo" },
    { label: "Staffly'ga kirish", icon: "rocket", state: "todo" },
  ],
  benefits: [
    "Beta ga birinchilardan kirish",
    "AI xodimlarni sozlashda yordam",
    "24 soat ichida javob",
  ],
};

export const faq = {
  title: "Ko'p so'raladigan savollar",
  items: [
    {
      q: "STɅFFLY qanday ishlaydi?",
      a: "STɅFFLY — AI xodimlarni yaratish, vazifa berish, kuzatish va boshqarish uchun yagona operatsion platforma. Jarvis butun AI jamoani muvofiqlashtiradi.",
    },
    {
      q: "AI xodimlarni qanday yarataman?",
      a: "Rol, qobiliyatlar va vositalarni tanlaysiz — platforma Cognitive Profile asosida AI xodimni sozlaydi va ishga tayyorlaydi.",
    },
    {
      q: "Telegram bilan ishlaydimi?",
      a: "Ha. STɅFFLY Telegram, WhatsApp, Slack, Discord va boshqa kanallar bilan integratsiya qilinadi.",
    },
    {
      q: "Ma'lumotlar xavfsizmi?",
      a: "Ha. Shifrlangan xotira, audit loglar, rol asosidagi ruxsatlar va SSO qo'llab-quvvatlanadi.",
    },
    {
      q: "Qancha vaqtda ishga tushadi?",
      a: "So'rovingizdan so'ng jamoamiz bog'lanadi, platformani sozlaydi va AI jamoangiz tez orada ish boshlaydi.",
    },
    {
      q: "Kimlar foydalanishi mumkin?",
      a: "Startuplar, agentliklar, ta'lim, sog'liqni saqlash, e-commerce va enterprise kompaniyalar uchun mo'ljallangan.",
    },
  ],
};

export const finalCta = {
  headline: "Kelajakdagi AI jamoangiz sizni kutmoqda.",
  text: "Birinchilardan bo'lib STɅFFLY platformasiga qo'shiling.",
  button: "So'rov yuborish",
};

export const footer = {
  logo: "STɅFFLY",
  description: "AI xodimlar uchun operatsion tizim.",
  columns: [
    {
      title: "Mahsulot",
      links: ["Operations Center", "AI Employees", "Jarvis", "3D Office"],
    },
    {
      title: "Yechimlar",
      links: ["Startup", "Agency", "Enterprise", "E-commerce"],
    },
    {
      title: "Resurslar",
      links: ["Blog", "Hujjatlar", "API", "Status"],
    },
    {
      title: "Kompaniya",
      links: ["About", "Karyera", "Kontakt", "Hamkorlik"],
    },
    {
      title: "Legal",
      links: ["Maxfiylik", "Shartlar", "Xavfsizlik"],
    },
  ],
  newsletter: {
    title: "Newsletter",
    placeholder: "Email manzilingiz",
    button: "Obuna",
  },
  copyright: "© 2026 STɅFFLY. Barcha huquqlar himoyalangan.",
};
