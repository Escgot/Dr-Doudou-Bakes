import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc,
  getDocs, writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { GalleryItem } from '@/types';

// ── Seed Data ────────────────────────────────────────────────────────

const SEED_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    image: '/images/desserts/single-serve.jpg',
    titleEN: 'SINGLE-SERVE',
    titleFR: 'Chocolate Brownie',
    titleAR: 'حصص فردية',
    descriptionEN: 'Our chef-crafted snacks and mini desserts deliver exceptional flavor and shelf appeal in a single-serving size.',
    descriptionFR: 'Nos desserts miniatures offrent une saveur exceptionnelle dans un format pratique.',
    descriptionAR: 'وجباتنا الخفيفة والحلويات الصغيرة تقدم نكهة استثنائية في حصة فردية.',
    sortOrder: 1,
  },
  {
    id: 'gal-2',
    image: '/images/desserts/prepackaged.jpg',
    titleEN: 'PREPACKAGED',
    titleFR: 'Boulettes Biscuits & Amandes',
    titleAR: 'مغلف مسبقاً',
    descriptionEN: 'Retail-ready classic bakery items in convenient packaging, perfectly portioned, and available in a range of sizes.',
    descriptionFR: 'Des classiques de boulangerie emballés pour la commodité et la fraîcheur.',
    descriptionAR: 'قطع المخبوزات الكلاسيكية في تغليف مريح، مقسمة بدقة.',
    sortOrder: 2,
  },
  {
    id: 'gal-3',
    image: '/images/desserts/gateau courant noisettes chocolat.jpg',
    titleEN: 'SEASONAL & NEW',
    titleFR: 'SAISONNIER ET NOUVEAU',
    titleAR: 'موسمي وجديد',
    descriptionEN: 'Explore desserts with standout appeal that drive relevance all year.',
    descriptionFR: 'Découvrez nos créations saisonnières qui captivent toute l\'année.',
    descriptionAR: 'استكشف الحلويات ذات الجاذبية المتميزة التي تناسب جميع فصول السنة.',
    sortOrder: 3,
  },
  {
    id: 'gal-4',
    image: '/images/desserts/premium-cake.jpg',
    titleEN: 'PREMIUM CAKES',
    titleFR: 'GÂTEAUX PREMIUM',
    titleAR: 'كيك فاخر',
    descriptionEN: 'Visually stunning, scratch-made multi-layer bar cakes, round cakes, molten, and gluten-free cakes crafted to perfection.',
    descriptionFR: 'Gâteaux à étages visuellement époustouflants, préparés de manière artisanale.',
    descriptionAR: 'كيك طبقات مذهل بصرياً، مصنوع يدوياً بإتقان.',
    sortOrder: 4,
  },
  {
    id: 'gal-5',
    image: '/images/desserts/cheesecake.jpg',
    titleEN: 'PREMIUM CHEESECAKES',
    titleFR: 'Boulettes Biscuits & Amandes',
    titleAR: 'تشيز كيك بريميوم',
    descriptionEN: 'An impressive assortment of smooth & creamy cheesecakes made with real cream cheese and fresh ingredients.',
    descriptionFR: 'Un assortiment onctueux de cheesecakes faits avec de vrais ingrédients.',
    descriptionAR: 'تشكيلة رائعة من التشيز كيك الكريمي المصنوع من جبنة كريمية حقيقية.',
    sortOrder: 5,
  },
  {
    id: 'gal-6',
    image: '/images/desserts/brownies.jpg',
    titleEN: 'BROWNIES & BARS',
    titleFR: 'Pâte Sablée',
    titleAR: 'براونيز وقوالب',
    descriptionEN: 'A premium collection of dessert bars and brownies with our signature layering capabilities, ideal for on-the-go formats.',
    descriptionFR: 'Une collection de barres dessert et brownies signature, parfaits pour emporter.',
    descriptionAR: 'مجموعة فاخرة من قوالب الحلوى والبراونيز بطبقاتنا المميزة.',
    sortOrder: 6,
  },
  {
    id: 'gal-7',
    image: '/images/desserts/cake-slice.webp',
    titleEN: 'PREMIUM PIES',
    titleFR: 'Entremets Noisette & Chocolat',
    titleAR: 'فطائر بريميوم',
    descriptionEN: 'Classic and innovative pie varieties made with premium fillings and flaky, buttery crusts.',
    descriptionFR: 'Variétés de tartes classiques et innovantes faites avec des garnitures de qualité supérieure.',
    descriptionAR: 'أنواع الفطائر الكلاسيكية والمبتكرة المصنوعة من حشوات فاخرة وعجينة مقرمشة.',
    sortOrder: 7,
  },
  {
    id: 'gal-8',
    image: '/images/desserts/chocolate-roll.jpg',
    titleEN: 'GLUTEN-FREE',
    titleFR: 'SANS GLUTEN',
    titleAR: 'خالي من الغلوتين',
    descriptionEN: 'Delicious gluten-free options that never compromise on taste or texture.',
    descriptionFR: 'Délicieuses options sans gluten qui ne font jamais de compromis sur le goût.',
    descriptionAR: 'خيارات لذيذة خالية من الغلوتين لا تساوم أبداً على المذاق أو القوام.',
    sortOrder: 8,
  },
  {
    id: 'gal-9',
    image: '/images/desserts/honey-cake.jpg',
    titleEN: 'HONEY CAKES',
    titleFR: 'GÂTEAUX AU MIEL',
    titleAR: 'كيك العسل',
    descriptionEN: 'Traditional honey-infused layers creating a rich, deeply comforting flavor profile.',
    descriptionFR: 'Couches traditionnelles infusées au miel créant un profil de saveur riche.',
    descriptionAR: 'طبقات تقليدية غنية بالعسل تخلق نكهة عميقة ومريحة.',
    sortOrder: 9,
  },
  {
    id: 'gal-10',
    image: '/images/desserts/macarons.jpg',
    titleEN: 'FRENCH MACARONS',
    titleFR: 'MACARONS FRANÇAIS',
    titleAR: 'ماكرون فرنسي',
    descriptionEN: 'Delicate, airy almond shells filled with an assortment of velvety ganaches and preserves.',
    descriptionFR: 'Coques d\'amandes délicates et aériennes remplies d\'un assortiment de ganaches.',
    descriptionAR: 'أصداف لوز هشة وهادئة محشوة بتشكيلة من الغاناش المخملي والمربيات.',
    sortOrder: 10,
  },
  {
    id: 'gal-11',
    image: '/images/desserts/fruit-tart.jpg',
    titleEN: 'FRUIT TARTS',
    titleFR: 'TARTES AUX FRUITS',
    titleAR: 'تارت الفواكه',
    descriptionEN: 'Crisp pastry shells overflowing with vanilla custard and beautifully arranged seasonal fruits.',
    descriptionFR: 'Pâtes croustillantes débordantes de crème pâtissière et de fruits de saison.',
    descriptionAR: 'قشور معجنات مقرمشة تفيض بكاسترد الفانيليا وفواكه موسمية مرتبة بجمال.',
    sortOrder: 11,
  },
  {
    id: 'gal-12',
    image: '/images/desserts/chocolate-truffles.jpg',
    titleEN: 'ARTISAN TRUFFLES',
    titleFR: 'TRUFFES ARTISANALES',
    titleAR: 'ترافل حرفي',
    descriptionEN: 'Hand-rolled chocolate ganache coated in premium cocoa dust and toasted nuts.',
    descriptionFR: 'Ganache au chocolat roulée à la main et enrobée de cacao de qualité supérieure.',
    descriptionAR: 'غاناش شوكولاتة ملفوف يدوياً ومغطى بمسحوق الكاكاو والمكسرات المحمصة.',
    sortOrder: 12,
  },
];

