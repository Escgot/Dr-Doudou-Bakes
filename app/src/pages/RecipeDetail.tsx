import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Mock data to simulate the detailed recipe matching the user's design
const RECIPE_DETAILS: Record<string, any> = {
  'honey-cake': {
    title: 'Traditional Honey Cake',
    quote: 'The recipe my grandmother never wrote down — I watched her hands and memorized every movement.',
    ingredientGroups: [
      {
        title: 'Ingredients',
        items: [
          '500g phyllo dough',
          '300g mixed pistachios and walnuts, finely chopped',
          '250g unsalted butter, melted',
          '1 tsp cinnamon',
          '¼ tsp ground cloves',
        ],
      },
      {
        title: 'For the Syrup',
        items: [
          '2 cups sugar',
          '1 cup water',
          '1 tbsp lemon juice',
          '2 tbsp orange blossom water',
          '1 tbsp rosewater',
        ],
      }
    ],
    steps: [
      'Preheat your oven to 175°C. Brush your tray with butter and whisper a prayer — Teta always did.',
      'Layer 10 sheets of phyllo, brushing each with melted butter. Let the edges hang over — imperfection is beautiful.',
      'Spread a generous handful of the nut mixture. Add another 5 sheets of buttered phyllo. Repeat until all nuts are used.',
      'Top with 10 final sheets, each brushed with love and butter. Cut into diamonds before baking.',
    ],
  }
};

export function RecipeDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  
  // In a real app, you'd fetch the recipe by ID. We'll fallback to the 'honey-cake' mock data.
  const recipe = RECIPE_DETAILS[id || ''] || RECIPE_DETAILS['honey-cake'];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 font-sans text-[#5c4e41]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/recipes" 
          className="inline-flex items-center text-sm font-medium text-primary/70 hover:text-primary transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t('recipe.back')}
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title can go here, but omitted to perfectly match user's screenshot frame */}
          {/* <h1 className="text-4xl md:text-5xl font-serif text-primary mb-8">{recipe.title}</h1> */}

          {/* Quote Block */}
          {recipe.quote && (
            <div className="border-l-[3px] border-[#D4AF37] pl-5 mb-12">
              <p className="font-serif italic text-xl text-[#8E8478] leading-relaxed">
                {recipe.quote}
              </p>
            </div>
          )}

          {/* Ingredients Box */}
          <div className="bg-[#FAF6F0] rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-16 overflow-hidden border border-[#F0EBE1]">
            {recipe.ingredientGroups.map((group: any, groupIndex: number) => (
              <div key={groupIndex}>
                <div className={`px-8 py-5 ${groupIndex !== 0 ? 'border-t border-[#EAE3D9]' : ''}`}>
                  <h3 className="font-serif text-2xl text-[#4A3F35] tracking-wide">
                    {group.title}
                  </h3>
                </div>
                <ul className="flex flex-col">
                  {group.items.map((item: string, itemIndex: number) => (
                    <li 
                      key={itemIndex} 
                      className={`px-8 py-4 border-t border-[#EAE3D9] text-[#7A6A5E] text-base`}
                    >
                      <span className="opacity-70 mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Steps Section */}
          <div>
            <h2 className="font-serif text-3xl text-[#4A3F35] mb-8">{t('recipe.steps')}</h2>
            <div className="space-y-8">
              {recipe.steps.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2EFE8] text-[#D4AF37] font-serif text-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {index + 1}
                  </div>
                  <p className="text-lg text-[#7A6A5E] leading-relaxed pt-1.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
