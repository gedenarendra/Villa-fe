# Design System: NORM INTERIOR (IMPLEMENTED)

## Color Palette (CSS Variables)
- **Primary Background**: Cream (#F7F7F6)
- **Secondary Background**: White (#FFFFFF)
- **Text Primary**: Deep Charcoal (#1A1A1A)
- **Text Secondary**: Medium Gray (#777777)
- **Navigation Accent**: White text
- **Hero/Featured Overlay**: rgba(0,0,0,0.2)

**Aesthetic**: Elegant clean minimalism with warm, inviting aesthetic. Maximum visual impact through photography and typography scale with minimal UI decoration.

## Typography (Satoshi Font Family)
- **Headings (Hero)**: 
  - Font: Satoshi Bold/Medium
  - Sizes: 3.5rem (sm) → 6rem (md) → 6rem (lg)
  - Leading: 0.9
  - Tracking: -0.04em (tighter)
  - Uppercase, 1-4 line breaks

- **Subheadings**: 
  - Font: Satoshi Medium/Bold
  - Sizes: 3-4rem (responsive)
  - Tracking: -0.04em

- **Body Text**: 
  - Font: Satoshi Regular/Medium
  - Size: 16px base → 18-20px in featured sections
  - Leading: 1.6-1.7
  - Color: text-gray

- **Navigation**: 
  - Font: Satoshi Medium
  - Size: 12px (xs)
  - Tracking: 0.1em (widest)
  - Uppercase
  - Color: White with hover opacity changes

## Layout & Spacing
- **Sections**: Full-width with max-w-[1440px] containers
- **Padding**: 24px-48px horizontal (responsive), 80-120px vertical
- **Section backgrounds**: Alternating white/cream
- **Hero**: 100vh full-height with positioned content
- **Multi-column layouts**: 1-column mobile, 2-column tablet/desktop
- **Image grids**: Aspect ratios 1:1 or 16:9, gap: 4-6 units

## Reusable Components

### Navigation Header
```html
<header class="absolute top-0 left-0 right-0 z-50 px-6 py-8 lg:px-12 flex justify-between items-center text-white">
  <a href="#" id="logo" class="font-medium text-sm tracking-widest uppercase w-1/4">Norm Interior</a>
  <nav class="hidden md:flex justify-center gap-12 font-medium text-xs tracking-widest uppercase w-2/4">
    <a href="#about" id="nav-about" class="hover:text-white/70 transition-colors">About Us</a>
    <a href="#projects" id="nav-projects" class="hover:text-white/70 transition-colors">Project</a>
    <a href="#contact" id="nav-contact" class="hover:text-white/70 transition-colors">Contact</a>
  </nav>
  <div class="flex justify-end gap-6 w-1/4">
    <button class="hover:text-white/70 transition-colors"><iconify-icon icon="lucide:search" width="20"></iconify-icon></button>
    <button class="hover:text-white/70 transition-colors"><iconify-icon icon="lucide:user" width="20"></iconify-icon></button>
    <button class="md:hidden" id="mobile-menu-btn"><iconify-icon icon="lucide:menu" width="20"></iconify-icon></button>
  </div>
</header>
```

### Hero Section with Large Typography
```html
<section class="relative h-[100vh] w-full flex flex-col justify-end pb-12 px-6 lg:px-12">
  <img src="..." alt="..." class="absolute inset-0 w-full h-full object-cover z-0">
  <div class="absolute inset-0 bg-black/20"></div>
  
  <div class="relative z-10 w-full text-white pb-4">
    <div class="flex flex-col lg:flex-row justify-between items-end gap-12">
      <h1 class="font-bold text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-[0.9] tracking-tighter uppercase lg:w-2/3">
        Crafting timeless<br>
        <span class="ml-0 md:ml-[10%]">designs for</span><br>
        <span class="ml-0 md:ml-[20%]">modern living</span>
      </h1>
      
      <div class="flex flex-col gap-8 lg:w-1/3 pb-2 lg:pl-12">
        <p class="text-base lg:text-[18px] text-white/90 font-medium leading-relaxed">
          We create architecture, interiors, and objects where simplicity meets warmth.
        </p>
      </div>
    </div>
  </div>
</section>
```

### Two-Column Featured Section (About/Journey)
```html
<section id="about" class="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
    <div class="order-2 lg:order-1">
      <h2 class="font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tighter uppercase mb-8">
        Our journey in design and craftsmanship
      </h2>
      <p class="text-gray text-lg lg:text-xl leading-relaxed mb-12 max-w-xl">
        We craft environments that honor context, light, and proportion, using natural materials and thoughtful details.
      </p>
      <a href="#" id="journey-link" class="group inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-charcoal hover:text-bronze transition-colors duration-300">
        Read our story <span class="group-hover:translate-x-2 transition-transform duration-300 ease-out">→</span>
      </a>
    </div>

    <div class="order-1 lg:order-2 grid grid-cols-2 gap-4 lg:gap-6">
      <img src="..." alt="..." class="w-full aspect-square object-cover">
      <img src="..." alt="..." class="w-full aspect-square object-cover mt-8 lg:mt-12">
      <img src="..." alt="..." class="w-full aspect-square object-cover -mt-8 lg:-mt-12">
      <img src="..." alt="..." class="w-full aspect-square object-cover">
    </div>
  </div>
</section>
```

### Project Showcase (Full-Width with Overlay)
```html
<section id="projects" class="pb-32 px-4 lg:px-8 max-w-[1800px] mx-auto">
  <div class="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
    <img src="..." alt="..." class="absolute inset-0 w-full h-full object-cover">
    <div class="absolute inset-0 bg-black/30"></div>
    
    <div class="absolute bottom-0 left-0 p-8 lg:p-16 text-white z-10 w-full">
      <div class="max-w-3xl">
        <h3 class="font-bold text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tighter uppercase mb-6">
          Let's create something timeless together
        </h3>
        <p class="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
          Transform your vision into reality with our expertise in contemporary interior design.
        </p>
        <a href="#contact" id="showcase-cta" class="group inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-white border-b border-white/30 pb-2">
          View Project Case <span class="group-hover:translate-x-2 transition-transform duration-300 ease-out">→</span>
        </a>
      </div>
    </div>
  </div>
</section>
```

### Features Grid (3-Column with Hover)
```html
<section class="py-24 lg:py-32 px-8 lg:px-16 bg-white">
  <div class="max-w-[1440px] mx-auto">
    <h2 class="font-bold text-4xl lg:text-5xl leading-[1.1] tracking-tighter uppercase mb-20 text-center">
      Shaping spaces with<br>visionary brands
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
      <div class="group">
        <div class="mb-6 overflow-hidden aspect-[4/3]">
          <img src="..." alt="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
        </div>
        <h4 class="font-bold text-xl uppercase tracking-wide mb-4">Frama Collection</h4>
        <p class="text-gray leading-relaxed">Elite collection from collaborators shaping visionary interiors and design.</p>
      </div>
      <!-- Repeat for each feature -->
    </div>
  </div>
</section>
```

### Footer with Dark Background
```html
<footer class="bg-charcoal text-white pt-24 pb-12 px-8 lg:px-16">
  <div class="max-w-[1440px] mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
      <div class="lg:col-span-2">
        <h2 class="font-bold text-3xl uppercase tracking-widest mb-6">Norm Interior</h2>
        <p class="text-white/60 max-w-sm leading-relaxed">
          Architecture, interiors, and objects designed with intention and crafted for timelessness.
        </p>
      </div>
      
      <div>
        <h5 class="text-xs font-bold tracking-widest uppercase mb-6">Office</h5>
        <address class="not-italic text-white/60 leading-loose">
          124 Design Avenue<br>Copenhagen, Denmark<br>1050 DK
        </address>
      </div>
      
      <div>
        <h5 class="text-xs font-bold tracking-widest uppercase mb-6">Connect</h5>
        <div class="flex flex-col gap-4 text-white/60">
          <a href="#" class="hover:text-white transition-colors w-fit">Instagram</a>
          <a href="#" class="hover:text-white transition-colors w-fit">Pinterest</a>
          <a href="#" class="hover:text-white transition-colors w-fit">LinkedIn</a>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
      <p>&copy; 2024 Norm Interior. All rights reserved.</p>
      <div class="flex gap-8 mt-4 md:mt-0">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

## Design Patterns

### Hero Section
```html
<section class="hero" style="background-image: url(...); background-size: cover; height: 100vh; position: relative;">
  <div class="hero-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.3);"></div>
  <nav style="position: absolute; top: 40px; left: 40px; color: white; font-weight: 600; letter-spacing: 1px;">
    <span>NORM INTERIOR</span>
  </nav>
  <nav class="nav-main" style="position: absolute; top: 40px; right: 40px; color: white; font-weight: 600; letter-spacing: 1px;">
    <a href="#">ABOUT US</a>
    <a href="#">PROJECT</a>
    <a href="#">CONTACT</a>
  </nav>
  <div class="hero-content" style="position: absolute; bottom: 80px; left: 40px; right: 40px; color: white;">
    <h1 style="font-size: 96px; font-weight: 700; line-height: 1.1; margin-bottom: 40px;">CRAFTING TIMELESS DESIGNS FOR MODERN LIVING</h1>
    <p style="font-size: 16px; line-height: 1.6; max-width: 600px;">We create architecture, interiors, and objects where simplicity meets warmth. Spaces that invite you to pause, feel, and live with intention.</p>
  </div>
</section>
```

### Featured Section (Two-Column Layout)
```html
<section style="background-color: #F5F1ED; padding: 100px 40px;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
    <div>
      <h2 style="font-size: 48px; font-weight: 700; line-height: 1.1; margin-bottom: 30px;">OUR JOURNEY IN DESIGN AND CRAFTSMANSHIP</h2>
      <p style="font-size: 16px; line-height: 1.7; color: #666; margin-bottom: 40px;">We craft environments that honor context, light, and proportion, using natural materials and thoughtful details to create spaces that feel effortless and quietly beautiful.</p>
      <a href="#" style="font-size: 12px; font-weight: 600; letter-spacing: 1px; color: #1A1A1A; text-decoration: underline;">ABOUT US →</a>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <img src="..." alt="..." style="width: 100%; aspect-ratio: 1; object-fit: cover;" />
      <img src="..." alt="..." style="width: 100%; aspect-ratio: 1; object-fit: cover;" />
      <img src="..." alt="..." style="width: 100%; aspect-ratio: 1; object-fit: cover;" />
      <img src="..." alt="..." style="width: 100%; aspect-ratio: 1; object-fit: cover;" />
    </div>
  </div>
</section>
```

### Project Showcase
```html
<section style="background-color: white; padding: 100px 40px;">
  <div style="position: relative; aspect-ratio: 16/9; overflow: hidden;">
    <img src="..." alt="..." style="width: 100%; height: 100%; object-fit: cover;" />
    <div style="position: absolute; bottom: 40px; left: 40px; color: white;">
      <h3 style="font-size: 32px; font-weight: 700; margin-bottom: 15px;">LET'S CREATE SOMETHING TIMELESS</h3>
      <p style="font-size: 14px; line-height: 1.6; max-width: 400px;">Transform your vision into reality with our expertise in contemporary interior design and spatial planning.</p>
      <a href="#" style="font-size: 12px; font-weight: 600; letter-spacing: 1px; color: white; margin-top: 20px; display: inline-block;">CONTACT US →</a>
    </div>
  </div>
</section>
```

### Features Grid
```html
<section style="background-color: #F5F1ED; padding: 80px 40px;">
  <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 60px; text-align: center;">SHAPING SPACES WITH VISIONARY BRANDS</h2>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">
    <div>
      <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">FRAMA</h4>
      <p style="font-size: 14px; line-height: 1.6; color: #666;">Elite collection from collaborators shaping visionary interiors and design.</p>
    </div>
    <!-- Repeat for each feature -->
  </div>
</section>
```

## Visual Characteristics
- **Photography**: Large, high-quality imagery dominating sections
- **Whitespace**: Extensive use of negative space for sophistication
- **Overlays**: Semi-transparent dark overlays on image backgrounds (rgba with ~0.3-0.4 opacity)
- **Borders**: Minimal, clean lines separating sections
- **Shadows**: Very subtle or none - clean, flat aesthetic
- **Aspect Ratios**: 1:1 for grid images, 16:9 for hero/featured content

## Interaction Patterns
- **Links**: Underlined with arrow indicators (→)
- **Navigation**: Minimal, uppercase, positioned fixed at top
- **Hover States**: Subtle color shifts or opacity changes (implied)
- **CTA Buttons**: Text-based with arrow, no background styling

## Design Philosophy
**"Elegant Clean Minimalism"** - This is a luxury interior design website that balances:
- Maximum visual impact through photography and typography scale
- Minimal UI elements and decoration
- Warm, inviting color palette (never cold)
- Generous breathing room between content blocks
- Focus on content over chrome
- Sophisticated restraint in interaction design