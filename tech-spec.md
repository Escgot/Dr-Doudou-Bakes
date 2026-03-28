# Dr Doudou Bakes Website - Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display, Montserrat) |

## 2. Tailwind Configuration Guide

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D1A1A',
          dark: '#4A1515',
          light: '#7A2D2D',
        },
        secondary: {
          DEFAULT: '#F5C6B8',
          light: '#FCE8E2',
        },
        background: {
          DEFAULT: '#FFF8F0',
          alt: '#FFFFFF',
        },
        accent: {
          green: '#1A3D3D',
        },
        input: {
          bg: '#EDE8E4',
        },
        border: {
          DEFAULT: '#E8DDD5',
        },
        text: {
          primary: '#5D1A1A',
          secondary: '#6B5B5B',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2' }],
        'section': ['42px', { lineHeight: '1.3' }],
        'subsection': ['32px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}
```

## 3. Component Inventory

### Shadcn/UI Components (Pre-installed)

| Component | Usage | Customization Needed |
|-----------|-------|---------------------|
| Button | CTAs, form submit | Custom colors, rounded-full |
| Input | Form fields | Custom background color |
| Textarea | Message field | Custom background color |
| Select | Dropdown fields | Custom styling |
| Accordion | Capabilities section | Custom border styling |
| Card | Product cards | Custom radius, no shadow |
| Sheet | Mobile navigation | Custom background |
| Separator | Visual dividers | Custom color |

### Custom Components

| Component | Props | Description |
|-----------|-------|-------------|
| Header | - | Fixed navigation header |
| HeroSection | - | Video hero with logo overlay |
| SectionHeading | eyebrow?, title, subtitle? | Reusable section header |
| TwoColumnSection | imagePosition, image, content, icon? | Alternating layout |
| FeatureCard | image, title, description | For "How We Elevate" cards |
| ProductCarousel | items[] | Horizontal scrolling carousel |
| BrandCarousel | brands[] | Brand logo carousel |
| QuoteSection | quote, author, role | Dark green quote block |
| ContactForm | - | Full contact form |
| Footer | - | Site footer |
| ParallaxImage | src, alt | Full-width parallax image |
| AnimatedSection | children, delay? | Scroll-triggered animation wrapper |

## 4. Animation Implementation Plan

| Interaction Name | Tech Choice | Implementation Logic |
|------------------|-------------|---------------------|
| Page Load Fade | Framer Motion | `initial={{ opacity: 0 }}` `animate={{ opacity: 1 }}` on main container |
| Hero Video Reveal | Framer Motion | Scale from 0.95 to 1, opacity 0 to 1, duration 0.8s |
| Scroll Reveal | Framer Motion + useInView | `whileInView={{ opacity: 1, y: 0 }}` with viewport once:true |
| Section Stagger | Framer Motion | Parent `staggerChildren: 0.1`, children fade+slide |
| Card Hover | Tailwind + Framer | `whileHover={{ y: -4, scale: 1.02 }}` transition 300ms |
| Image Hover Scale | Tailwind | `group-hover:scale-105 transition-transform duration-500` |
| Button Hover | Tailwind | `hover:bg-primary-dark hover:scale-[1.02] transition-all duration-300` |
| Accordion Expand | Framer Motion | AnimatePresence with height animation |
| Carousel Slide | Framer Motion | drag="x" with dragConstraints |
| Parallax Image | CSS | `background-attachment: fixed` or Framer useScroll |
| Link Hover | Tailwind | `hover:opacity-80 transition-opacity duration-200` |
| Input Focus | Tailwind | `focus:ring-2 focus:ring-primary transition-shadow` |
| Float Animation | CSS Keyframes | `animate-float` on whisk image |

### Animation Timing Reference

| Animation | Duration | Easing |
|-----------|----------|--------|
| Micro-interactions | 150ms | ease |
| Standard transitions | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Page reveals | 500-800ms | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Carousel slides | 400ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Parallax | scroll-linked | linear |

## 5. Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── desserts/
│   │   ├── brands/
│   │   └── icons/
│   └── videos/
│       └── hero-video.mp4
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WelcomeSection.tsx
│   │   │   ├── TwoColumnSection.tsx
│   │   │   ├── FeatureGrid.tsx
│   │   │   ├── CapabilitiesSection.tsx
│   │   │   ├── QuoteSection.tsx
│   │   │   ├── ProductCarousel.tsx
│   │   │   ├── BrandCarousel.tsx
│   │   │   ├── ParallaxImage.tsx
│   │   │   └── ContactSection.tsx
│   │   └── shared/
│   │       ├── AnimatedSection.tsx
│   │       ├── SectionHeading.tsx
│   │       └── Logo.tsx
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── OurDesserts.tsx
│   │   ├── Foodservice.tsx
│   │   ├── Retail.tsx
│   │   ├── Careers.tsx
│   │   └── Contact.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 6. Package Installation List

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Dr Doudou Bakes"

# Install shadcn components
cd /mnt/okcomputer/output/app
npx shadcn@latest add button input textarea select accordion card sheet separator

# Install animation library
npm install framer-motion

# Install additional dependencies
npm install lucide-react
npm install clsx tailwind-merge
npm install embla-carousel-react embla-carousel-autoplay
```

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, hamburger nav, stacked sections |
| Tablet | 640-1024px | 2-column grids, condensed nav |
| Desktop | > 1024px | Full layout, all columns visible |

## 8. Performance Considerations

1. **Images**: Use WebP format with JPG fallback, lazy loading
2. **Videos**: Compress hero video, use poster image
3. **Animations**: Use transform/opacity only, add will-change
4. **Fonts**: Preload critical fonts, use font-display: swap
5. **Code Splitting**: Lazy load non-critical pages

## 9. Accessibility Requirements

1. All images have alt text
2. Form inputs have associated labels
3. Color contrast meets WCAG AA
4. Keyboard navigation supported
5. Focus indicators visible
6. Reduced motion media query respected
