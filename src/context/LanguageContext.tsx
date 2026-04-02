import React, { createContext, useContext, useState } from 'react';

type Language = 'EN' | 'FR' | 'AR';

interface LanguageContextType {
  language: Language;
  toggleLanguage: (lang?: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  EN: {
    // Header & Navigation
    'nav.desserts': 'OUR DESSERTS',
    'nav.recipes': 'RECIPES',
    'nav.about': 'ABOUT US',
    'nav.contact': 'CONTACT',

    // Home
    'hero.title': 'Dr Doudou Bakes',
    'welcome.subtitle': 'WELCOME TO DR DOUDOU BAKES',
    'welcome.title1': 'DESSERT MAKES THE MOMENT.',
    'welcome.title2': 'WE MAKE IT EXTRAORDINARY.',
    'welcome.desc': "We are Tunisia's premium artisan dessert company. Blending original chef-led creations with deep operational expertise, we empower retail and foodservice partners to delight their guests and grow their bottom line with handcrafted quality.",
    'col1.title': 'TRANSFORMING DESSERT CULTURE',
    'col1.desc': 'Together with our customers, we are reshaping the bakery category. Our comprehensive product portfolio, proactive category leadership, and manufacturing scale are setting the standard in Tunisia.',
    'col2.title': 'DRIVING INNOVATION',
    'col2.desc': 'Innovation drives everything we do, from crafting new flavors to reimagining dessert platforms. Using real ingredients and culinary expertise, we push the boundaries to inspire shoppers and create memorable guest experiences.',
    'cap.title': 'ARTISANAL-AT-SCALE CAPABILITIES',
    'cap.desc1': 'Customers choose Dr Doudou Bakes because we offer more than premium desserts—we are a proven partner with an integrated platform approach that delivers scratch baking at scale. Learn more about our capabilities in ',
    'cap.desc2': 'ABOUT US',
    'cap.c1': 'TRUSTED FOOD SAFETY & QUALITY',
    'cap.c2': 'STRATEGIC SOURCING FROM TRUSTED PARTNERS',
    'cap.c3': 'SCALABLE MANUFACTURING',
    'cap.c4': 'LOGISTICS THAT DELIVER CERTAINTY',
    'cap.c5': 'INSIGHTS & ANALYTICS TO DRIVE GROWTH',
    'cap.c6': 'STAGE GATE & COMMERCIALIZATION',
    'cap.detail': 'Our commitment to {0} ensures that every dessert meets the highest standards of quality and excellence.',
    'quote.text': `"Dessert is a centerpiece for life's small and large celebrations. We deliver those experiences at scale for customers, without compromise."`,
    'quote.author': 'SUSANNE ROSS, SVP OF CULINARY AND RESEARCH & DEVELOPMENT',
    'prod.title': 'PREMIUM COLLECTIONS',
    'prod.desc': 'From classic favorites to bold innovations, a complete portfolio of premium desserts.',
    'prod.p1.title': 'SINGLE-SERVE',
    'prod.p1.desc': 'Our chef-crafted snacks and mini desserts deliver exceptional flavor and shelf appeal in a single-serving size.',
    'prod.p2.title': 'PREPACKAGED',
    'prod.p2.desc': 'Retail-ready classic bakery items in convenient packaging, perfectly portioned, and available in a range of sizes.',
    'prod.p3.title': 'SEASONAL & NEW',
    'prod.p3.desc': 'Explore desserts with standout appeal that drive relevance all year.',
    'prod.p4.title': 'PREMIUM CAKES',
    'prod.p4.desc': 'Visually stunning, scratch-made multi-layer bar cakes, round cakes, molten, and gluten-free cakes crafted to perfection.',
    'prod.p5.title': 'PREMIUM CHEESECAKES',
    'prod.p5.desc': 'An impressive assortment of smooth & creamy cheesecakes made with real cream cheese and fresh ingredients.',
    'prod.p6.title': 'BROWNIES & BARS',
    'prod.p6.desc': 'A premium collection of dessert bars and brownies with our signature layering capabilities, ideal for on-the-go formats.',

    // Contact form (used on Home and potentially Contact page)
    'contact.title': 'Get in Touch',
    'contact.desc': 'Whether you want to place an order, share a memory, or simply say hello — our door is always open.',
    'contact.name': 'Name*',
    'contact.email': 'Email*',
    'contact.company': 'Company',
    'contact.job': 'Title',
    'contact.phone': 'Phone number',
    'contact.reason': 'Reason for Contact',
    'contact.message': 'Message',
    'contact.submit': 'SUBMIT',
    'contact.name.label': 'Your Name',
    'contact.phone.label': 'Your Phone Number',
    'contact.email.label': 'Your Email',
    'contact.message.label': 'Your Message',
    'contact.name.placeholder': 'Name?',
    'contact.message.placeholder': "Tell us what's on your heart...",
    'contact.submit.btn': 'Send With Love ✦',
    'contact.hq.title': 'Headquarters',
    'contact.follow': 'Follow us on Instagram',
    'contact.welcome': 'You are welcome anytime',
    'contact.hq.main': 'DR DOUDOU BAKES HEADQUARTERS',

    'cat.all': 'All',
    'cat.entremets': 'Entremets',
    'cat.biscuits': 'Biscuits',
    'cat.traditional': 'Traditional',
    'cat.cakes': 'Cakes',
    'cat.tarts': 'Tarts',
    'cat.brownies': 'Brownies',
    'cat.pies': 'Pies',

    'desserts.cat.p7.title': 'PREMIUM PIES',
    'desserts.cat.p7.desc': 'Classic and innovative pie varieties made with premium fillings and flaky, buttery crusts.',
    'desserts.cat.p8.title': 'GLUTEN-FREE',
    'desserts.cat.p8.desc': 'Delicious gluten-free options that never compromise on taste or texture.',
    'desserts.cat.p9.title': 'HONEY CAKES',
    'desserts.cat.p9.desc': 'Traditional honey-infused layers creating a rich, deeply comforting flavor profile.',
    'desserts.cat.p10.title': 'FRENCH MACARONS',
    'desserts.cat.p10.desc': 'Delicate, airy almond shells filled with an assortment of velvety ganaches and preserves.',
    'desserts.cat.p11.title': 'FRUIT TARTS',
    'desserts.cat.p11.desc': 'Crisp pastry shells overflowing with vanilla custard and beautifully arranged seasonal fruits.',
    'desserts.cat.p12.title': 'ARTISAN TRUFFLES',
    'desserts.cat.p12.desc': 'Hand-rolled chocolate ganache coated in premium cocoa dust and toasted nuts.',

    'recipes.easy': 'Easy',
    'recipes.medium': 'Medium',
    'recipes.hard': 'Hard',

    'about.brands.title': 'Our Brands',

    // About Us Page
    'about.hero': 'About Us',
    'about.intro.title': 'We are a pastry-chef-led, premium dessert company.',
    'about.intro.desc': "At Dr Doudou Bakes, we believe dessert makes the moment. That's why we work tirelessly to craft extraordinary desserts that elevate every occasion. Our commitment to culinary excellence, real ingredients, and operational expertise has made us Tunisia's leading premium dessert company.",
    'about.story.title': 'Our Story',
    'about.story.p1': 'Founded with a passion for exceptional desserts, Dr Doudou Bakes has grown through strategic acquisitions of beloved dessert brands, each with its own unique heritage and loyal following.',
    'about.story.p2': 'Today, we operate distinct brands across Tunisia, united by a shared commitment to culinary artistry and operational excellence. From our state-of-the-art manufacturing facilities to our dedicated team of pastry chefs, every aspect of our business is focused on one goal: creating extraordinary desserts.',
    'about.story.p3': 'Our journey continues as we innovate, expand, and bring the joy of premium desserts to more tables across the region.',
    'about.quote.text': `"At Dr Doudou Bakes, we are driven by a singular purpose: to craft desserts that transform ordinary moments into extraordinary memories."`,
    'about.quote.author': 'DORRA BEN MAHMOUD, CEO',
    'about.creators.subtitle': 'المؤسسون',
    'about.creators.title': 'Meet the Creators',
    'about.creators.desc': 'The visionaries behind Dr Doudou Bakes.',
    'about.creators.ceo': 'CEO',
    'about.creators.cofounder': 'Co-Founder',
    'about.cta.title': "Let's Create Something Extraordinary",
    'about.cta.desc': "Whether you're a retailer looking to expand your dessert offerings or a foodservice partner seeking to elevate your menu, we're here to help.",
    'about.cta.btn': 'Contact Us',

    // Our Desserts Page
    'desserts.hero': 'Our Desserts',
    'desserts.gallery.subtitle': 'معرض الحلويات',
    'desserts.gallery.title': 'Premium Collections',
    'desserts.gallery.desc': 'A curated showcase of our finest works, baked with love.',
    'desserts.badge': 'Premium Desserts',
    'desserts.innov.title': 'Innovation at Our Core',
    'desserts.innov.p1': 'Our culinary team is constantly exploring new flavors, textures, and formats to stay ahead of trends and delight consumers. From seasonal specials to year-round favorites, innovation drives everything we create.',
    'desserts.innov.p2': "We leverage consumer insights, market research, and our chefs' expertise to develop desserts that not only taste extraordinary but also drive business results for our partners.",

    // Recipes Page
    'recipes.hero': 'Recipes',
    'recipes.desc': 'Discover delicious handcrafted recipes designed for the modern table.',
    'recipes.search': 'Search recipes...',
    'recipes.all': 'All',
    'recipes.empty.title': 'No recipes found',
    'recipes.empty.desc': 'Try adjusting your search or category filter.',

    // Recipe Detail Page
    'recipe.back': 'Back to Recipes',
    'recipe.steps': 'Steps'
  },
  FR: {
    // Header & Navigation
    'nav.desserts': 'NOS DESSERTS',
    'nav.recipes': 'RECETTES',
    'nav.about': 'À PROPOS',
    'nav.contact': 'CONTACT',

    // Home
    'hero.title': 'Dr Doudou Pâtisserie',
    'welcome.subtitle': 'BIENVENUE CHEZ DR DOUDOU',
    'welcome.title1': 'LE DESSERT CRÉE LE MOMENT.',
    'welcome.title2': 'NOUS LE RENDONS EXTRAORDINAIRE.',
    'welcome.desc': "Nous sommes la principale entreprise de desserts haut de gamme en Tunisie. En associant des créations originales de chefs à une profonde expertise opérationnelle, nous permettons à nos partenaires du commerce de détail de ravir leurs convives.",
    'col1.title': 'TRANSFORMER LA CULTURE DU DESSERT',
    'col1.desc': "Ensemble avec nos clients, nous remodelons la catégorie de la boulangerie. Notre vaste portefeuille de produits établit la norme dans notre industrie.",
    'col2.title': 'STIMULER L\'INNOVATION',
    'col2.desc': "L'innovation anime tout ce que nous faisons, de la création de nouvelles saveurs à la réinvention des desserts. En utilisant de vrais ingrédients, nous repoussons les limites.",
    'cap.title': 'DES CAPACITÉS ARTISANALES À GRANDE ÉCHELLE',
    'cap.desc1': 'Les clients nous choisissent parce que nous sommes un partenaire éprouvé avec une approche de pâtisserie à grande échelle. Apprenez-en plus dans ',
    'cap.desc2': 'NOTRE HISTOIRE',
    'cap.c1': 'EXCELLENCE DE LA QUALITÉ',
    'cap.c2': 'APPROVISIONNEMENT STRATÉGIQUE',
    'cap.c3': 'FABRICATION ÉVOLUTIVE',
    'cap.c4': 'LOGISTIQUE ET CERTITUDE',
    'cap.c5': 'ANALYSE POUR LA CROISSANCE',
    'cap.c6': 'COMMERCIALISATION',
    'cap.detail': "Notre engagement envers {0} garantit une qualité irréprochable.",
    'quote.text': `"Le dessert est la pièce maîtresse des célébrations de la vie. Nous offrons ces expériences à grande échelle, sans aucun compromis."`,
    'quote.author': 'SUSANNE ROSS, VICE-PRÉSIDENTE',
    'prod.title': 'COLLECTIONS PREMIUM',
    'prod.desc': 'Des classiques favoris aux innovations audacieuses, un portefeuille complet de desserts.',
    'prod.p1.title': 'PORTIONS INDIVIDUELLES',
    'prod.p1.desc': 'Nos desserts miniatures offrent une saveur exceptionnelle dans un format pratique.',
    'prod.p2.title': 'PRÉ-EMBALLÉS',
    'prod.p2.desc': 'Des classiques de boulangerie emballés pour la commodité et la fraîcheur.',
    'prod.p3.title': 'SAISONNIER ET NOUVEAU',
    'prod.p3.desc': 'Découvrez nos créations saisonnières qui captivent toute l\'année.',
    'prod.p4.title': 'GÂTEAUX PREMIUM',
    'prod.p4.desc': 'Gâteaux à étages visuellement époustouflants, préparés de manière artisanale.',
    'prod.p5.title': 'CHEESECAKES PREMIUM',
    'prod.p5.desc': 'Un assortiment onctueux de cheesecakes faits avec de vrais ingrédients.',
    'prod.p6.title': 'BROWNIES ET BARRES',
    'prod.p6.desc': 'Une collection de barres dessert et brownies signature, parfaits pour emporter.',

    // Contact form
    'contact.title': 'COMMENT POUVONS-NOUS STIMULER VOTRE CROISSANCE ?',
    'contact.desc': 'Envoyez-nous une demande pour explorer notre gamme de produits de qualité supérieure.',
    'contact.name': 'Nom*',
    'contact.email': 'Email*',
    'contact.company': 'Entreprise',
    'contact.job': 'Titre',
    'contact.phone': 'Téléphone',
    'contact.reason': 'Raison du contact',
    'contact.message': 'Message',
    'contact.submit': 'ENVOYER',
    'contact.name.label': 'Votre Nom',
    'contact.phone.label': 'Votre Numéro de Téléphone',
    'contact.email.label': 'Votre Email',
    'contact.message.label': 'Votre Message',
    'contact.name.placeholder': 'Nom?',
    'contact.message.placeholder': 'Dites-nous ce que vous avez sur le cœur...',
    'contact.submit.btn': 'Envoyer avec Amour ✦',
    'contact.hq.title': 'Siège Social',
    'contact.follow': 'Suivez-nous sur Instagram',
    'contact.welcome': 'Vous êtes les bienvenus à tout moment',
    'contact.hq.main': 'SIÈGE SOCIAL DR DOUDOU BAKES',

    // About Us Page
    'about.hero': 'À Propos',
    'about.intro.title': 'Nous sommes une entreprise de desserts haut de gamme dirigée par des chefs pâtissiers.',
    'about.intro.desc': "Chez Dr Doudou Bakes, le dessert crée le moment. C'est pourquoi nous concevons des desserts extraordinaires. Notre passion et nos vrais ingrédients font de nous les leaders du marché.",
    'about.story.title': 'Notre Histoire',
    'about.story.p1': 'Fondée avec une passion pour les desserts exceptionnels, nous avons grandi en réunissant les marques les plus appréciées, chacune avec un héritage unique.',
    'about.story.p2': 'Aujourd\'hui, nous opérons à travers toute la Tunisie avec un seul objectif : créer l\'extraordinaire.',
    'about.story.p3': 'Notre voyage continue alors que nous innovons pour amener la joie de nos desserts sur toujours plus de tables.',
    'about.quote.text': `"Nous sommes animés par un objectif singulier : façonner des desserts qui transforment les moments ordinaires en souvenirs extraordinaires."`,
    'about.quote.author': 'DORRA BEN MAHMOUD, PDG',
    'about.creators.subtitle': 'المؤسسون',
    'about.creators.title': 'Rencontrez les Créateurs',
    'about.creators.desc': 'Les visionnaires derrière Dr Doudou Bakes.',
    'about.creators.ceo': 'PDG',
    'about.creators.cofounder': 'Co-Fondatrice',
    'about.cta.title': "Créons Quelque Chose d'Extraordinaire",
    'about.cta.desc': "Que vous soyez un détaillant cherchant à étendre votre gamme ou un restaurateur souhaitant améliorer votre menu, nous sommes là.",
    'about.cta.btn': 'Nous Contacter',

    // Our Desserts Page
    'desserts.hero': 'Nos Desserts',
    'desserts.gallery.subtitle': 'معرض الحلويات',
    'desserts.gallery.title': 'Collections Premium',
    'desserts.gallery.desc': 'Une exposition raffinée de nos plus belles œuvres, préparées avec passion.',
    'desserts.badge': 'Desserts Premium',
    'desserts.innov.title': 'L\'innovation au Coeur de notre ADN',
    'desserts.innov.p1': 'Notre équipe culinaire explore constamment de nouvelles textures et saveurs pour anticiper les tendances.',
    'desserts.innov.p2': "Nous utilisons les recherches sur les consommateurs et l'expertise de nos chefs pour développer des desserts qui soient magnifiques et génèrent de la croissance.",

    // Recipes Page
    'recipes.hero': 'Recettes',
    'recipes.desc': 'Découvrez des recettes artisanales et délicieuses conçues pour la table moderne.',
    'recipes.search': 'Rechercher des recettes...',
    'recipes.all': 'Tout',
    'recipes.empty.title': 'Aucune recette trouvée',
    'recipes.empty.desc': 'Essayez de modifier votre recherche ou la catégorie.',

    // Recipe Detail Page
    'recipe.back': 'Retour aux recettes',
    'recipe.steps': 'Étapes',

    'cat.all': 'Tout',
    'cat.entremets': 'Entremets',
    'cat.biscuits': 'Biscuits',
    'cat.traditional': 'Traditionnel',
    'cat.cakes': 'Gâteaux',
    'cat.tarts': 'Tartes',
    'cat.brownies': 'Brownies',
    'cat.pies': 'Tartes',

    'desserts.cat.p7.title': 'TARTES PREMIUM',
    'desserts.cat.p7.desc': 'Variétés de tartes classiques et innovantes faites avec des garnitures de qualité supérieure.',
    'desserts.cat.p8.title': 'SANS GLUTEN',
    'desserts.cat.p8.desc': 'Délicieuses options sans gluten qui ne font jamais de compromis sur le goût.',
    'desserts.cat.p9.title': 'GÂTEAUX AU MIEL',
    'desserts.cat.p9.desc': 'Couches traditionnelles infusées au miel créant un profil de saveur riche.',
    'desserts.cat.p10.title': 'MACARONS FRANÇAIS',
    'desserts.cat.p10.desc': 'Coques d\'amandes délicates et aériennes remplies d\'un assortiment de ganaches.',
    'desserts.cat.p11.title': 'TARTES AUX FRUITS',
    'desserts.cat.p11.desc': 'Pâtes croustillantes débordantes de crème pâtissière et de fruits de saison.',
    'desserts.cat.p12.title': 'TRUFFES ARTISANALES',
    'desserts.cat.p12.desc': 'Ganache au chocolat roulée à la main et enrobée de cacao de qualité supérieure.',

    'recipes.easy': 'Facile',
    'recipes.medium': 'Moyen',
    'recipes.hard': 'Difficile',

    'about.brands.title': 'Nos Marques',
  },
  AR: {
    // Header & Navigation
    'nav.desserts': 'حلوياتنا',
    'nav.recipes': 'وصفات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',

    // Home
    'hero.title': 'دكتور دودو بيكس',
    'welcome.subtitle': 'مرحباً بكم في دكتور دودو بيكس',
    'welcome.title1': 'الحلوى تصنع اللحظة.',
    'welcome.title2': 'ونحن نجعلها استثنائية.',
    'welcome.desc': 'نحن شركة الحلويات الفاخرة الرائدة في تونس. من خلال دمج إبداعات الشيفات الأصلية مع الخبرة التشغيلية العميقة، نمكن شركاءنا للتجزئة والخدمات الغذائية من إسعاد ضيوفهم وتنمية أعمالهم.',
    'col1.title': 'تحويل ثقافة الحلويات',
    'col1.desc': 'بالتعاون مع عملائنا، نعيد تشكيل فئة المخابز. تضع محفظة منتجاتنا الشاملة وريادتنا الاستباقية في السوق معايير جديدة في صناعتنا.',
    'col2.title': 'قيادة الابتكار',
    'col2.desc': 'الابتكار يقود كل ما نقوم به، من ابتكار نكهات جديدة إلى إعادة تصور منصات الحلويات. باستخدام مكونات حقيقية وخبرة طهوية، ندفع الحدود لإلهام المتسوقين وخلق تجارب ضيوف لا تنسى.',
    'cap.title': 'قدرات حرفية على نطاق واسع',
    'cap.desc1': 'يختار العملاء دكتور دودو بيكس لأننا نقدم أكثر من مجرد حلويات فاخرة - نحن شريك موثوق مع نهج منصة متكامل يقدم خبزاً طازجاً على نطاق واسع. تعرف على المزيد حول قدراتنا في ',
    'cap.desc2': 'من نحن',
    'cap.c1': 'سلامة وجودة الغذاء الموثوقة',
    'cap.c2': 'التوريد الاستراتيجي من شركاء موثوقين',
    'cap.c3': 'تصنيع قابل للتطوير',
    'cap.c4': 'الخدمات اللوجستية التي توفر اليقين',
    'cap.c5': 'الرؤى والتحليلات لتعزيز النمو',
    'cap.c6': 'التسويق التجاري والنمو',
    'cap.detail': 'التزامنا بـ {0} يضمن أن كل حلوى تلبي أعلى معايير الجودة والتميز.',
    'quote.text': '"الحلوى هي حجر الزاوية لاحتفالات الحياة الصغيرة والكبيرة. نحن نقدم تلك التجارب على نطاق واسع لعملائنا، دون مساومة."',
    'quote.author': 'سوزان روس، نائب الرئيس لفنون الطهي والبحث والتطوير',
    'prod.title': 'مجموعات فاخرة',
    'prod.desc': 'من المفضلات الكلاسيكية إلى الابتكارات الجريئة، محفظة كاملة من الحلويات الفاخرة.',
    'prod.p1.title': 'حصص فردية',
    'prod.p1.desc': 'وجباتنا الخفيفة والحلويات الصغيرة تقدم نكهة استثنائية في حصة فردية.',
    'prod.p2.title': 'مغلف مسبقاً',
    'prod.p2.desc': 'قطع المخبوزات الكلاسيكية في تغليف مريح، مقسمة بدقة.',
    'prod.p3.title': 'موسمي وجديد',
    'prod.p3.desc': 'استكشف الحلويات ذات الجاذبية المتميزة التي تناسب جميع فصول السنة.',
    'prod.p4.title': 'كيك فاخر',
    'prod.p4.desc': 'كيك طبقات مذهل بصرياً، مصنوع يدوياً بإتقان.',
    'prod.p5.title': 'تشيز كيك بريميوم',
    'prod.p5.desc': 'تشكيلة رائعة من التشيز كيك الكريمي المصنوع من جبنة كريمية حقيقية.',
    'prod.p6.title': 'براونيز وقوالب',
    'prod.p6.desc': 'مجموعة فاخرة من قوالب الحلوى والبراونيز بطبقاتنا المميزة.',

    // Contact form
    'contact.title': 'تواصل معنا',
    'contact.desc': 'سواء كنت ترغب في تقديم طلب، أو مشاركة ذكرى، أو ببساطة إلقاء التحية - بابنا مفتوح دائماً.',
    'contact.name': 'الاسم*',
    'contact.email': 'البريد الإلكتروني*',
    'contact.company': 'الشركة',
    'contact.job': 'المنصب',
    'contact.phone': 'رقم الهاتف',
    'contact.reason': 'سبب التواصل',
    'contact.message': 'الرسالة',
    'contact.submit': 'إرسال',
    'contact.name.label': 'اسمك',
    'contact.phone.label': 'رقم هاتفك',
    'contact.email.label': 'بريدك الإلكتروني',
    'contact.message.label': 'رسالتك',
    'contact.name.placeholder': 'الاسم؟',
    'contact.message.placeholder': 'أخبرنا بما في قلبك...',
    'contact.submit.btn': 'أرسل بحب ✦',
    'contact.hq.title': 'المقر الرئيسي',
    'contact.follow': 'تابعنا على إنستغرام',
    'contact.welcome': 'أهلاً بكم في أي وقت',
    'contact.hq.main': 'المقر الرئيسي لدكتور دودو بيكس',

    // About Us Page
    'about.hero': 'من نحن',
    'about.intro.title': 'نحن شركة حلويات فاخرة يقودها شيفات محترفون.',
    'about.intro.desc': 'في دكتور دودو بيكس، نؤمن بأن الحلوى تصنع اللحظة. ولهذا السبب نعمل بلا كلل لابتكار حلويات استثنائية ترتقي بكل مناسبة. التزامنا بالتميز الطهوي والمكونات الحقيقية جعلنا الشركة الرائدة في حلويات البريميوم في تونس.',
    'about.story.title': 'قصتنا',
    'about.story.p1': 'تأسست دكتور دودو بيكس بشغف بالحلويات الاستثنائية، ونمت من خلال علامات تجارية محبوبة، لكل منها تراثها الفريد وقاعدتها المخلصة.',
    'about.story.p2': 'اليوم، نعمل عبر تونس، متحدين بالتزام مشترك بالفن الطهوي والتميز التشغيلي. كل جانب من جوانب عملنا يركز على هدف واحد: ابتكار حلويات استثنائية.',
    'about.story.p3': 'تستمر رحلتنا ونحن نبتكر ونوسع نطاقنا ونجلب بهجة الحلويات الفاخرة إلى المزيد من الموائد.',
    'about.quote.text': '"نحن مدفوعون بهدف واحد: صياغة حلويات تحول اللحظات العادية إلى ذكريات استثنائية."',
    'about.quote.author': 'درة بن محمود، الرئيس التنفيذي',
    'about.creators.subtitle': 'المؤسسون',
    'about.creators.title': 'تعرف على المبدعين',
    'about.creators.desc': 'الرؤى والبراعة خلف دكتور دودو بيكس.',
    'about.creators.ceo': 'الرئيس التنفيذي',
    'about.creators.cofounder': 'الشريك المؤسس',
    'about.cta.title': 'لنصنع شيئاً استثنائياً معاً',
    'about.cta.desc': 'سواء كنت بائع تجزئة يتطلع لتوسيع عروض الحلويات أو شريكاً في خدمات الغذاء، فنحن هنا للمساعدة.',
    'about.cta.btn': 'اتصل بنا',

    // Our Desserts Page
    'desserts.hero': 'حلوياتنا',
    'desserts.gallery.subtitle': 'معرض الحلويات',
    'desserts.gallery.title': 'مجموعات فاخرة',
    'desserts.gallery.desc': 'عرض منسق لأرقى أعمالنا، نخبزها بكل حب.',
    'desserts.badge': 'حلويات فاخرة',
    'desserts.innov.title': 'الابتكار في جوهرنا',
    'desserts.innov.p1': 'يستكشف فريق الطهي لدينا باستمرار نكهات وقوام وأشكال جديدة للبقاء في طليعة الاتجاهات. من التخصصات الموسمية إلى المفضلات الدائمة.',
    'desserts.innov.p2': 'نحن نستفيد من رؤى المستهلكين وأبحاث السوق وخبرات الشيفات لتطوير حلويات لا تقتصر على المذاق الاستثنائي بل تحقق نتائج أعمال متميزة.',

    // Recipes Page
    'recipes.hero': 'وصفات',
    'recipes.desc': 'اكتشف وصفات مصنوعة يدوياً ولذيذة مصممة للمائدة الحديثة.',
    'recipes.search': 'البحث عن وصفات...',
    'recipes.all': 'الكل',
    'recipes.empty.title': 'لم يتم العثور على وصفات',
    'recipes.empty.desc': 'حاول تعديل البحث أو فلتر الفئة.',

    // Recipe Detail Page
    'recipe.back': 'العودة إلى الوصفات',
    'recipe.steps': 'الخطوات',

    'cat.all': 'الكل',
    'cat.entremets': 'أنطرميه',
    'cat.biscuits': 'بسكويت',
    'cat.traditional': 'تقليدي',
    'cat.cakes': 'كيك',
    'cat.tarts': 'تارت',
    'cat.brownies': 'براونيز',
    'cat.pies': 'فطائر',

    'desserts.cat.p7.title': 'فطائر بريميوم',
    'desserts.cat.p7.desc': 'أنواع الفطائر الكلاسيكية والمبتكرة المصنوعة من حشوات فاخرة وعجينة مقرمشة.',
    'desserts.cat.p8.title': 'خالي من الغلوتين',
    'desserts.cat.p8.desc': 'خيارات لذيذة خالية من الغلوتين لا تساوم أبداً على المذاق أو القوام.',
    'desserts.cat.p9.title': 'كيك العسل',
    'desserts.cat.p9.desc': 'طبقات تقليدية غنية بالعسل تخلق نكهة عميقة ومريحة.',
    'desserts.cat.p10.title': 'ماكرون فرنسي',
    'desserts.cat.p10.desc': 'أصداف لوز هشة وهادئة محشوة بتشكيلة من الغاناش المخملي والمربيات.',
    'desserts.cat.p11.title': 'تارت الفواكه',
    'desserts.cat.p11.desc': 'قشور معجنات مقرمشة تفيض بكاسترد الفانيليا وفواكه موسمية مرتبة بجمال.',
    'desserts.cat.p12.title': 'ترافل حرفي',
    'desserts.cat.p12.desc': 'غاناش شوكولاتة ملفوف يدوياً ومغطى بمسحوق الكاكاو والمكسرات المحمصة.',

    'recipes.easy': 'سهل',
    'recipes.medium': 'متوسط',
    'recipes.hard': 'صعب',

    'about.brands.title': 'علاماتنا التجارية',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const toggleLanguage = (lang?: Language) => {
    if (lang) {
      setLanguage(lang);
    } else {
      setLanguage(prev => {
        if (prev === 'EN') return 'FR';
        if (prev === 'FR') return 'AR';
        return 'EN';
      });
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  const isRTL = language === 'AR';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabicMain' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
