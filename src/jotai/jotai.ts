import { atom } from 'jotai';

const initialThemeValue = {
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
};

export const primaryColorAtom = atom('#2d629f');
export const saturationAtom = atom(20);
export const lightnessAtom = atom(100);

export const themeAtom = atom<{
  [key: string]: string;
}>(initialThemeValue);

export const darkModeAtom = atom(false);
