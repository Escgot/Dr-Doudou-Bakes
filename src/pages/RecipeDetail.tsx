import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface RecipeDetailContent {
  title: string;
  quote: string;
  ingredientGroups: {
    title: string;
    items: string[];
  }[];
  steps: string[];
}

const RECIPE_DETAILS: Record<string, { EN: RecipeDetailContent; FR: RecipeDetailContent; AR: RecipeDetailContent }> = {
  'honey-cake': {
    EN: {
      title: 'Heritage Hazelnut & Chocolate Entremets',
      quote: 'And perhaps what you fear is not fated to be... and perhaps what you hope for will indeed occur.',
      ingredientGroups: [
        {
          title: 'Hazelnut Dacquoise (x2)',
          items: ['150g ground hazelnuts', '150g icing sugar', '50g ground almonds', '40g flour', '5g baking powder', '6 egg whites', '100g sugar']
        },
        {
          title: 'Chocolate Genoise',
          items: ['2 eggs', '60g sugar', '40g flour', '20g cocoa powder']
        },
        {
          title: 'Chocolate Ganache',
          items: ['60g milk', '40g butter', '180g chocolate']
        },
        {
          title: 'Hazelnut-Chocolate Mousseline Cream',
          items: ['2 sachets pastry cream powder', '600ml milk', '6 tbsp sugar', '100g butter', '50g hazelnut paste', '30g ground or chopped hazelnuts', '1/2 prepared chocolate ganache']
        },
        {
          title: 'Assembly & Soaking',
          items: ['60ml milk (to soak the genoise)', '1/2 remaining ganache (for finish)']
        }
      ],
      steps: [
        'Dacquoise: Mix hazelnuts, icing sugar, almonds, flour, and baking powder. Whisk egg whites for 5 minutes, add sugar in 3 parts, then gently fold in dry mix. Divide and bake for 15 mins at 180°C.',
        'Chocolate Genoise: Whisk eggs and sugar until pale. Gently fold in flour and cocoa. Bake for 10 mins at 180°C.',
        'Ganache: Heat milk and butter (don\'t boil), pour over chocolate. Mix in a water bath until smooth, then freeze for 2 hours.',
        'Mousseline Cream: Prepare pastry cream with milk, sugar and powder until thick. Let cool. Add butter in 3 parts, then hazelnut paste and hazelnuts.',
        'Cream Assembly: Fold half of the ganache into the mousseline. In the other half, add 2 tbsp of mousseline to lighten it.',
        'Montage: Hazelnut dacquoise, Mousseline cream, Soaked chocolate genoise, Mousseline cream, Second hazelnut dacquoise.',
        'Finishing: Fully cover with hazelnut chocolate ganache.',
        'Decoration: Decorate according to your style: hazelnuts, chocolate, shards, or mirror effect.'
      ]
    },
    FR: {
      title: 'Entremets Noisette & Chocolat',
      quote: 'ولَعلَّ ما تَخشاهُ لَيسَ بِكائنٍ.. ولعلَّ ما تَرجوهُ سَوفَ يَكونُ\n ولعلَّ ما هَوَّنتَ لَيس بِهَيّنٍ.. ولعلَّ ما شدّدتَ سَوفَ يَهونُ',
      ingredientGroups: [
        {
          title: 'Dacquoise Noisette (x2)',
          items: ['150 g noisettes moulues', '150 g sucre glace', '50 g amandes moulues', '40 g farine', '5 g levure chimique', '6 blancs d’œufs', '100 g sucre']
        },
        {
          title: 'Génoise Chocolat',
          items: ['2 œufs', '60 g sucre', '40 g farine', '20 g cacao en poudre']
        },
        {
          title: 'Ganache Chocolat',
          items: ['60 g lait', '40 g beurre', '180 g chocolat']
        },
        {
          title: 'Crème Mousseline Noisette-Chocolat',
          items: ['2 sachets crème pâtissière en poudre', '600 ml lait', '6 c.à.s sucre', '100 g beurre (ou margarine)', '50 g pâte de noisettes', '30 g noisettes moulues ou concassées', '1/2 ganache chocolat (préparée)']
        },
        {
          title: 'Montage & Imbibage',
          items: ['60 ml lait (pour imbiber la génoise)', '1/2 ganache restante (pour finition)']
        }
      ],
      steps: [
        'Dacquoise : Mélanger noisettes, sucre glace, amandes, farine et levure. Monter les blancs en neige pendant 5 minutes, ajouter le sucre en 3 fois, puis incorporer délicatement le mélange sec. Diviser en deux et cuire chaque disque 15 min à 180°C.',
        'Génoise Chocolat : Fouetter les œufs et le sucre jusqu’à blanchiment. Ajouter farine et cacao délicatement. Cuire 10 min à 180°C.',
        'Ganache : Chauffer le lait et le beurre (sans bouillir), verser sur le chocolat. Mélanger au bain-marie jusqu’à texture lisse, puis placer 2h au congélateur.',
        'Crème Mousseline : Préparer la crème pâtissière avec lait, sucre et poudre jusqu’à épaississement. Laisser refroidir. Ajouter le beurre en 3 fois, puis la pâte de noisettes et les noisettes.',
        'Assemblage des crèmes : Incorporer la moitié de la ganache dans la mousseline. Dans l’autre moitié de ganache, ajouter 2 c.à.s de mousseline pour l’alléger.',
        'Montage : Dacquoise noisette, Crème mousseline, Génoise chocolat imbibée (lait), Crème mousseline, Deuxième dacquoise.',
        'Finition : Recouvrir entièrement avec la ganache chocolat noisette.',
        'Décoration : Décorer selon votre style : noisettes, chocolat, éclats ou effet miroir.'
      ]
    },
    AR: {
      title: 'أنطرميه البندق والشوكولاتة التراثي',
      quote: 'ولَعلَّ ما تَخشاهُ لَيسَ بِكائنٍ.. ولعلَّ ما تَرجوهُ سَوفَ يَكونُ\n ولعلَّ ما هَوَّنتَ لَيس بِهَيّنٍ.. ولعلَّ ما شدّدتَ سَوفَ يَهونُ',
      ingredientGroups: [
        {
          title: 'داكواز البندق (x2)',
          items: ['150 غرام بندق مرحي', '150 غرام سكر ناعم', '50 غرام لوز مرحي', '40 غرام فرينة', '5 غرام خميرة حلويات', '6 بياض بيض', '100 غرام سكر']
        },
        {
          title: 'جينواز الشوكولاتة',
          items: ['2 بيض', '60 غرام سكر', '40 غرام فرينة', '20 غرام كاكاو']
        },
        {
          title: 'غاناش الشوكولاتة',
          items: ['60 مل حليب', '40 غرام زبدة', '180 غرام شوكولاتة']
        },
        {
          title: 'كريم موسلين البندق والشوكولاتة',
          items: ['2 أكياس بودرة كريم باتيسيير', '600 مل حليب', '6 ملاعق كبيرة سكر', '100 غرام زبدة', '50 غرام عجينة بندق', '30 غرام بندق مرحي', 'نصف كمية الغاناش المحضرة']
        },
        {
          title: 'المونتاج والتشريب',
          items: ['60 مل حليب (لتشريب الجينواز)', 'باقي الغاناش للتزيين']
        }
      ],
      steps: [
        'الداكواز: اخلط البندق، السكر الناعم، اللوز، الفرينة والخميرة. اخفق بياض البيض لمدة 5 دقائق، أضف السكر على 3 مراحل، ثم قلب المزيج الجاف بلطف. قسمه واخبزه لمدة 15 دقيقة على 180 درجة مئوية.',
        'جينواز الشوكولاتة: اخفق البيض والسكر حتى يصبح فاتحاً. قلب الفرينة والكاكاو بلطف. اخبز لمدة 10 دقائق على 180 درجة مئوية.',
        'الغاناش: سخن الحليب والزبدة (دون غليان)، صبه فوق الشوكولاتة. اخلط في حمام مائي حتى ينعم، ثم جمد لمدة ساعتين.',
        'كريم الموسلين: حضر الكريم باتيسيير مع الحليب والسكر والبودرة حتى يثخن. اتركه يبرد. أضف الزبدة على 3 مراحل، ثم عجينة البندق والبندق.',
        'تجميع الكريمة: اطلب نصف الغاناش في الموسلين. في النصف الآخر، أضف ملعقتين من الموسلين لتخفيفه.',
        'المونتاج: داكواز البندق، كريم الموسلين، جينواز الشوكولاتة المشربة، كريم الموسلين، داكواز البندق الثاني.',
        'اللمسة الأخيرة: غطها بالكامل بغاناش الشوكولاتة والبندق.',
        'التزيين: زين حسب ذوقك: بندق، شوكولاتة، أو تأثير المرآة.'
      ]
    }
  },
  'chocolate-roll': {
    EN: {
      title: 'Pistachio Russian Cake',
      quote: 'Silence in the presence of beauty is itself a form of beauty...',
      ingredientGroups: [
        {
          title: 'Pistachio Dacquoise (x3)',
          items: ['100g ground pistachios', '100g ground almonds', '40g flour', '150g sifted icing sugar', '5g baking powder', '6 egg whites', '100g sugar']
        },
        {
          title: 'Pistachio Mousseline Cream',
          items: ['2 sachets vanilla pastry cream', '600ml milk', '4 tbsp sugar', '100g butter (room temp)', '50g pistachio paste', '50g ground or chopped pistachios', '1 tbsp syrup', 'Few drops green coloring']
        },
        {
          title: 'Montage',
          items: ['Lightly toasted pistachios']
        }
      ],
      steps: [
        'Dacquoise: Mix pistachios, almonds, flour, icing sugar and powder.',
        'Whisk whites for 5 minutes, add sugar in 3 parts until firm meringue.',
        'Gently fold in dry mix in 3 parts.',
        'Divide into 3 equal parts and spread in 20cm molds.',
        'Bake for 15 mins at 180°C, let cool completely.',
        'Mousseline: Prepare pastry cream with milk, sugar and powder until thick.',
        'Let cool completely, then whisk for 5 minutes.',
        'Add soft butter and beat until smooth and creamy.',
        'Fold in pistachio paste, pistachios, syrup and coloring.',
        'Montage: In a frame or mold: Dacquoise, cream, dacquoise, cream, roasted pistachios, dacquoise.',
        'Fully cover with the pistachio mousseline cream.',
        'Decoration: Decorate according to your style: pistachios, shards, or elegant finish.',
        'Finish: Place in freezer for 1 hour before cutting.'
      ]
    },
    FR: {
      title: 'Russe Pistache',
      quote: 'الصمتُ في حَرَم الجمالِ جمالُ..',
      ingredientGroups: [
        {
          title: 'Dacquoise Pistache (x3)',
          items: ['100 g pistaches moulues', '100 g amandes moulues', '40 g farine', '150 g sucre glace (tamisé)', '5 g levure pâtissière', '6 blancs d’œufs', '100 g sucre']
        },
        {
          title: 'Crème Mousseline Pistache',
          items: ['2 sachets crème pâtissière vanille', '600 ml lait', '4 c.à.s sucre', '100 g beurre (ou margarine, temp. ambiante)', '50 g pâte de pistache', '50 g pistaches moulues ou concassées', '1 c.à.s sirop (شحور)', 'Quelques gouttes colorant vert']
        },
        {
          title: 'Montage',
          items: ['Pistaches (légèrement torréfiées)']
        }
      ],
      steps: [
        'Dacquoise : Mélanger pistaches, amandes, farine, sucre glace et levure.',
        'Monter les blancs en neige pendant 5 minutes, puis ajouter le sucre en 3 fois jusqu’à obtenir une meringue ferme.',
        'Incorporer le mélange sec en 3 fois délicatement (de bas en haut).',
        'Diviser la pâte en 3 parts égales et étaler dans des moules de 20 cm.',
        'Cuire 15 min à 180°C (four préchauffé), puis laisser refroidir complètement.',
        'Crème Mousseline : Préparer la crème pâtissière avec lait, sucre et poudre jusqu’à épaississement.',
        'Laisser refroidir complètement, puis fouetter 5 minutes.',
        'Ajouter le beurre mou et battre jusqu’à texture lisse et onctueuse.',
        'Incorporer la pâte de pistache, les pistaches, le sirop et le colorant.',
        'Montage : Dans un cadre ou moule : Dacquoise, Crème mousseline, Dacquoise, Crème mousseline, Pistaches torréfiées, Dacquoise.',
        'Recouvrir entièrement avec la crème mousseline.',
        'Décoration : Décorer selon votre style : pistaches, éclats, ou finition élégante.',
        'Finition : Placer au congélateur 1 heure avant découpe.',
      ]
    },
    AR: {
      title: 'كيك روسي بالفستق',
      quote: 'الصمتُ في حَرَم الجمالِ جمالُ..',
      ingredientGroups: [
        {
          title: 'داكواز الفستق (x3)',
          items: ['100 غرام فستق مرحي', '100 غرام لوز مرحي', '40 غرام فرينة', '150 غرام سكر ناعم', '5 غرام خميرة حلويات', '6 بياض بيض', '100 غرام سكر']
        },
        {
          title: 'كريم موسلين الفستق',
          items: ['2 أكياس كريم باتيسيير فانيليا', '600 مل حليب', '4 ملاعق كبيرة سكر', '100 غرام زبدة', '50 غرام عجينة فستق', '50 غرام فستق مرحي', 'ملعقة كبيرة شحور', 'قطرات ملون أخضر']
        },
        {
          title: 'المونتاج',
          items: ['فستق محمص قليلاً']
        }
      ],
      steps: [
        'الداكواز: اخلط الفستق، اللوز، الفرينة، السكر الناعم والخميرة.',
        'اخفق البياض لمدة 5 دقائق، أضف السكر على 3 مراحل حتى تحصل على ميرينغ متماسك.',
        'أضف الخليط الجاف بلطف على 3 مراحل.',
        'قسم الخليط إلى 3 أجزاء متساوية وافرشها في قوالب 20 سم.',
        'اخبز لمدة 15 دقيقة على 180 درجة مئوية، واتركه يبرد تماماً.',
        'الموسلين: حضر الكريم باتيسيير مع الحليب والسكر والبودرة حتى يثخن.',
        'اتركه يبرد تماماً، ثم اخفقه لمدة 5 دقائق.',
        'أضف الزبدة اللينة واضرب حتى يصبح ناعماً وكريمياً.',
        'أضف عجينة الفستق، الفستق، الشحور والملون.',
        'المونتاج: في إطار أو قالب: داكواز، كريمة، داكواز، كريمة، فستق محمص، داكواز.',
        'غطها بالكامل بكريم موسلين الفستق.',
        'التزيين: زين حسب ذوقك: فستق، أو لمسة أنيقة.',
        'اللمسة الأخيرة: ضعها في المجمد لمدة ساعة قبل التقطيع.'
      ]
    }
  },
  'vanilla-cheesecake': {
    EN: {
      title: 'Biscuit & Almond Rounds',
      quote: 'Nature returns to bloom after a season of rest...',
      ingredientGroups: [
        {
          title: 'Biscuit & Almond Dough',
          items: ['2 cups powdered biscuits', '1 cup ground almonds', '1/2 cup geranium water', '1 tbsp sweetened condensed milk']
        },
        {
          title: 'Coating & Decoration',
          items: ['Melted chocolate', 'Mixed nuts (to taste)', 'Chocolate chips/shards', 'Cereals (optional)']
        }
      ],
      steps: [
        'In a bowl, mix powdered biscuits with ground almonds.',
        'Add geranium water and sweetened condensed milk.',
        'Mix until a homogeneous and malleable dough forms.',
        'Form small regular balls with your hands.',
        'Dip each ball in melted chocolate.',
        'Decorate according to your style with nuts, chocolate or cereal.',
        'Let rest until the chocolate hardens.'
      ]
    },
    FR: {
      title: 'Boulettes Biscuits & Amandes',
      quote: 'فَقَدْ تُورِقُ الأَشْجَارُ بَعْدَذُبُولِهَا.. وَيَخْضَرُّ سَاقُ النَّبْتِ وَهْوَ هَشِيمُ',
      ingredientGroups: [
        {
          title: 'Boulettes Biscuits & Amandes',
          items: ['2 tasses biscuits réduits en poudre', '1 tasse amandes moulues', '1/2 tasse eau de géranium', '1 c.à.s lait concentré sucré']
        },
        {
          title: 'Enrobage & Décoration',
          items: ['Chocolat fondu', 'Fruits secs (au choix)', 'Chocolat (copeaux, chunks…)', 'Céréales (optionnel)']
        }
      ],
      steps: [
        'Dans un bol, mélanger les biscuits en poudre avec les amandes moulues.',
        'Ajouter l’eau de géranium et le lait concentré sucré.',
        'Mélanger jusqu’à obtenir une pâte homogène et malléable.',
        'Former des petites boules régulières avec les mains.',
        'Tremper chaque boule dans le chocolat fondu.',
        'Décorer selon vos envies avec fruits secs, chocolat ou céréales.',
        'Laisser reposer jusqu’à ce que le chocolat durcisse.'
      ]
    },
    AR: {
      title: 'كرات البسكويت واللوز',
      quote: 'فَقَدْ تُورِقُ الأَشْجَارُ بَعْدَذُبُولِهَا.. وَيَخْضَرُّ سَاقُ النَّبْتِ وَهْوَ هَشِيمُ',
      ingredientGroups: [
        {
          title: 'عجينة البسكويت واللوز',
          items: ['2 كوب بسكويت مطحون', '1 كوب لوز مرحي', 'نصف كوب ماء عطرشية', 'ملعقة كبيرة حليب مكثف محلى']
        },
        {
          title: 'التغليف والتزيين',
          items: ['شوكولاتة ذائبة', 'فواكه جافة (حسب الذوق)', 'رقائق شوكولاتة', 'حبوب (اختياري)']
        }
      ],
      steps: [
        'في وعاء، اخلط البسكويت المطحون مع اللوز المرحي.',
        'أضف ماء العطرشية والحليب المكثف المحلى.',
        'اخلط حتى تحصل على عجينة متجانسة وسهلة التشكيل.',
        'شكل كرات صغيرة ومنتظمة بيديك.',
        'اغمس كل كرة في الشوكولاتة الذائبة.',
        'زين حسب ذوقك بالفواكه الجافة أو الشوكولاتة.',
        'اتركها ترتاح حتى تتماسك الشوكولاتة.'
      ]
    }
  },
  'dark-brownie': {
    EN: {
      title: 'No-Bake Hazelnut Chocolate Cake',
      quote: 'The secret is always in the patience and the premium ingredients.',
      ingredientGroups: [
        {
          title: 'Hazelnut Praline Mousseline',
          items: ['2 sachets pastry cream powder', '700ml milk', '4 tbsp sugar', '4 tbsp margarine or soft butter', '50-100g hazelnut praliné']
        },
        {
          title: 'Chocolate Mousse',
          items: ['Chocolate mousse mix', '150ml milk (reduced for extra richness)']
        },
        {
          title: 'Assembly',
          items: ['Biscuits', 'Instant coffee + water (for soaking)', 'Crushed hazelnuts']
        }
      ],
      steps: [
        'Mousseline: Mix pastry powder, milk and sugar in a pot. Thicken over heat.',
        'Cover with plastic wrap directly on top and let cool completely.',
        'Whisk cooled cream for 2 minutes.',
        'Add soft butter/margarine and beat again.',
        'Fold in hazelnut praliné and mix until silky and creamy.',
        'Chocolate Mousse: Prepare with 150ml milk for extra thickness.',
        'Assembly: Dip biscuits in coffee-water mixture.',
        'In a mold: Soaked biscuits, praline mousseline, crushed hazelnuts, biscuits, chocolate mousse, biscuits, mousseline (finish).',
        'Finishing: Smooth the top carefully.',
        'Decoration: Decorate your style: hazelnuts, chocolate, cocoa powder or modern effect.'
      ]
    },
    FR: {
      title: "Gâteau courant d'air noisettes chocolat",
      quote: 'وَلعَلَّ مَا تخٔشَاهُ ليسَ بِكَائِنٍ.. وَلعَلَّ مَا ترْجُوهُ سَوْفَ يَكُونُ',
      ingredientGroups: [
        {
          title: 'Crème Mousseline Praliné Noisettes',
          items: ['2 sachets poudre crème pâtissière', '700 ml lait', '4 c.à.s sucre', '4 c.à.s margarine (ou beurre, temp. ambiante)', '50 à 100 g praliné noisettes']
        },
        {
          title: 'Mousse au Chocolat',
          items: ['Préparation pour mousse au chocolat', '150 ml lait (au lieu de 200 ml pour plus d’onctuosité)']
        },
        {
          title: 'Montage',
          items: ['Biscuits', 'Café instantané + eau (pour imbiber)', 'Noisettes concassées']
        }
      ],
      steps: [
        'Crème Mousseline : Dans une casserole, mélanger la poudre de crème pâtissière, le lait et le sucre. Faire épaissir.',
        'Couvrir au contact avec du film alimentaire et laisser refroidir complètement.',
        'Fouetter la crème refroidie pendant 2 minutes.',
        'Ajouter la margarine (ou beurre mou) et battre à nouveau.',
        'Incorporer le praliné noisettes (50 à 100 g selon intensité) et mixer jusqu’à obtenir une texture lisse et crémeuse.',
        'Mousse au Chocolat : Préparer la mousse avec 150 ml de lait pour une texture plus épaisse et gourmande.',
        'Montage : Tremper les biscuits dans un mélange eau + café instantané.',
        'Dans un moule, réaliser les couches : Biscuits imbibés, Crème mousseline praliné, Noisettes concassées, Biscuits imbibés, Mousse au chocolat, Biscuits imbibés, Crème mousseline (finition).',
        'Finition : Lisser le dessus soigneusement.',
        'Décoration : Décorer selon votre style : noisettes, chocolat, poudre de cacao ou effet moderne.'
      ]
    },
    AR: {
      title: 'كيك الشوكولاتة والبندق بدون خبز',
      quote: 'وَلعَلَّ مَا تخٔشَاهُ ليسَ بِكَائِنٍ.. وَلعَلَّ مَا ترْجُوهُ سَوْفَ يَكُونُ',
      ingredientGroups: [
        {
          title: 'كريم موسلين براليني البندق',
          items: ['2 أكياس بودرة كريم باتيسيير', '700 مل حليب', '4 ملاعق كبيرة سكر', '4 ملاعق كبيرة زبدة لينة', '50-100 غرام براليني بندق']
        },
        {
          title: 'موس الشوكولاتة',
          items: ['خليط موس الشوكولاتة', '150 مل حليب (لتركيز النكهة والقوام)']
        },
        {
          title: 'المونتاج',
          items: ['بسكويت', 'قهوة سريعة الذوبان + ماء (للتشريب)', 'بندق مجروش']
        }
      ],
      steps: [
        'الموسلين: اخلط بودرة الكريم باتيسيير والحليب والسكر، وضعها على النار حتى تثخن.',
        'غطها بالبلاستيك واتركها تبرد تماماً.',
        'اخفق الكريمة الباردة لمدة دقيقتين.',
        'أضف الزبدة اللينة واضرب مجدداً.',
        'أضف براليني البندق واخلط حتى يصبح الحريري وكريمي.',
        'موس الشوكولاتة: حضرها مع 150 مل حليب لقوام أثقل.',
        'المونتاج: اغمس البسكويت في خليط القهوة والماء.',
        'في القالب: بسكويت مشرب، موسلين براليني، بندق مجروش، بسكويت، موس شوكولاتة، بسكويت، موسلين (للنهاية).',
        'اللمسة الأخيرة: امسح السطح بعناية.',
        'التزيين: زين حسب ذوقك: بندق، شوكولاتة، أو بودرة كاكاو.'
      ]
    }
  },
  'seasonal-berry-pie': {
    EN: {
      title: 'Artisanal Shortcrust Base (Zouza)',
      quote: 'Handcrafted with love and time...',
      ingredientGroups: [
        {
          title: 'Shortcrust Base',
          items: ['500g flour', '200g margarine or cold butter', '100g powdered sugar', '2 eggs', '1 tsp baking powder', '10g vanillin sugar']
        },
        {
          title: 'Fillings — 5 Sweet Delights',
          items: ['Pistachio: Paste, white chocolate, condensed milk', 'Hazelnut: Dark chocolate, hazelnut paste, spread, condensed milk', 'Kinder: Ready-to-use Kinder cream', 'Snickers: 1/2 peanut butter, 1/2 chocolate spread', 'Dubai: 1/2 pistachio cream, 1/2 chocolate cream']
        }
      ],
      steps: [
        'Mix flour, sugar, baking powder and vanillin sugar.',
        'Add fat (margarine/butter) and crumble the dough with fingertips.',
        'Incorporate eggs and mix until a homogeneous dough forms.',
        'Wrap in plastic film and chill.',
        'Let rest in fridge while preparing the fillings.',
        'Pro Tip 🔥: Dip cooked "zouzas" in couverture chocolate for a rich finish.'
      ]
    },
    FR: {
      title: 'Pâte Sablée',
      quote: 'صنعت بحب.. ♡',
      ingredientGroups: [
        {
          title: 'Pâte Sablée (Base)',
          items: ['500 g farine', '200 g margarine (ou beurre froid)', '100 g sucre en poudre', '2 œufs', '1 c.à.c levure chimique', '10 g sucre vanilliné']
        },
        {
          title: 'Farces — 5 Délices Sucrés',
          items: ['Pistache: Pâte de pistache, chocolat blanc, lait concentré', 'Noisette Gourmande: Chocolat noir, pâte de noisettes, lait concentré', 'Kinder: Crème à tartiner goût Kinder', 'Snickers: Beurre de cacahuètes, pâte à tartiner chocolat', 'Dubaï (Tendance): Crème pistache, crème chocolat']
        }
      ],
      steps: [
        'Mélanger la farine, le sucre, la levure chimique et le sucre vanilliné.',
        'Ajouter la margarine (ou beurre froid) et sabler la pâte du bout des doigts.',
        'Incorporer les œufs et mélanger jusqu’à obtenir une pâte homogène.',
        'Envelopper la pâte dans du film alimentaire.',
        'Laisser reposer au réfrigérateur pendant la préparation des farces.',
        'Astuce 🤎: Trempez les zouzas déjà cuits dans du chocolat de couverture pour un effet brillant.'
      ]
    },
    AR: {
      title: 'عجينة الصابلي الحرفية (زوزة)',
      quote: 'صنعت بحب.. ♡',
      ingredientGroups: [
        {
          title: 'عجينة الصابلي',
          items: ['500 غرام فرينة', '200 غرام زبدة باردة', '100 غرام سكر بودرة', '2 بيض', 'ملعقة صغيرة خميرة حلويات', '10 غرام سكر فانيليا']
        },
        {
          title: 'الحشوات — 5 نكهات رائعة',
          items: ['فستق: عجينة فستق، شوكولاتة بيضاء، حليب مكثف', 'بندق: شوكولاتة داكنة، عجينة بندق، حليب مكثف', 'كيندر: كريمة كيندر جاهزة', 'سنيكرز: زبدة الفول السوداني، شوكولاتة سائلة', 'دبي: كريمة فستق، كريمة شوكولاتة']
        }
      ],
      steps: [
        'اخلط الفرينة، السكر، الخميرة وسكر الفانيليا.',
        'أضف المادة الدهنية وافرك العجينة بأطراف أصابعك.',
        'أضف البيض واخلط حتى تحصل على عجينة متجانسة.',
        'غلفها بالبلاستيك وضعها في الثلاجة.',
        'اتركها ترتاح أثناء تحضير الحشوات.',
        'نصيحة 🔥: اغمس الزوزة المطبوخة في شوكولاتة التغطية للحصول على لمسة نهائية غنية.'
      ]
    }
  },
  'mini-tarts': {
    EN: {
      title: 'Artisanal Chocolate Brownie',
      quote: 'Fudgy, rich, and made with the finest cocoa.',
      ingredientGroups: [
        {
          title: 'Brownie Base',
          items: ['1 cup dark chocolate', '1/4 cup butter', '2 eggs', '1/2 cup sugar', '1 tsp vanilla extract', '3/4 cup flour', '2 tbsp cocoa powder', '1/4 tsp baking powder', 'Pinch of salt', '≈ 50g milk chocolate chunks']
        },
        {
          title: 'Garnish',
          items: ['Walnuts', 'Hazelnuts', 'Cashews', 'Extra dark chocolate chunks']
        }
      ],
      steps: [
        'Melt dark chocolate and butter until smooth.',
        'In another bowl, whisk eggs, sugar and vanilla for 3 mins until pale.',
        'Stir in the melted chocolate mixture.',
        'Add dry ingredients: flour, cocoa, powder, salt. Mix until smooth.',
        'Fold in the extra chocolate chunks.',
        'Pour into mold, decorate with nuts and extra chunks.',
        'Bake at 160°C for 20-30 minutes.',
        'Cool completely before slicing.'
      ]
    },
    FR: {
      title: 'Chocolate Brownie',
      quote: 'Riche, fondant et préparé avec le meilleur cacao.',
      ingredientGroups: [
        {
          title: 'Base de Brownie',
          items: ['1 tasse de chocolat noir', '1/4 tasse de beurre', '2 œufs', '1/2 tasse de sucre', '1 c.à.c d’extrait de vanille', '3/4 tasse de farine', '2 c.à.s de cacao en poudre', '1/4 c.à.c de levure chimique', 'Une pincée de sel', '≈ 50g de pépites de chocolat au lait']
        },
        {
          title: 'Garniture',
          items: ['Noix', 'Noisettes', 'Noix de cajou', 'Pépites de chocolat noir']
        }
      ],
      steps: [
        'Faire fondre le chocolat noir avec le beurre jusqu’à obtenir un mélange lisse.',
        'Dans un autre bol, battre les œufs, le sucre et la vanille pendant 3 mins jusqu’à blanchiment.',
        'Ajouter le mélange chocolaté fondu et bien mélanger.',
        'Ajouter farine, cacao, levure et sel. Mélanger jusqu’à texture lisse.',
        'Incorporer les pépites de chocolat supplémentaires.',
        'Verser dans le moule, décorer avec les noix et le chocolat.',
        'Cuire à 160°C pendant 20-30 minutes.',
        'Laisser refroidir complètement avant de couper.'
      ]
    },
    AR: {
      title: 'براوني الشوكولاتة الحرفي',
      quote: 'غني، طري، ومصنوع من أجود أنواع الكاكاو.',
      ingredientGroups: [
        {
          title: 'قاعدة البراوني',
          items: ['1 كوب شوكولاتة داكنة', 'ربع كوب زبدة', '2 بيض', 'نصف كوب سكر', 'ملعقة صغيرة فانيليا', '3 أرباع كوب فرينة', '2 ملعقة كبيرة كاكاو', 'ربع ملعقة صغيرة خميرة حلويات', 'رشة ملح', 'حوالي 50 غرام قطع شوكولاتة حليب']
        },
        {
          title: 'التزيين',
          items: ['جوز', 'بندق', 'كاجو', 'قطع شوكولاتة داكنة إضافية']
        }
      ],
      steps: [
        'ذوب الشوكولاتة الداكنة والزبدة حتى ينعم المزيج.',
        'في وعاء آخر، اخفق البيض والسكر والفانيليا لمدة 3 دقائق.',
        'أضف خليط الشوكولاتة المذابة.',
        'أضف المكونات الجافة: فرينة، كاكاو، خميرة، وملح. اخلط حتى ينعم.',
        'أضف قطع الشوكولاتة الإضافية.',
        'صبه في القالب، وزينه بالمكسرات والشوكولاتة.',
        'اخبزه على 160 درجة مئوية لمدة 20-30 دقيقة.',
        'اتركه يبرد تماماً قبل التقطيع.'
      ]
    }
  }
};

