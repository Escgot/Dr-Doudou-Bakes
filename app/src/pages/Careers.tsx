import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Heart, Users, Sparkles, Award } from 'lucide-react';

export function Careers() {
  const values = [
    { icon: Heart, title: 'PASSION FOR DESSERT', description: 'We love what we do and it shows in every dessert we create.' },
    { icon: Users, title: 'COLLABORATIVE CULTURE', description: 'We work together, support each other, and celebrate success.' },
    { icon: Sparkles, title: 'INNOVATION MINDSET', description: 'We are always looking for better ways to do things.' },
    { icon: Award, title: 'EXCELLENCE IN EVERYTHING', description: 'We hold ourselves to the highest standards.' },
  ];

  const benefits = [
    'Competitive salary and benefits',
    'Health, dental, and vision insurance',
    '401(k) with company match',
    'Paid time off and holidays',
    'Professional development opportunities',
    'Employee discount on products',
    'Wellness programs',
    'Flexible work arrangements',
  ];

  const openings = [
    { title: 'Production Supervisor', location: 'Saint Paul, MN', department: 'Operations' },
    { title: 'Pastry Chef', location: 'Atlanta, GA', department: 'Culinary' },
    { title: 'Quality Assurance Manager', location: 'Salem, OR', department: 'Quality' },
    { title: 'Sales Representative', location: 'Remote', department: 'Sales' },
    { title: 'Marketing Coordinator', location: 'Saint Paul, MN', department: 'Marketing' },
    { title: 'Supply Chain Analyst', location: 'Saint Paul, MN', department: 'Operations' },
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
              src="/images/desserts/culinary-artistry.jpg"
              alt="Dessert team at work"
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
                  Careers
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
              Join Our Team
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              At Dr Doudou Bakes, we're more than a dessert company—we're a team of passionate
              individuals united by a love for creating extraordinary moments. If you're looking
              for a career where you can make a real impact, we'd love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
              These principles guide everything we do.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-2">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/desserts/trend-innovation.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h3 className="text-primary font-serif text-2xl lg:text-4xl mb-6">
                Benefits & Perks
              </h3>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                We believe in taking care of our team. That's why we offer a comprehensive
                benefits package designed to support your health, well-being, and career growth.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24 bg-accent-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-white font-serif text-3xl lg:text-4xl mb-4">
              Open Positions
            </h2>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl mx-auto">
              Explore current opportunities to join our team.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openings.map((job, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-2">
                    {job.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-1">
                    {job.location}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4">
                    {job.department}
                  </p>
                  <Link
                    to="/contact"
                    className="text-primary text-sm font-medium underline hover:no-underline"
                  >
                    Apply Now
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-6">
              Don't See the Right Fit?
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
              We're always looking for talented individuals to join our team. Send us your
              resume and let us know how you can contribute to our mission.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-white rounded-full px-8 py-3 hover:bg-primary-dark transition-colors duration-300">
                Submit Your Resume
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
