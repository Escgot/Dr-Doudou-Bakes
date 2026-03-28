import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ChefHat, Users, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  category: string;
  tags: string[];
}

const FEATURED_RECIPES: Recipe[] = [
  {
    id: 'honey-cake',
    title: 'Traditional Honey Cake',
    description: 'A comforting, multi-layered honey cake filled with delicate sour cream frosting. Passed down through generations.',
    imageUrl: '/images/desserts/cake-slice.jpg',
    prepTime: '45m',
    difficulty: 'Medium',
    servings: 8,
    category: 'Traditional',
    tags: ['Comfort', 'Classic'],
  },
  {
    id: 'chocolate-roll',
    title: 'Rich Chocolate Log',
    description: 'A deeply indulgent chocolate sponge rolled with premium cocoa ganache and fresh cream.',
    imageUrl: '/images/desserts/chocolate-roll.jpg',
    prepTime: '30m',
    difficulty: 'Easy',
    servings: 6,
    category: 'Cakes',
    tags: ['Chocolate', 'Quick'],
  },
  {
    id: 'vanilla-cheesecake',
    title: 'Vanilla Bean Cheesecake',
    description: 'Smooth, rich, and creamy cheesecake made with real Madagascar vanilla beans.',
    imageUrl: '/images/desserts/cheesecake.jpg',
    prepTime: '1h 20m',
    difficulty: 'Medium',
    servings: 12,
    category: 'Cheesecakes',
    tags: ['Classic', 'Party'],
  },
  {
    id: 'dark-brownie',
    title: 'Decadent Fudge Brownie',
    description: 'Gooey and dense dark chocolate brownies with a crackly top, perfectly balanced with a hint of sea salt.',
    imageUrl: '/images/desserts/brownies.jpg',
    prepTime: '40m',
    difficulty: 'Easy',
    servings: 9,
    category: 'Brownies',
    tags: ['Chocolate', 'Bestseller'],
  },
  {
    id: 'seasonal-berry-pie',
    title: 'Seasonal Forest Berry Pie',
    description: 'A buttery, flaky crust bursting with fresh, seasonal mixed berries and a hint of lemon zest.',
    imageUrl: '/images/desserts/seasonal-pie.jpg',
    prepTime: '1h',
    difficulty: 'Hard',
    servings: 8,
    category: 'Pies',
    tags: ['Fruity', 'Seasonal'],
  },
  {
    id: 'mini-tarts',
    title: 'Artisanal Fruit Tarts',
    description: 'Delicate shortcrust pastry shells filled with vanilla custard and topped with fresh glaze.',
    imageUrl: '/images/desserts/single-serve.jpg',
    prepTime: '50m',
    difficulty: 'Medium',
    servings: 4,
    category: 'Tarts',
    tags: ['Elegant', 'Quick'],
  }
];

const CATEGORIES = ['All', 'Cakes', 'Traditional', 'Cheesecakes', 'Pies', 'Brownies', 'Tarts'];

export function Recipes() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent navigating to the recipe page
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredRecipes = FEATURED_RECIPES.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20 font-sans">

      {/* Hero Header Section */}
      <section className="bg-primary pt-8 lg:pt-12 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl z-20 -mb-20 lg:-mb-28 translate-y-8"
          >
            <img
              src="/images/desserts/honey-cake.jpg"
              alt="Delicious recipes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-white font-serif text-4xl lg:text-6xl tracking-wide mb-4 drop-shadow-md">
                  {t('recipes.hero')}
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow">
                  {t('recipes.desc')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-32 lg:mt-56">
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
                {category === 'All' ? t('recipes.all') : category}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Recipe Grid (Main Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={recipe.id}
              >
                <Link to={`/recipes/${recipe.id}`} className="block group">
                  <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col hover:-translate-y-1">

                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm tracking-wide">
                        {recipe.category}
                      </div>
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(e, recipe.id)}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${favorites.has(recipe.id) ? 'fill-[#BA7B63] text-[#BA7B63]' : 'text-primary'}`}
                        />
                      </button>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-xl text-primary font-bold mb-2 group-hover:text-primary-light transition-colors line-clamp-1">
                        {recipe.title}
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-6 flex-1">
                        {recipe.description}
                      </p>

                      {/* Metadata Row */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/10">
                        <div className="flex items-center text-xs text-muted-foreground gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-primary/70" />
                          <span>{recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1.5 font-medium">
                          <ChefHat className="w-3.5 h-3.5 text-primary/70" />
                          <span>{recipe.difficulty}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1.5 font-medium">
                          <Users className="w-3.5 h-3.5 text-primary/70" />
                          <span>{recipe.servings}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-primary font-serif mb-2">{t('recipes.empty.title')}</p>
            <p className="text-muted-foreground">{t('recipes.empty.desc')}</p>
          </motion.div>
        )}
      </section>

    </div>
  );
}
