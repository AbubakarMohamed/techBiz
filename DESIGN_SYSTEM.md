# Unified Design System

This document outlines the cohesive design patterns implemented across the website to ensure consistent spacing, typography, and layout structure.

## Core Components

### 1. Section Component (`/components/ui/Section.jsx`)
Provides consistent section structure and spacing:

```jsx
<Section background="white|gray|gradient|dark" padding="none|small|default|large" id="section-id">
  {children}
</Section>
```

**Background Options:**
- `white`: Pure white background
- `gray`: Light gray background (`bg-gray-50`)
- `gradient`: Blue-purple gradient (`bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40`)
- `dark`: Dark background (`bg-[#0f1724]`)

**Padding Standards:**
- `none`: No padding (`py-0`)
- `small`: Compact sections (`py-12 md:py-16`)
- `default`: Standard sections (`py-16 md:py-20`) 
- `large`: Prominent sections (`py-20 md:py-28`)

### 2. SectionHeader Component (`/components/ui/SectionHeader.jsx`)
Unified header structure for all sections:

```jsx
<SectionHeader
  //Badge Text"
  title="Main Section Title"
  subtitle="Supporting description text"
  badgeIcon={IconComponent}
  size="small|default|large"
  centered={true|false}
  gradient={true|false}
/>
```

**Typography Hierarchy:**
- **Small**: `text-2xl md:text-3xl` title, `text-sm md:text-base` subtitle
- **Default**: `text-3xl md:text-4xl` title, `text-base md:text-lg` subtitle
- **Large**: `text-4xl md:text-5xl` title, `text-lg md:text-xl` subtitle

## Implementation Examples

### Before (Inconsistent):
```jsx
// Different sections had varying structures
<section className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-14">
      <span className="inline-block font-semibold text-sm uppercase...">
        Badge Text
      </span>
      <h2 className="text-3xl md:text-4xl font-semibold...">
        Title
      </h2>
    </div>
  </div>
</section>
```

### After (Unified):
```jsx
// All sections now use consistent structure
<Section background="white" padding="default" id="section-id">
  <SectionHeader
    //Badge Text"
    title="Section Title"
    subtitle="Description"
    badgeIcon={IconComponent}
  />
  {/* Section content */}
</Section>
```

## Design Principles

### 1. Consistent Spacing
- **Section Padding**: Standardized vertical spacing using the Section component
- **Content Margins**: Consistent gaps between elements (mb-12, mb-16, mb-20)
- **Grid Gaps**: Uniform spacing in card layouts (gap-6, gap-8)

### 2. Typography Hierarchy
- **Badge Text**: `text-xs font-bold tracking-[0.25em] text-[#0f4c81] uppercase`
- **Main Titles**: `text-3xl md:text-4xl font-bold text-[#0f1724] leading-tight`
- **Subtitles**: `text-base md:text-lg text-gray-600 leading-relaxed`
- **Gradient Text**: Applied to key words using `bg-gradient-to-r from-[#0f4c81] to-purple-600`

### 3. Interactive Elements
- **Hover Animations**: Consistent scale and lift effects (`scale-[1.02]`, `y: -5`)
- **Badge Design**: Unified pill-shaped badges with consistent colors and spacing
- **Entrance Animations**: Staggered reveals using Framer Motion

### 4. Color Consistency
- **Primary Brand**: `#0f4c81` (Navy blue)
- **Secondary**: Purple gradients for accents
- **Text**: `#0f1724` for headings, `gray-600` for body text
- **Backgrounds**: Subtle gradients and clean whites

## Updated Components

### ✅ Implemented
1. **VisionSection** - Now uses Section + SectionHeader
2. **FeaturesSection** - Updated with unified components  
3. **SectionHeader Component** - Created with flexible props
4. **Section Component** - Created with background and padding variants

### 🔄 To Update
1. **ProductShowcase** - Apply Section wrapper and SectionHeader
2. **ServicesSection** - Unify header structure
3. **TestimonialsSection** - Standardize spacing
4. **ContactSection** - Apply consistent padding
5. **About page components** - Ensure all use unified system

## Benefits
- **Consistency**: All sections follow the same visual hierarchy
- **Maintainability**: Changes to spacing/typography happen in one place  
- **Performance**: Reusable components reduce bundle size
- **Developer Experience**: Clear patterns make development faster
- **User Experience**: Cohesive design creates better flow

## Usage Guidelines
1. Always wrap sections with the `Section` component
2. Use `SectionHeader` for all section titles and descriptions
3. Follow the established typography hierarchy
4. Maintain consistent spacing using the padding variants
5. Use gradient text sparingly for emphasis on key sections