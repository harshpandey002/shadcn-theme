import { atom } from 'jotai';

const initialThemeValue = {
  background: '',
  foreground: '',
  primary: '',
  'primary-foreground': '',
  secondary: '',
  'secondary-foreground': '',
  input: '',
  border: '',
  ring: '',
};

export const primaryColorAtom = atom('#ffffff');
export const saturationAtom = atom(80);
export const lightnessAtom = atom(20);

export const themeAtom = atom<{
  [key: string]: string;
}>(initialThemeValue);