export function RecipeDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  
  const recipeData = RECIPE_DETAILS[id || ''] || RECIPE_DETAILS['honey-cake'];
  const recipe = recipeData[language];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 font-sans text-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link 
          to="/recipes" 
          className="inline-flex items-center text-sm font-bold text-primary/70 hover:text-primary transition-colors mb-12 uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t('recipe.back')}
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 tracking-wide uppercase text-center border-b-2 border-primary/10 pb-8">
            {recipe.title}
          </h1>

          {recipe.quote && (
            <div className="border-l-[4px] border-primary/30 pl-6 mb-16 italic opacity-90">
              <p className="font-serif text-xl md:text-2xl text-primary/80 leading-relaxed">
                {recipe.quote}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-12 mb-20">
            {recipe.ingredientGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary/5 shadow-sm">
                <h3 className="font-serif text-2xl text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">✦</span>
                  {group.title}
                </h3>
                <ul className="grid grid-cols-1 gap-4">
                  {group.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-4 text-primary/90 text-lg border-b border-primary/5 pb-3 last:border-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative">
            <h2 className="font-serif text-3xl text-primary mb-12 uppercase tracking-[0.2em] text-center">
              {t('recipe.steps')}
            </h2>
            <div className="space-y-12">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-8 group">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white font-serif text-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    {index + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-xl text-primary/80 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
