import { EventTheme } from '@/types';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const defaultThemes: Record<string, EventTheme> = {
  vibrant: {
    primaryColor: '#FF6B35',
    secondaryColor: '#F7931E',
    accentColor: '#FDC830',
    backgroundColor: '#FFFFFF',
    textColor: '#1A1A1A',
    fontFamily: 'bold',
    layout: 'two-column',
    gradientEnabled: true,
    gradientDirection: 'to-br'
  },
  ocean: {
    primaryColor: '#006BA6',
    secondaryColor: '#0496FF',
    accentColor: '#00D9FF',
    backgroundColor: '#F8FBFF',
    textColor: '#003049',
    fontFamily: 'modern',
    layout: 'single',
    gradientEnabled: true,
    gradientDirection: 'to-r'
  },
  sunset: {
    primaryColor: '#E63946',
    secondaryColor: '#F77F00',
    accentColor: '#FCBF49',
    backgroundColor: '#FFFCF9',
    textColor: '#2B2D42',
    fontFamily: 'elegant',
    layout: 'card',
    gradientEnabled: true,
    gradientDirection: 'to-b'
  },
  forest: {
    primaryColor: '#2D6A4F',
    secondaryColor: '#40916C',
    accentColor: '#74C69D',
    backgroundColor: '#F8FFF8',
    textColor: '#1B4332',
    fontFamily: 'modern',
    layout: 'minimal',
    gradientEnabled: false,
    gradientDirection: 'to-r'
  },
  neon: {
    primaryColor: '#D946EF',
    secondaryColor: '#8B5CF6',
    accentColor: '#06B6D4',
    backgroundColor: '#0F172A',
    textColor: '#F8FAFC',
    fontFamily: 'bold',
    layout: 'two-column',
    gradientEnabled: true,
    gradientDirection: 'to-br'
  }
};

export function getThemeStyles(theme: EventTheme) {
  const fontFamilies = {
    modern: 'ui-sans-serif, system-ui, sans-serif',
    elegant: 'ui-serif, Georgia, serif',
    bold: 'Impact, "Arial Black", sans-serif',
    playful: '"Comic Sans MS", "Marker Felt", cursive'
  };

  return {
    '--primary': theme.primaryColor,
    '--secondary': theme.secondaryColor,
    '--accent': theme.accentColor,
    '--background': theme.backgroundColor,
    '--text': theme.textColor,
    fontFamily: fontFamilies[theme.fontFamily]
  } as React.CSSProperties;
}
