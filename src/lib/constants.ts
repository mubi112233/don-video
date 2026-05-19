/**
 * Global spacing constants matching React project with additional side spacing
 */

export const SPACING = {
  // Horizontal padding inside `container mx-auto` — matches frontend Services / sections
  container: "px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16",

  wrapper: "px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16",

  containerWithSpace: "px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16",
  
  // Side margins for sections
  sectionMargin: "mx-4 sm:mx-6 md:mx-6 lg:mx-10 xl:mx-12",
  
  // Side margins only
  sideMargin: "mx-4 sm:mx-6 md:mx-6 lg:mx-10 xl:mx-12",
  
  // Vertical padding for sections
  section: "py-8 sm:py-10 md:py-12 lg:py-14",
  
  // Max widths
  maxWidth: {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  },
} as const;
