import type { Language } from '../types/analytics';

export interface SpecialtyItem {
  id: 'kitchens' | 'dressing-rooms';
  index: string;
  image: string;
  secondaryImage: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
  ctaLabel: Record<Language, string>;
}

export interface ProcessStep {
  number: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface FAQItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export const SITE_ASSETS = {
  heroKitchen: '/src/assets/images/hero_custom_kitchen_1795002921027.jpg',
  dressingRoomMain: '/src/assets/images/service_dressing_room_1795002921754.jpg',
  kitchenDetail: '/src/assets/images/detail_kitchen_craft_1795002922469.jpg',
  wardrobeShowcase: '/src/assets/images/showcase_walkin_wardrobe_1795002922901.jpg',
} as const;

export const SITE_COPY = {
  nav: {
    services: { ar: 'التخصصات', en: 'Specialties' },
    process: { ar: 'منهجية العمل', en: 'How It Works' },
    tiktok: { ar: 'تيك توك', en: 'TikTok' },
    faq: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
    contact: { ar: 'تواصل معنا', en: 'Contact' },
    cta: { ar: 'استشارة واتساب', en: 'WhatsApp' },
  },
  hero: {
    eyebrow: {
      ar: 'Profacto · مطابخ وغرف ملابس مخصصة',
      en: 'Profacto · Bespoke Architectural Interiors',
    },
    headline: {
      ar: 'مطابخ وغرف ملابس مخصصة بمعايير تصميم فاخرة',
      en: 'High-End Custom Kitchens & Dressing Rooms',
    },
    subheadline: {
      ar: 'نصمم وننفذ المطابخ العصرية وغرف الملابس (Dressing Rooms) بتفاصيل دقيقة تناسب مساحتك وذوقك الخاص، مع تواصل مباشر وسريع عبر واتساب.',
      en: 'Profacto specializes in high-end, custom kitchens and dressing rooms tailored to your exact space, proportions, and architectural aesthetic.',
    },
    primaryCta: {
      ar: 'تواصل عبر واتساب الآن',
      en: 'Chat on WhatsApp',
    },
    secondaryCta: {
      ar: 'استكشف التخصصات',
      en: 'Explore Specialties',
    },
    proofItems: {
      ar: [
        '41 فيديو منشور على تيك توك',
        'تصميم وتنفيذ حسب المساحة',
        'استشارة مباشرة على +20 11 06365101',
      ],
      en: [
        '41 Published TikTok Reels',
        'Tailored Architectural Fit',
        'Direct Consultation via +20 11 06365101',
      ],
    },
    mediaCaption: {
      ar: 'نموذج بصري يعكس التوجه المعماري للمطابخ العصرية المخصصة',
      en: 'Architectural visual direction representing custom modern kitchen craftsmanship',
    },
  },
  specialtiesSection: {
    eyebrow: { ar: 'التخصصات الأساسية', en: 'Core Specialties' },
    title: {
      ar: 'مساحات مصممة خصيصاً حول أسلوب حياتك',
      en: 'Two Dedicated Disciplines, Built Around Your Space',
    },
    subtitle: {
      ar: 'تركّز Profacto على مساحتين محوريتين في كل منزل راقٍ: المطبخ وغرفة الملابس، بأسلوب تنفيذي يجمع بين الجمال العملي ودقة التفاصيل.',
      en: 'Profacto focuses exclusively on two defining residential spaces—custom kitchens and tailored dressing rooms—balancing visual restraint with everyday functionality.',
    },
    visualNote: {
      ar: 'الصور المعمارية أدناه توضح الطابع التصميمي للتخصصات. لمشاهدة أحدث الأعمال المصوّرة فعلياً، تصفح حساب @profactoo1 على تيك توك.',
      en: 'Architectural visuals illustrate design direction. For authentic studio video reels and project updates, visit @profactoo1 on TikTok.',
    },
    items: [
      {
        id: 'kitchens',
        index: '01',
        image: SITE_ASSETS.heroKitchen,
        secondaryImage: SITE_ASSETS.kitchenDetail,
        title: {
          ar: 'مطابخ مخصصة فاخرة',
          en: 'High-End Custom Kitchens',
        },
        subtitle: {
          ar: 'توزيع ذكي للمساحات، واجهات انسيابية، وتشطيبات متينة',
          en: 'Precision layouts, seamless fronts, and enduring surface details',
        },
        description: {
          ar: 'تصميم وتنفيذ مطابخ مصممة خصيصاً لأبعاد مطبخك، مع مراعاة حركة الاستخدام اليومي، تخزين منظم، وتكامل أنيق مع الأجهزة الحديثة.',
          en: 'Every kitchen is planned around your exact room geometry, workflow ergonomics, concealed storage needs, and clean integration with modern appliances.',
        },
        highlights: {
          ar: [
            'تخطيط مخصص يناسب المساحات المفتوحة والمغلقة',
            'استغلال دقيق للزوايا ووحدات التخزين العلوية',
            'تنوع في الخامات والألوان المتناسقة مع ديكور المنزل',
          ],
          en: [
            'Tailored zoning for open-plan and enclosed layouts',
            'Precision corner utilization and integrated storage cabinetry',
            'Coordinated matte, wood, and stone surface harmonies',
          ],
        },
        ctaLabel: {
          ar: 'استفسر عن تصميم مطبخ عبر واتساب',
          en: 'Inquire About Custom Kitchens',
        },
      },
      {
        id: 'dressing-rooms',
        index: '02',
        image: SITE_ASSETS.dressingRoomMain,
        secondaryImage: SITE_ASSETS.wardrobeShowcase,
        title: {
          ar: 'غرف ملابس مخصصة (Dressing Rooms)',
          en: 'Custom Dressing Rooms',
        },
        subtitle: {
          ar: 'تنظيم أنيق للخزائن، إضاءة مدروسة، وواجهات زجاجية أو مغلقة',
          en: 'Tailored wardrobe systems, integrated lighting, and refined organization',
        },
        description: {
          ar: 'غرف ملابس مصممة حسب احتياجك الفعلي لتخزين الملابس والأحذية والإكسسوارات بأسلوب منظم ومريح بصرياً في كل تفاصيله.',
          en: 'Walk-in and built-in dressing rooms engineered around your wardrobe collection, combining open display bays, enclosed storage, and warm integrated illumination.',
        },
        highlights: {
          ar: [
            'تقسيمات داخلية مخصصة للملابس الطويلة والقطع اليومية',
            'وحدات أدراج مخصصة للإكسسوارات والساعات والمجوهرات',
            'دمج أنيق للإضاءة الداخلية وإطارات الألمنيوم والزجاج',
          ],
          en: [
            'Dedicated hanging, folding, and footwear compartment ratios',
            'Custom drawer inserts for accessories, watches, and essentials',
            'Integrated vertical LED lighting with smoked glass or open bays',
          ],
        },
        ctaLabel: {
          ar: 'استفسر عن غرفة ملابس عبر واتساب',
          en: 'Inquire About Dressing Rooms',
        },
      },
    ] satisfies SpecialtyItem[],
  },
  whyProfacto: {
    eyebrow: { ar: 'لماذا Profacto', en: 'Why Profacto' },
    title: {
      ar: 'وضوح في الرؤية من أول رسالة حتى التسليم',
      en: 'Focused Craftsmanship From First Conversation to Installation',
    },
    pillars: [
      {
        number: '01',
        title: {
          ar: 'تخصص مركّز في المطابخ وغرف الملابس',
          en: 'Dedicated Specialization',
        },
        description: {
          ar: 'بدلاً من التشتت بين عشرات المجالات، يتركّز عمل Profacto بالكامل في تصميم وتنفيذ المطابخ الفاخرة وغرف الملابس.',
          en: 'Rather than spreading thin across unrelated trades, Profacto concentrates solely on high-end custom kitchens and dressing rooms.',
        },
      },
      {
        number: '02',
        title: {
          ar: 'تصميم مفصّل على مقاس مساحتك',
          en: 'Built to Exact Dimensions',
        },
        description: {
          ar: 'كل مشروع يبدأ بفهم احتياجاتك الفعلية وتوزيع المساحة المتاحة لتحقيق أقصى استفادة عملية وجمالية.',
          en: 'Every layout is planned around your room architecture, storage habits, and aesthetic preferences rather than rigid off-the-shelf boxes.',
        },
      },
      {
        number: '03',
        title: {
          ar: 'تواصل مباشر وسريع عبر واتساب',
          en: 'Direct WhatsApp Access',
        },
        description: {
          ar: 'يمكنك مشاركة أبعاد المساحة أو أفكارك المفضلة من فيديوهات تيك توك مباشرة مع فريقنا للبدء دون تعقيد.',
          en: 'Share your room layout, questions, or inspiration directly via WhatsApp (+20 11 06365101) for clear next steps without friction.',
        },
      },
    ],
  },
  process: {
    eyebrow: { ar: 'كيف نبدأ', en: 'Customer Journey' },
    title: {
      ar: 'ثلاث خطوات واضحة لبدء مشروعك مع Profacto',
      en: 'Three Clear Steps to Start Your Project',
    },
    steps: [
      {
        number: '01',
        title: {
          ar: 'بدء المحادثة عبر واتساب أو الهاتف',
          en: 'Reach Out via WhatsApp or Phone',
        },
        description: {
          ar: 'تواصل معنا على +20 11 06365101 وحدد ما إذا كنت تخطط لمطبخ جديد أو غرفة ملابس، مع مشاركة أي صور أو أبعاد أولية.',
          en: 'Message us on WhatsApp or call +20 11 06365101 to share whether you are planning a kitchen or dressing room and any initial dimensions.',
        },
      },
      {
        number: '02',
        title: {
          ar: 'مراجعة التصميم والخامات والتفاصيل',
          en: 'Align on Layout & Materials',
        },
        description: {
          ar: 'يتم مناقشة التوزيع المناسب لمساحتك والخيارات المتاحة للخامات والتشطيبات بما يتوافق مع متطلبات الاستخدام.',
          en: 'Review spatial distribution, storage configuration, and finish options tailored to your home architecture.',
        },
      },
      {
        number: '03',
        title: {
          ar: 'التنفيذ الدقيق والتركيب',
          en: 'Precision Fabrication & Installation',
        },
        description: {
          ar: 'بعد اعتماد التفاصيل النهائية، يتم تنفيذ الوحدات وتركيبها بعناية لضمان تناسق الواجهات وسلاسة الاستخدام اليومي.',
          en: 'Once finalized, cabinetry and fittings are crafted and installed with attention to clean alignment and everyday durability.',
        },
      },
    ] satisfies ProcessStep[],
  },
  tiktokShowcase: {
    eyebrow: { ar: 'تواجدنا الرسمي على تيك توك', en: 'Official TikTok Channel' },
    title: {
      ar: 'شاهد محتوى Profacto مباشرة على تيك توك',
      en: 'Explore Profacto Reels on @profactoo1',
    },
    description: {
      ar: 'نشارك عبر حسابنا الرسمي @profactoo1 مقاطع قصيرة تستعرض المطابخ وغرف الملابس المخصصة. وبسبب قيود العرض التلقائي خارج تطبيق تيك توك، يمكنك فتح الحساب الرسمي مباشرة لمشاهدة الفيديوهات الـ 41 المنشورة.',
      en: 'We publish short-form showcases of custom kitchens and dressing rooms on @profactoo1. Because TikTok restricts automated third-party feed previews outside the app, open our official profile directly to watch all 41 published videos.',
    },
    ctaLabel: {
      ar: 'افتح حساب @profactoo1 على تيك توك',
      en: 'Open @profactoo1 on TikTok',
    },
    limitationNote: {
      ar: 'ملاحظة شفافية: الإحصائيات المعروضة (41 فيديو · 110 إعجاب) موثقة من صفحة الحساب الرسمية على تيك توك وقت إعداد الموقع.',
      en: 'Transparency note: Profile statistics (41 videos · 110 likes) reflect verified public profile metadata from @profactoo1.',
    },
  },
  faq: {
    eyebrow: { ar: 'أسئلة متكررة', en: 'Frequently Asked Questions' },
    title: {
      ar: 'إجابات واضحة قبل بدء التواصل',
      en: 'Helpful Answers Before You Message Us',
    },
    items: [
      {
        id: 'services',
        question: {
          ar: 'ما الخدمات التي تتخصص فيها Profacto؟',
          en: 'What does Profacto specialize in?',
        },
        answer: {
          ar: 'تتخصص Profacto في تصميم وتنفيذ المطابخ العصرية المخصصة وغرف الملابس (Dressing Rooms) عالية الجودة، وفقاً لمساحة واحتياجات كل عميل.',
          en: 'As stated on our official @profactoo1 profile, Profacto specializes in high-end, custom kitchens and dressing rooms.',
        },
      },
      {
        id: 'contact',
        question: {
          ar: 'ما هي الطريقة الأسرع للاستفسار أو إرسال مقاسات المساحة؟',
          en: 'What is the fastest way to inquire or share room dimensions?',
        },
        answer: {
          ar: 'الطريقة الأسرع هي التواصل مباشرة عبر واتساب على الرقم +20 11 06365101 أو الاتصال الهاتفي المباشر على نفس الرقم.',
          en: 'The fastest way is via WhatsApp at +20 11 06365101 or by calling the same official number directly.',
        },
      },
      {
        id: 'tiktok-videos',
        question: {
          ar: 'أين يمكنني مشاهدة أعمال وفيديوهات Profacto؟',
          en: 'Where can I watch Profacto videos and showcases?',
        },
        answer: {
          ar: 'يمكنك مشاهدة جميع الفيديوهات المنشورة (41 فيديو) مباشرة عبر حسابنا الرسمي على تيك توك: tiktok.com/@profactoo1.',
          en: 'You can browse all 41 published reels directly on our official TikTok account at tiktok.com/@profactoo1.',
        },
      },
      {
        id: 'custom-fit',
        question: {
          ar: 'هل يمكن تنفيذ التصاميم لتناسب المساحات الصغيرة أو غير المنتظمة؟',
          en: 'Can kitchens and dressing rooms be adapted to compact or irregular spaces?',
        },
        answer: {
          ar: 'نعم، جوهر عملنا هو التفصيل المخصص (Custom Design) بحيث يتم تخطيط كل وحدة لتناسب أبعاد الغرفة الفعلية دون إهدار مساحة.',
          en: 'Yes. Custom fabrication means layouts, cabinet depths, and storage zones are planned specifically around your room’s actual geometry.',
        },
      },
    ] satisfies FAQItem[],
  },
  contactSection: {
    eyebrow: { ar: 'ابدأ خطوتك التالية', en: 'Direct Consultation' },
    title: {
      ar: 'جاهز لتصميم مطبخك أو غرفة ملابسك؟',
      en: 'Ready to Plan Your Kitchen or Dressing Room?',
    },
    description: {
      ar: 'تواصل معنا مباشرة عبر واتساب أو الهاتف للحصول على استشارة أولية وتوجيه مناسب لمساحتك، أو تابعنا على تيك توك.',
      en: 'Connect directly with Profacto via WhatsApp or phone for an initial consultation tailored to your space, or explore our official TikTok.',
    },
    whatsappCta: {
      ar: 'راسلنا على واتساب',
      en: 'Message on WhatsApp',
    },
    phoneCta: {
      ar: 'اتصل على +20 11 06365101',
      en: 'Call +20 11 06365101',
    },
    tiktokCta: {
      ar: 'حساب تيك توك الرسمي',
      en: 'Official TikTok (@profactoo1)',
    },
    attributionNote: {
      ar: 'نحترم خصوصيتك: يفتح زر واتساب محادثة مباشرة عبر تطبيق واتساب دون حفظ بياناتك الشخصية في نماذج خارجية.',
      en: 'Privacy note: Clicking WhatsApp opens a direct conversation without storing personal details in third-party forms.',
    },
  },
  footer: {
    tagline: {
      ar: 'متخصصون في المطابخ الفاخرة وغرف الملابس المخصصة.',
      en: 'Specializing in high-end, custom kitchens and dressing rooms.',
    },
    copyright: {
      ar: '© 2026 Profacto. جميع الحقوق محفوظة.',
      en: '© 2026 Profacto. All rights reserved.',
    },
  },
} as const;
