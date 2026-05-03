# 🍰 Dr Doudou Bakes

> **Artisanal Excellence, One Slice at a Time.**

Dr Doudou Bakes is a premium digital experience for a high-end artisan dessert company. Specializing in handcrafted pastries and traditional honey cakes, this platform serves as a cinematic window into the world of artisanal baking, offering multi-language support and a seamless user experience across all devices.

---

## ✨ Key Features

-   **🌍 Multi-language & RTL Support**: Fully localized in **English**, **French**, and **Arabic**, including automatic Right-to-Left (RTL) layout switching for a native Arabic experience.
-   **🎬 Cinematic UX**: Immersive animations powered by **Framer Motion** and a sophisticated design language that reflects the premium nature of the brand.
-   **📖 Interactive Recipe Gallery**: A deep dive into artisanal secrets with detailed, step-by-step recipe guides and high-fidelity imagery.
-   **💼 B2B & Retail Solutions**: Dedicated sections for **Foodservice** (wholesale) and **Retail** partners.
-   **📱 Mobile-First Excellence**: A fully responsive design that maintains its luxury feel from desktop to mobile.
-   **🛠 Modern Tech Stack**: Built with the latest web technologies for speed, SEO, and maintainability.

---

## 🚀 Tech Stack

-   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **State Management**: Custom `LanguageContext` for global localization.

---

## 📂 Project Structure

```bash
src/
├── components/      # Reusable UI, layout, and shared components
│   ├── layout/      # Navbar, Footer, and Page wrappers
│   ├── shared/      # Feature-specific shared components
│   └── ui/          # Shadcn UI primitive components
├── context/         # Global React Context (Language, Theme, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── pages/           # Page-level components (Home, About, Recipes, etc.)
├── App.tsx          # Root application component & Routing
└── index.css        # Global styles & Tailwind directives
```

---

## 🛠 Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Escgot/Dr-Doudou-Bakes.git
    cd Dr-Doudou-Bakes
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch development server**:
    ```bash
    npm run dev
    ```

### Production Build

To create an optimized production bundle:
```bash
npm run build
```

---

## ☁️ Deployment

The project is optimized for deployment on **Vercel**. 

-   **Routing**: Custom rewrites are configured in `vercel.json` to support SPAs.
-   **Optimization**: Automatic image optimization and edge caching are supported.

---

## 🤝 Contact

For inquiries regarding **Retail** or **Foodservice** partnerships, please visit our [Contact Page](https://dr-doudou-bakes.vercel.app/contact) or reach out via:

-   **Website**: [dr-doudou-bakes.vercel.app](https://dr-doudou-bakes.vercel.app)
-   **Instagram**: [@drdoudoubakes](https://instagram.com/drdoudoubakes)

---

Developed for Dr Doudou Bakes.
