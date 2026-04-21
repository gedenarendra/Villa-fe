import MainLayout from '../layouts/MainLayout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Showcase from '../components/sections/Showcase';
import Catalog from '../components/sections/Catalog';
import ScrollVelocity from '../assets/extend/ScrollVelocity';

const LandingPage = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Catalog />
      <Showcase />
      
      {/* Contact CTA Section */}
      <section className="py-40 bg-cream dark:bg-charcoal overflow-hidden transition-colors duration-500">
        {/* Full Width Scrolling Text */}
        <div className="mb-20">
          <ScrollVelocity
            texts={[' Ready to experience Nara? ']} 
            velocity={50}
            className="text-[2.5rem] md:text-[3.5rem] lg:text-[5.5rem] font-bold uppercase tracking-[-0.04em] text-charcoal dark:text-cream transition-colors duration-500"
            numCopies={4}
            damping={50}
            stiffness={400}
          />
        </div>

        {/* Centered Content */}
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-medium dark:text-white/60 text-lg mb-16 font-medium transition-colors duration-500">
            Join our exclusive community of property owners and travelers.
          </p>
          <button className="bg-charcoal dark:bg-cream text-white dark:text-charcoal px-16 py-5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-bronze dark:hover:bg-bronze dark:hover:text-white transition-all duration-500 rounded-full shadow-xl shadow-charcoal/10 dark:shadow-none">
            Inquire Now
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
