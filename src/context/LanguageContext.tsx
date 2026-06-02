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
    'nav.shop': 'SHOP',
    'nav.recipes': 'RECIPES',
    'nav.about': 'ABOUT US',
    'nav.contact': 'CONTACT',

    // Home
    'hero.title': 'Dr Doudou Bakes',
    'welcome.subtitle': 'WELCOME TO DR DOUDOU BAKES',
    'welcome.title1': 'DESSERT MAKES THE MOMENT.',
    'welcome.title2': 'WE MAKE IT EXTRAORDINARY.',
    'welcome.desc': "We are Tunisia's premium artisan dessert company. Blending original chef-led creations with deep operational expertise, we empower retail and foodservice partners to delight their guests and grow their bottom line with handcrafted quality.",
    'col1.title': 'Made with Love, Baked for Happiness',
    'col1.desc': 'From rich brownies to creamy cheesecakes and celebration cakes, every dessert is handcrafted in small batches using quality ingredients and plenty of care.',
    'col2.title': 'Fresh Ideas, Homemade Goodness',
    'col2.desc': 'From classic favorites to seasonal creations, we\'re always exploring new ways to make desserts even more delightful. Every recipe is carefully crafted to balance comfort, flavor, and creativity.',
    'cap.title': 'Homemade Quality You Can Trust',
    'cap.desc1': 'At Dr Doudou Bakes, every dessert is handcrafted with care, using quality ingredients and time-tested recipes. We focus on creating desserts that taste as special as the moments they celebrate ',
    'cap.desc2': 'ABOUT US',
    'cap.c1': 'Quality Ingredients, Every Time',
    'cap.c2': 'Ingredients We Believe In',
    'cap.c3': 'Crafted in Small Batches',
    'cap.c4': 'Freshness You Can Taste',
    'cap.c5': 'Always Exploring New Flavors',
    'cap.c6': 'Desserts for Life\'s Sweet Moments',
    'cap.detail': 'Our commitment to {0} ensures that every dessert meets the highest standards of quality and excellence.',
    'quote.text': `"Every celebration deserves something sweet. Whether it's a birthday, a family gathering, or a quiet moment of indulgence, we're honored to be part of your special memories."`,
    'quote.author': '— Dr Doudou Bakes',
    'prod.title': 'Signature Desserts',
    'prod.desc': 'A curated collection of homemade cakes, cheesecakes, brownies, and sweet treats crafted to delight every dessert lover.',
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
    'about.intro.title': 'Crafted with Passion, Baked with Love',
    'about.intro.desc': "Dr Doudou Bakes is an artisan dessert studio dedicated to creating exceptional homemade cakes, cheesecakes, brownies, and pastries. Combining traditional baking techniques with carefully selected ingredients, we craft desserts that are as beautiful as they are delicious.\n Every dessert is made with the belief that life's sweetest moments deserve something truly special.",
    'about.story.title': 'Our Story',
    'about.story.p1': 'Dr Doudou Bakes began with a simple passion: creating desserts that bring people together. What started as a love for baking soon became a journey of sharing handcrafted cakes, creamy cheesecakes, rich brownies, and other sweet creations with family, friends, and customers who appreciate homemade quality.',
    'about.story.p2': 'Every recipe is carefully prepared using quality ingredients, attention to detail, and a genuine commitment to flavor. We believe that desserts are more than just treats—they are part of celebrations, milestones, and everyday moments worth savoring.',
    'about.story.p3': 'Today, Dr Doudou Bakes continues to grow while staying true to the values that inspired it from the beginning: quality, creativity, and the joy of making every occasion a little sweeter.',
    'about.quote.text': `"The greatest reward is knowing that our desserts become part of birthdays, celebrations, and moments shared with the people who matter most."`,
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
    'desserts.innov.title': 'Innovation in Every Bite',
    'desserts.innov.p1': 'At Dr Doudou Bakes, creativity is at the heart of everything we bake. We love exploring new flavors, seasonal ingredients, and unique dessert combinations while staying true to the homemade quality our customers love.',
    'desserts.innov.p2': "From timeless classics to exciting new creations, every dessert is thoughtfully crafted to deliver memorable flavor, beautiful presentation, and a truly special experience.",

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
    'nav.shop': 'BOUTIQUE',
    'nav.recipes': 'RECETTES',
    'nav.about': 'À PROPOS',
    'nav.contact': 'CONTACT',

    // Home
    'hero.title': 'Dr Doudou Pâtisserie',
    'welcome.subtitle': 'BIENVENUE CHEZ DR DOUDOU',
    'welcome.title1': 'LE DESSERT CRÉE LE MOMENT.',
    'welcome.title2': 'NOUS LE RENDONS EXTRAORDINAIRE.',
    'welcome.desc': "Nous sommes la principale entreprise de desserts haut de gamme en Tunisie. En associant des créations originales de chefs à une profonde expertise opérationnelle, nous permettons à nos partenaires du commerce de détail de ravir leurs convives.",
    'col1.title': 'Fait avec amour, cuit pour le bonheur',
    'col1.desc': "Des brownies riches aux cheesecakes crémeux et gâteaux de célébration, chaque dessert est préparé de manière artisanale en petites quantités avec des ingrédients de qualité et beaucoup de soin.",
    'col2.title': 'Des idées fraîches, un goût fait maison',
    'col2.desc': "Des classiques favoris aux créations saisonnières, nous explorons toujours de nouvelles façons de rendre nos desserts encore plus délicieux. Chaque recette est soigneusement élaborée pour équilibrer réconfort, saveur et créativité.",
    'cap.title': 'Une Qualité Faite Maison en Laquelle Vous Pouvez Avoir Confiance',
    'cap.desc1': 'Chez Dr Doudou Bakes, chaque dessert est préparé avec soin, en utilisant des ingrédients de qualité et des recettes éprouvées par le temps. Nous nous concentrons sur la création de desserts qui ont un goût aussi spécial que les moments qu\'ils célèbrent ',
    'cap.desc2': 'À PROPOS DE NOUS',
    'cap.c1': 'Des Ingrédients de Qualité, à Chaque Fois',
    'cap.c2': 'Des Ingrédients en Lesquels Nous Croyons',
    'cap.c3': 'Préparé en Petites Quantités',
    'cap.c4': 'Une Fraîcheur Que Vous Pouvez Goûter',
    'cap.c5': 'Toujours à la Découverte de Nouvelles Saveurs',
    'cap.c6': 'Des Desserts pour les Doux Moments de la Vie',
    'cap.detail': "Notre engagement envers {0} garantit une qualité irréprochable.",
    'quote.text': `"Chaque célébration mérite une touche sucrée. Que ce soit pour un anniversaire, une réunion de famille, ou un moment de plaisir tranquille, nous sommes honorés de faire partie de vos précieux souvenirs."`,
    'quote.author': '— Dr Doudou Bakes',
    'prod.title': 'COLLECTIONS PREMIUM',
    'prod.desc': 'Des classiques favoris aux innovations audacieuses, un portefeuille complet de desserts.',
    'prod.p1.title': 'PORTIONS INDIVIDUELLES',
    'prod.p1.desc': 'Nos desserts miniatures offrent une saveur exceptionnelle dans un format pratique.',
    'prod.p2.title': 'PRÉEMBALLÉ',
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
    'contact.title': 'Contactez-nous',
    'contact.desc': 'Que vous souhaitiez passer une commande, partager un souvenir, ou simplement dire bonjour — notre porte est toujours ouverte.',
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
    'about.intro.title': 'Créé avec Passion, Cuit avec Amour',
    'about.intro.desc': "Dr Doudou Bakes est un studio de desserts artisanaux dédié à la création de gâteaux, cheesecakes, brownies et pâtisseries exceptionnels faits maison. En combinant des techniques de pâtisserie traditionnelles avec des ingrédients soigneusement sélectionnés, nous créons des desserts aussi beaux que délicieux.\n Chaque dessert est fait avec la conviction que les moments les plus doux de la vie méritent quelque chose de vraiment spécial.",
    'about.story.title': 'Notre Histoire',
    'about.story.p1': 'Dr Doudou Bakes a commencé avec une passion simple : créer des desserts qui rassemblent les gens. Ce qui a commencé comme un amour pour la pâtisserie est rapidement devenu un voyage de partage de gâteaux artisanaux, de cheesecakes crémeux, de brownies riches et d\'autres créations sucrées avec la famille, les amis et les clients qui apprécient la qualité fait maison.',
    'about.story.p2': 'Chaque recette est soigneusement préparée avec des ingrédients de qualité, une attention aux détails et un véritable engagement envers la saveur. Nous croyons que les desserts sont plus que de simples friandises — ils font partie des célébrations, des étapes importantes et des moments de la vie quotidienne qui valent la peine d\'être savourés.',
    'about.story.p3': 'Aujourd\'hui, Dr Doudou Bakes continue de croître tout en restant fidèle aux valeurs qui l\'ont inspiré dès le début : qualité, créativité et la joie de rendre chaque occasion un peu plus douce.',
    'about.quote.text': `"La plus grande récompense est de savoir que nos desserts font partie des anniversaires, des célébrations et des moments partagés avec les personnes qui comptent le plus."`,
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
    'desserts.innov.p1': 'Chez Dr Doudou Bakes, la créativité est au cœur de tout ce que nous préparons. Nous aimons explorer de nouvelles saveurs, des ingrédients de saison et des combinaisons de desserts uniques tout en restant fidèles à la qualité fait maison que nos clients adorent.',
    'desserts.innov.p2': "Des classiques intemporels aux nouvelles créations passionnantes, chaque dessert est soigneusement pensé pour offrir une saveur mémorable, une belle présentation et une expérience vraiment spéciale.",

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
    'nav.shop': 'المتجر',
    'nav.recipes': 'وصفات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',

    // Home
    'hero.title': 'دكتور دودو بيكس',
    'welcome.subtitle': 'مرحباً بكم في دكتور دودو بيكس',
    'welcome.title1': 'الحلوى تصنع اللحظة.',
    'welcome.title2': 'ونحن نجعلها استثنائية.',
    'welcome.desc': 'نحن شركة الحلويات الفاخرة الرائدة في تونس. من خلال دمج إبداعات الشيفات الأصلية مع الخبرة التشغيلية العميقة، نمكن شركاءنا للتجزئة والخدمات الغذائية من إسعاد ضيوفهم وتنمية أعمالهم.',
    'col1.title': 'صُنع بحب، خُبز من أجل السعادة',
    'col1.desc': 'من البراونيز الغنية إلى التشيز كيك الكريمي وكعك الاحتفالات، يتم تحضير كل حلوى يدوياً على دفعات صغيرة باستخدام مكونات عالية الجودة والكثير من العناية.',
    'col2.title': 'أفكار جديدة، جودة منزلية',
    'col2.desc': 'من المفضلات الكلاسيكية إلى الإبداعات الموسمية، نحن نستكشف دائماً طرقاً جديدة لجعل الحلويات أكثر متعة. تم إعداد كل وصفة بعناية لتحقيق التوازن بين الراحة والنكهة والإبداع.',
    'cap.title': 'جودة منزلية يمكنك الوثوق بها',
    'cap.desc1': 'في دكتور دودو بيكس، كل حلوى مصنوعة يدوياً بعناية، باستخدام مكونات عالية الجودة ووصفات مجربة. نحن نركز على ابتكار حلويات يكون طعمها مميزاً بقدر اللحظات التي تحتفل بها ',
    'cap.desc2': 'من نحن',
    'cap.c1': 'مكونات عالية الجودة، في كل مرة',
    'cap.c2': 'مكونات نؤمن بها',
    'cap.c3': 'مصنوعة في دفعات صغيرة',
    'cap.c4': 'نضارة يمكنك تذوقها',
    'cap.c5': 'نستكشف دائماً نكهات جديدة',
    'cap.c6': 'حلويات للحظات الحياة الحلوة',
    'cap.detail': 'التزامنا بـ {0} يضمن أن كل حلوى تلبي أعلى معايير الجودة والتميز.',
    'quote.text': '"كل احتفال يستحق شيئاً حلواً. سواء كان عيد ميلاد، أو تجمع عائلي، أو لحظة هادئة من الاستمتاع، يشرفنا أن نكون جزءاً من ذكرياتكم الخاصة."',
    'quote.author': '— دكتور دودو بيكس',
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
    'about.intro.title': 'صُنع بشغف، خُبز بحب',
    'about.intro.desc': 'دكتور دودو بيكس هو استوديو للحلويات الحرفية مخصص لصنع كعك منزلي استثنائي، تشيز كيك، براونيز ومعجنات. نجمع بين تقنيات الخبز التقليدية والمكونات المختارة بعناية لابتكار حلويات جميلة ولذيذة في نفس الوقت.\n كل حلوى تُصنع مع الإيمان بأن أجمل لحظات الحياة تستحق شيئاً مميزاً حقاً.',
    'about.story.title': 'قصتنا',
    'about.story.p1': 'بدأت دكتور دودو بيكس بشغف بسيط: ابتكار حلويات تجمع الناس معاً. ما بدأ كحب للخبز سرعان ما أصبح رحلة لمشاركة الكعك المصنوع يدوياً، والتشيز كيك الكريمي، والبراونيز الغنية، وغيرها من الإبداعات الحلوة مع العائلة والأصدقاء والعملاء الذين يقدرون الجودة المنزلية.',
    'about.story.p2': 'يتم إعداد كل وصفة بعناية باستخدام مكونات عالية الجودة، والاهتمام بالتفاصيل، والتزام حقيقي بالنكهة. نحن نؤمن بأن الحلويات ليست مجرد مكافأة — إنها جزء من الاحتفالات، واللحظات البارزة، واللحظات اليومية التي تستحق التذوق.',
    'about.story.p3': 'اليوم، تواصل دكتور دودو بيكس نموها مع البقاء مخلصة للقيم التي ألهمتها منذ البداية: الجودة، الإبداع، وفرحة جعل كل مناسبة أكثر حلاوة.',
    'about.quote.text': '"المكافأة الأكبر هي معرفة أن حلوياتنا تصبح جزءاً من أعياد الميلاد، والاحتفالات، واللحظات المشتركة مع الأشخاص الذين يهموننا أكثر."',
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
    'desserts.innov.p1': 'في دكتور دودو بيكس، الإبداع هو في قلب كل ما نخبزه. نحب استكشاف نكهات جديدة، ومكونات موسمية، ومجموعات فريدة من الحلويات مع البقاء أوفياء للجودة المنزلية التي يحبها عملاؤنا.',
    'desserts.innov.p2': 'من الكلاسيكيات الخالدة إلى الإبداعات الجديدة والمثيرة، يتم تصميم كل حلوى بعناية لتقديم نكهة لا تُنسى، وعرض جميل، وتجربة خاصة حقاً.',

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
