import { atom } from 'jotai';

const initialThemeValue = {
  light: {
    background: '212 87% 95%',
    foreground: '212 5% 10%',
    card: '212 50% 90%',
    'card-foreground': '212 5% 15%',
    popover: '212 87% 95%',
    'popover-foreground': '212 95% 10%',
    primary: '212 56% 40%',
    'primary-foreground': '0 0% 100%',
    secondary: '212 30% 70%',
    'secondary-foreground': '0 0% 0%',
    muted: '174 30% 85%',
    'muted-foreground': '212 5% 35%',
    accent: '174 30% 80%',
    'accent-foreground': '212 5% 15%',
    destructive: '0 87% 30%',
    'destructive-foreground': '212 5% 90%',
    border: '212 30% 50%',
    input: '212 30% 24%',
    ring: '212 56% 40%',
    radius: '1.0rem',
  },
  dark: {
    background: '212 20% 10%',
    foreground: '212 5% 100%',
    card: '212 20% 10%',
    'card-foreground': '212 5% 100%',
    popover: '212 20% 5%',
    'popover-foreground': '212 5% 100%',
    primary: '212 56% 40%',
    'primary-foreground': '0 0% 100%',
    secondary: '212 20% 20%',
    'secondary-foreground': '0 100% 100%',
    muted: '177 20% 25%',
    'muted-foreground': '212 5% 65%',
    accent: '177 20% 25%',
    'accent-foreground': '212 5% 95%',
    destructive: '0 50% 50%',
    'destructive-foreground': '212 5% 100%',
    border: '212 20% 50%',
    input: '212 20% 50%',
    ring: '212 56% 40%',
    radius: '1.0rem',
  },
};

export const primaryColorAtom = atom('#2d629f');
export const saturationAtom = atom(20);
export const lightnessAtom = atom(100);

export const themeAtom = atom<{
  light: {
    [key: string]: string;
  };
  dark: {
    [key: string]: string;
  };
}>(initialThemeValue);

export const darkModeAtom = atom(false);