// ── Firestore helpers ────────────────────────────────────────────────

function isFirebaseConfigured(): boolean {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return !!projectId && projectId !== 'your-project-id';
}

const galleryCol = () => collection(db, 'gallery');

async function seedCollection<T extends { id: string }>(
  colRef: ReturnType<typeof collection>,
  seedData: T[]
) {
  const snap = await getDocs(colRef);
  if (snap.empty) {
    const batch = writeBatch(db);
    for (const item of seedData) {
      const { id, ...data } = item;
      batch.set(doc(colRef, id), data);
    }
    await batch.commit();
  }
}

// ── localStorage fallback ────────────────────────────────────────────

const STORAGE_KEY = 'ddb_gallery';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* corrupt data, use fallback */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* storage full */ }
}

// ── Context ──────────────────────────────────────────────────────────

interface GalleryContextType {
  galleryItems: GalleryItem[];
  isLoading: boolean;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  reorderGalleryItems: (items: GalleryItem[]) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const useFirestore = isFirebaseConfigured();

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    useFirestore ? [] : loadFromStorage(STORAGE_KEY, SEED_GALLERY)
  );
  const [isLoading, setIsLoading] = useState(useFirestore);

  // ── Firestore real-time listener ───────────────────────────────
  useEffect(() => {
    if (!useFirestore) return;

    const initSeed = async () => {
      try {
        await seedCollection(galleryCol(), SEED_GALLERY);
      } catch (err) {
        console.error('Gallery seed error:', err);
      }
    };
    initSeed();

    const unsub = onSnapshot(
      galleryCol(),
      (snap) => {
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as GalleryItem))
          .sort((a, b) => a.sortOrder - b.sortOrder);
        setGalleryItems(data);
        setIsLoading(false);
      },
      (err) => {
        console.error('Gallery snapshot error:', err);
        setGalleryItems(SEED_GALLERY);
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, [useFirestore]);

  // ── localStorage persistence (fallback mode) ──────────────────
  useEffect(() => {
    if (useFirestore) return;
    saveToStorage(STORAGE_KEY, galleryItems);
  }, [galleryItems, useFirestore]);

  // ── CRUD ───────────────────────────────────────────────────────
  const addGalleryItem = useCallback(async (item: Omit<GalleryItem, 'id'>) => {
    if (useFirestore) {
      await addDoc(galleryCol(), item);
    } else {
      const id = `gal-${Date.now().toString(36)}`;
      setGalleryItems(prev => [...prev, { ...item, id }].sort((a, b) => a.sortOrder - b.sortOrder));
    }
  }, [useFirestore]);

  const updateGalleryItem = useCallback(async (id: string, updates: Partial<GalleryItem>) => {
    if (useFirestore) {
      const { id: _id, ...cleanUpdates } = updates as GalleryItem;
      void _id;
      await updateDoc(doc(db, 'gallery', id), cleanUpdates);
    } else {
      setGalleryItems(prev =>
        prev.map(g => (g.id === id ? { ...g, ...updates } : g)).sort((a, b) => a.sortOrder - b.sortOrder)
      );
    }
  }, [useFirestore]);

  const deleteGalleryItem = useCallback(async (id: string) => {
    if (useFirestore) {
      await deleteDoc(doc(db, 'gallery', id));
    } else {
      setGalleryItems(prev => prev.filter(g => g.id !== id));
    }
  }, [useFirestore]);

  const reorderGalleryItems = useCallback(async (items: GalleryItem[]) => {
    if (useFirestore) {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        batch.update(doc(db, 'gallery', item.id), { sortOrder: index + 1 });
      });
      await batch.commit();
    } else {
      setGalleryItems(items.map((item, index) => ({ ...item, sortOrder: index + 1 })));
    }
  }, [useFirestore]);

  return (
    <GalleryContext.Provider
      value={{
        galleryItems, isLoading,
        addGalleryItem, updateGalleryItem, deleteGalleryItem, reorderGalleryItems,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used within GalleryProvider');
  return ctx;
}
