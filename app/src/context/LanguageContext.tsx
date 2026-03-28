import React, { createContext, useContext, useState } from 'react';

type Language = 'EN' | 'FR';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
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
    'welcome.desc': "We are North America's leading premium dessert company. Blending original chef-led creations with deep operational expertise, we empower retail and foodservice partners to delight their guests and grow their bottom line.",
    'col1.title': 'TRANSFORMING DESSERT CULTURE',
    'col1.desc': 'Together with our customers, we are reshaping the bakery category. Our comprehensive product portfolio, proactive category leadership, and manufacturing scale are setting the standard in our industry.',
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

    // Contact form (used on Home and potentially Contact page)
    'contact.title': 'HOW CAN WE IGNITE GROWTH FOR YOU?',
    'contact.desc': 'Send us a request to meet and explore whether our insights, expertise, and broad array of premium products can support your strategic initiatives.',
    'contact.name': 'Name*',
    'contact.email': 'Email*',
    'contact.company': 'Company',
    'contact.job': 'Title',
    'contact.phone': 'Phone number',
    'contact.reason': 'Reason for Contact',
    'contact.message': 'Message',
    'contact.submit': 'SUBMIT',

    // About Us Page
    'about.hero': 'About Us',
    'about.intro.title': 'We are a pastry-chef-led, premium dessert company.',
    'about.intro.desc': "At Dr Doudou Bakes, we believe dessert makes the moment. That's why we work tirelessly to craft extraordinary desserts that elevate every occasion. Our commitment to culinary excellence, real ingredients, and operational expertise has made us North America's leading premium dessert company.",
    'about.story.title': 'Our Story',
    'about.story.p1': 'Founded with a passion for exceptional desserts, Dr Doudou Bakes has grown through strategic acquisitions of beloved dessert brands, each with its own unique heritage and loyal following.',
    'about.story.p2': 'Today, we operate seven distinct brands across North America, united by a shared commitment to culinary artistry and operational excellence. From our state-of-the-art manufacturing facilities to our dedicated team of pastry chefs, every aspect of our business is focused on one goal: creating extraordinary desserts.',
    'about.story.p3': 'Our journey continues as we innovate, expand, and bring the joy of premium desserts to more tables across the continent.',
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
    'welcome.desc': "Nous sommes la principale entreprise de desserts haut de gamme en Amérique du Nord. En associant des créations originales de chefs à une profonde expertise opérationnelle, nous permettons à nos partenaires du commerce de détail de ravir leurs convives.",
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

    // About Us Page
    'about.hero': 'À Propos',
    'about.intro.title': 'Nous sommes une entreprise de desserts haut de gamme dirigée par des chefs pâtissiers.',
    'about.intro.desc': "Chez Dr Doudou Bakes, le dessert crée le moment. C'est pourquoi nous concevons des desserts extraordinaires. Notre passion et nos vrais ingrédients font de nous les leaders du marché.",
    'about.story.title': 'Notre Histoire',
    'about.story.p1': 'Fondée avec une passion pour les desserts exceptionnels, nous avons grandi en réunissant les marques les plus appréciées, chacune avec un héritage unique.',
    'about.story.p2': 'Aujourd\'hui, nous opérons à travers toute l\'Amérique du Nord avec un seul objectif : créer l\'extraordinaire.',
    'about.story.p3': 'Notre voyage continue alors que nous innovons pour amener la joie de nos desserts sur toujours plus de tables.',
    'about.quote.text': `"Nous sommes animés par un objectif singulier : façonner des desserts qui transforment les moments ordinaires en souvenirs extraordinaires."`,
    'about.quote.author': 'DORRA BEN MAHMOUD, PDG',
    'about.creators.subtitle': 'المؤسسون', // Keeping Arabic exactly as it is an aesthetic layer mostly
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
    'recipe.steps': 'Étapes'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'FR' : 'EN');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
