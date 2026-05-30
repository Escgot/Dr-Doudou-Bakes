import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Utensils, Building2, Coffee, Building, Store, ShoppingCart, TrendingUp, Package } from 'lucide-react';

export function Foodservice() {
  const restaurantTypes = [
    { icon: Building2, title: 'FULL SERVICE', description: 'Elevate your dessert menu with premium offerings that complement your cuisine.' },
    { icon: Coffee, title: 'FAST CASUAL', description: 'Quick-serve desserts that maintain quality and consistency.' },
    { icon: Utensils, title: 'QSR', description: 'Efficient dessert solutions for high-volume operations.' },
    { icon: Building, title: 'NON-COMMERCIAL', description: 'Reliable dessert options for institutions and organizations.' },
  ];

  const capabilities = [
    { title: 'MENU INNOVATION', description: 'Collaborate with our chefs to develop signature desserts that set your menu apart.' },
    { title: 'OPERATIONAL SUPPORT', description: 'Training and resources to ensure seamless integration into your kitchen workflow.' },
    { title: 'QUALITY ASSURANCE', description: 'Consistent quality and food safety standards you can trust.' },
    { title: 'CUSTOM SOLUTIONS', description: 'Tailored dessert programs designed for your specific needs.' },
  ];

  const insights = [
    { stat: '73%', description: 'of consumers say dessert enhances their dining experience' },
    { stat: '40%', description: 'higher profit margins on premium desserts' },
    { stat: '85%', description: 'of guests are more likely to return for dessert' },
  ];

  // Retail content merged into the Foodservice page (the separate /retail route is removed).
  const retailTypes = [
    { icon: Store, title: 'GROCERY', description: 'Premium desserts that drive basket size and customer loyalty.' },
    { icon: ShoppingCart, title: 'CLUB STORES', description: 'Value-packed desserts for warehouse club environments.' },
    { icon: Package, title: 'CONVENIENCE', description: 'Grab-and-go desserts for busy consumers.' },
    { icon: TrendingUp, title: 'SPECIALTY', description: 'Artisanal desserts for discerning shoppers.' },
  ];

  const retailBenefits = [
    { title: 'CATEGORY GROWTH', description: 'Our insights and innovation help drive category expansion and increased sales.' },
    { title: 'CONSUMER APPEAL', description: 'Desserts that attract new customers and increase purchase frequency.' },
    { title: 'OPERATIONAL EFFICIENCY', description: 'Thaw-and-serve solutions that minimize labor and waste.' },
    { title: 'BRAND RECOGNITION', description: 'Trusted brands that consumers know and love.' },
  ];

  const retailInsights = [
    { stat: '68%', description: 'of shoppers purchase dessert at least once a month' },
    { stat: '45%', description: 'higher basket size when dessert is included' },
    { stat: '3x', description: 'more likely to be an impulse purchase' },
  ];

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="bg-primary pt-8 lg:pt-12 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl z-20 -mb-24 lg:-mb-32 translate-y-12 lg:translate-y-20"
          >
            <img
              src="/images/desserts/premium-cake.jpg"
              alt="Premium dessert display"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-white font-serif text-4xl lg:text-6xl tracking-wide">
                  Foodservice
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-44 lg:pt-64 pb-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-8">
              Culinary Artistry to Elevate Your Dessert Menu
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              Partner with Dr Doudou Bakes to bring premium, chef-crafted desserts to your
              foodservice operation. Our thaw-and-serve solutions combine exceptional quality
              with operational efficiency, helping you delight guests while maximizing profitability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Restaurant Types */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
              Solutions for Every Segment
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
              From fine dining to quick service, we have solutions tailored to your operation.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {restaurantTypes.map((type, index) => (
              <StaggerItem key={index}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-2">
                    {type.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {type.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/desserts/culinary-artistry.jpg"
                  alt="Culinary artistry"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h3 className="text-primary font-serif text-2xl lg:text-4xl mb-6">
                How We Enhance Your Menu
              </h3>
              <div className="space-y-6">
                {capabilities.map((capability, index) => (
                  <div key={index}>
                    <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-1">
                      {capability.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {capability.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 lg:py-24 bg-accent-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-white font-serif text-3xl lg:text-4xl mb-4">
              Actionable Insights
            </h2>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl mx-auto">
              Data-driven insights to help you make informed decisions about your dessert program.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <p className="text-secondary font-serif text-5xl lg:text-6xl mb-2">
                    {insight.stat}
                  </p>
                  <p className="text-white/80 text-sm">
                    {insight.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
              Featured Products for Foodservice
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
              Explore our most popular desserts for foodservice operations.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: '/images/desserts/cheesecake.jpg', title: 'Premium Cheesecakes' },
              { image: '/images/desserts/cake-slice.webp', title: 'Layer Cakes' },
              { image: '/images/desserts/brownies.jpg', title: 'Brownies & Bars' },
            ].map((product, index) => (
              <StaggerItem key={index}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider">
                    {product.title}
                  </h4>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Retail (merged into Foodservice) */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-6">
              Premium Desserts That Drive Sales
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              Partner with Dr Doudou Bakes to bring the nation's most beloved dessert brands
              to your retail shelves. Our comprehensive portfolio, consumer insights, and
              operational support help you maximize category performance and customer satisfaction.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Retail Types */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
              Solutions for Every Channel
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
              From grocery to convenience, we have products and programs for every retail environment.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {retailTypes.map((type, index) => (
              <StaggerItem key={index}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-2">
                    {type.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {type.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Retail Benefits */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2}>
              <h3 className="text-primary font-serif text-2xl lg:text-4xl mb-6">
                Why Partner With Us
              </h3>
              <div className="space-y-6">
                {retailBenefits.map((benefit, index) => (
                  <div key={index}>
                    <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/desserts/single-serve.jpg"
                  alt="Retail desserts"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Retail Insights */}
      <section className="py-16 lg:py-24 bg-accent-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-white font-serif text-3xl lg:text-4xl mb-4">
              The Power of Dessert
            </h2>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl mx-auto">
              Dessert is a powerful driver of retail performance.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {retailInsights.map((insight, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <p className="text-secondary font-serif text-5xl lg:text-6xl mb-2">
                    {insight.stat}
                  </p>
                  <p className="text-white/80 text-sm">
                    {insight.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
              Featured Products for Retail
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
              Our top-performing retail products that drive sales and customer loyalty.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: '/images/desserts/seasonal-pie.jpg', title: 'Seasonal Pies' },
              { image: '/images/desserts/premium-cake.jpg', title: 'Premium Cakes' },
              { image: '/images/desserts/brownies.jpg', title: 'Brownie Platters' },
            ].map((product, index) => (
              <StaggerItem key={index}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider">
                    {product.title}
                  </h4>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-6">
              Ready to Elevate Your Dessert Menu?
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
              Let's discuss how Dr Doudou Bakes can support both your foodservice operation and retail goals with premium desserts and proven insights.
            </p>
            <Link to="/contact">
              <Button className="bg-pink text-white rounded-full px-8 py-3 hover:bg-pink-dark transition-colors duration-300">
                Contact Our Dessert Team
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
