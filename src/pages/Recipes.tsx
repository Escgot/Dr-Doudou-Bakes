import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ChefHat, Users, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RecipeContent {
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface Recipe {
  id: string;
  imageUrl: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  translations: {
    EN: RecipeContent;
    FR: RecipeContent;
    AR: RecipeContent;
  };
}

const FEATURED_RECIPES: Recipe[] = [
  {
    id: 'honey-cake',
    imageUrl: '/images/desserts/cake-slice.jpg',
    prepTime: '2h',
    difficulty: 'Hard',
    servings: 10,
    translations: {
      EN: {
        title: 'Heritage Hazelnut & Chocolate Entremets',
        description: 'A luxurious alliance of hazelnut dacquoise, cocoa genoise, and smooth mousseline cream for grand occasions.',
        category: 'Entremets',
        tags: ['Chocolate', 'Hazelnut']
      },
      FR: {
        title: 'Entremets Noisette & Chocolat',
        description: 'Une alliance luxueuse de dacquoise noisette, génoise cacao et crème mousseline onctueuse pour les grandes occasions.',
        category: 'Entremets',
        tags: ['Chocolat', 'Noisette']
      },
      AR: {
        title: 'أنطرميه البندق والشوكولاتة التراثي',
        description: 'تحالف فاخر من داكواز البندق، جينواز الكاكاو، وكريم موسلين ناعم للمناسبات الكبرى.',
        category: 'Entremets',
        tags: ['شوكولاتة', 'بندق']
      }
    }
  },
  {
    id: 'chocolate-roll',
    imageUrl: '/images/desserts/russe-pistache.jpg',
    prepTime: '1h',
    difficulty: 'Hard',
    servings: 12,
    translations: {
      EN: {
        title: 'Pistachio Russian Cake',
        description: 'A revisited classic composed of three layers of pistachio dacquoise and a silky, fragrant mousseline cream.',
        category: 'Entremets',
        tags: ['Pistachio', 'Russian']
      },
      FR: {
        title: 'Russe Pistache',
        description: 'Un classique revisité composé de trois couches de dacquoise pistache et d’une crème mousseline onctueuse et parfumée.',
        category: 'Entremets',
        tags: ['Pistache', 'Russe']
      },
      AR: {
        title: 'كيك روسي بالفستق',
        description: 'كلاسيكي متجدد يتكون من ثلاث طبقات من داكواز الفستق وكريم موسلين حريري وعطر.',
        category: 'Entremets',
        tags: ['فستق', 'روسي']
      }
    }
  },
  {
    id: 'vanilla-cheesecake',
    imageUrl: '/images/desserts/cheesecake.jpg',
    prepTime: '20m',
    difficulty: 'Easy',
    servings: 20,
    translations: {
      EN: {
        title: 'Biscuit & Almond Rounds',
        description: 'Delicious artisanal bites blending crunchy almonds with the sweetness of geranium water and chocolate.',
        category: 'Traditional',
        tags: ['Authentic', 'Bites']
      },
      FR: {
        title: 'Boulettes Biscuits & Amandes',
        description: 'De délicieuses bouchées artisanales mêlant le croquant des amandes à la douceur de l’eau de géranium et du chocolat.',
        category: 'Traditional',
        tags: ['Authentique', 'Bouchées']
      },
      AR: {
        title: 'كرات البسكويت واللوز',
        description: 'لقيمات حرفية لذيذة تمزج بين اللوز المقرمش وحلاوة ماء العطرشية والشوكولاتة.',
        category: 'Traditional',
        tags: ['أصيل', 'لقيمات']
      }
    }
  },
  {
    id: 'dark-brownie',
    imageUrl: '/images/desserts/gateau courant noisettes chocolat.jpg',
    prepTime: '45m',
    difficulty: 'Medium',
    servings: 12,
    translations: {
      EN: {
        title: 'No-Bake Hazelnut Chocolate Cake',
        description: 'A stunning no-bake dessert layering intense chocolate mousse and a smooth hazelnut praline mousseline.',
        category: 'Traditional',
        tags: ['Chocolate', 'Hazelnut', 'No-Bake']
      },
      FR: {
        title: "Gâteau courant d'air noisettes chocolat",
        description: 'Un dessert sans cuisson renversant, superposant une mousse chocolat intense et une mousseline praliné onctueuse.',
        category: 'Traditional',
        tags: ['Chocolat', 'Noisette', 'Sans Cuisson']
      },
      AR: {
        title: 'كيك الشوكولاتة والبندق بدون خبز',
        description: 'تحلية مذهلة بدون خبز بطبقات من موس الشوكولاتة المكثف وموسلين براليني البندق الناعم.',
        category: 'Traditional',
        tags: ['شوكولاتة', 'بندق', 'بدون خبز']
      }
    }
  },
  {
    id: 'seasonal-berry-pie',
    imageUrl: '/images/desserts/brownies.jpg',
    prepTime: '1h',
    difficulty: 'Hard',
    servings: 8,
    translations: {
      EN: {
        title: 'Artisanal Shortcrust Base',
        description: 'A crispy handcrafted base in 5 irresistible flavors: Pistachio, Hazelnut, Kinder, Snickers, and Dubai.',
        category: 'Biscuits',
        tags: ['Authentic', 'Zouza']
      },
      FR: {
        title: 'Pâte Sablée',
        description: 'Une base artisanale croustillante à sabler, déclinée en 5 parfums irrésistibles : Pistache, Noisette, Kinder, Snickers et Dubaï.',
        category: 'Biscuits',
        tags: ['Authentique', 'Zouza']
      },
      AR: {
        title: 'عجينة الصابلي الحرفية',
        description: 'قاعدة مقرمشة مصنوعة يدوياً بخمس نكهات لا تقاوم: فستق، بندق، كيندر، سنيكرز، ودبي.',
        category: 'Biscuits',
        tags: ['أصيل', 'زوزة']
      }
    }
  },
  {
    id: 'mini-tarts',
    imageUrl: '/images/desserts/single-serve.jpg',
    prepTime: '50m',
    difficulty: 'Medium',
    servings: 4,
    translations: {
      EN: {
        title: 'Chocolate Brownie',
        description: 'A rich and fudgy chocolate brownie with artisanal toppings and a perfect crackly top.',
        category: 'Brownies',
        tags: ['Chocolate', 'Fudge']
      },
      FR: {
        title: 'Chocolate Brownie',
        description: 'Brownie au chocolat riche et fondant avec des garnitures artisanales et une croûte parfaitement craquante.',
        category: 'Brownies',
        tags: ['Chocolat', 'Fondant']
      },
      AR: {
        title: 'براوني الشوكولاتة',
        description: 'براوني شوكولاتة غني وطري مع إضافات حرفية وطبقة علوية مقرمشة مثالية.',
        category: 'Brownies',
        tags: ['شوكولاتة', 'فدج']
      }
    }
  }
];

const CATEGORIES = ['All', 'Cakes', 'Traditional', 'Cheesecakes', 'Pies', 'Brownies', 'Tarts', 'Biscuits', 'Entremets'];

export function Recipes() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredRecipes = FEATURED_RECIPES.filter(recipe => {
    const content = recipe.translations[language];
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || content.category === selectedCategory || (content.category === 'Traditionnel' && selectedCategory === 'Traditional');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary pt-10 lg:pt-16 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[2rem] overflow-hidden aspect-video shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-20 -mb-28 lg:-mb-36 translate-y-16 lg:translate-y-24"
          >
            <img
              src="/images/desserts/chocolate-mixing.jpg"
              alt="Artisan recipes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-white font-serif text-4xl lg:text-7xl mb-4 tracking-wide uppercase drop-shadow-md">
                  {t('recipes.hero')}
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-sm italic">
                  {t('recipes.desc')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area - Cinematic Transition */}
      <div className="bg-[#FEF6ED] pt-44 lg:pt-64 pb-24 min-h-screen">
        {/* Search & Filter Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-primary/10 pb-8">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('recipes.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-sm border border-transparent focus:border-primary/20 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {/* Categories Pill Bar */}
            <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-muted-foreground hover:bg-white/60 shadow-sm'
                    }`}
                >
                  {category === 'All' ? t('cat.all') : t(`cat.${category.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredRecipes.map((recipe) => {
                const content = recipe.translations[language];
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={recipe.id}
                  >
                    <Link to={`/recipes/${recipe.id}`} className="block group">
                      <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col hover:-translate-y-1 border border-primary/5">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={recipe.imageUrl}
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm tracking-widest uppercase">
                            {t(`cat.${content.category.toLowerCase()}`)}
                          </div>
                          <button
                            onClick={(e) => toggleFavorite(e, recipe.id)}
                            className="absolute top-4 right-4 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                          >
                            <Heart className={`w-4 h-4 transition-colors ${favorites.has(recipe.id) ? 'fill-[#BA7B63] text-[#BA7B63]' : 'text-primary'}`} />
                          </button>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="font-serif text-lg text-primary font-bold mb-2 group-hover:text-primary-light transition-colors line-clamp-1 uppercase tracking-wide">
                            {content.title}
                          </h3>
                          <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-6 flex-1 italic opacity-80">
                            {content.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/5">
                            <div className="flex items-center text-[10px] text-muted-foreground gap-1.5 font-bold uppercase tracking-tighter">
                              <Clock className="w-3 h-3 text-primary/70" />
                              <span>{recipe.prepTime}</span>
                            </div>
                            <div className="flex items-center text-[10px] text-muted-foreground gap-1.5 font-bold uppercase tracking-tighter">
                              <ChefHat className="w-3 h-3 text-primary/70" />
                              <span>{t(`recipes.${recipe.difficulty.toLowerCase()}`)}</span>
                            </div>
                            <div className="flex items-center text-[10px] text-muted-foreground gap-1.5 font-bold uppercase tracking-tighter">
                              <Users className="w-3 h-3 text-primary/70" />
                              <span>{recipe.servings}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-primary font-serif mb-2">{t('recipes.empty.title')}</p>
              <p className="text-muted-foreground">{t('recipes.empty.desc')}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
