import { useAtom } from 'jotai';
import {
  darkModeAtom,
  lightnessAtom,
  primaryColorAtom,
  saturationAtom,
  themeAtom,
} from '@/jotai/jotai';
import { applyThemeColors } from '@/lib/applyThemeColors';
import { useDebounce } from './useDebounce';
import { hexToHsl } from '@/lib/color/hexToHsl';

type HslProp = {
  h?: number;
  s?: number;
  l?: number;
};

type ConfigProp = {
  sFixed?: number;
  lFixed?: number;
  sMin?: number;
  lMin?: number;
  sMax?: number;
  lMax?: number;
};

export default function useThemeGenerator() {
  const [color, setColor] = useAtom(primaryColorAtom);
  const [saturation, setSaturation] = useAtom(saturationAtom);
  const [lightness, setLightness] = useAtom(lightnessAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

  const radius = theme.light.radius || '1.0rem';

  const debouncedSetTheme = useDebounce(setTheme, 400);

  function applyTheme(baseHex: string) {
    setColor(baseHex);
    generateAndApplyTheme(baseHex, isDarkMode);
  }

  function modifySaturation(sat: number[]) {
    setSaturation(sat[0]);
    generateAndApplyTheme(color, isDarkMode);
  }

  function modifyLightness(lig: number[]) {
    setLightness(lig[0]);
    generateAndApplyTheme(color, isDarkMode);
  }

  const handleDarkmodeChange = (mode: boolean) => {
    setIsDarkMode(mode);
    generateAndApplyTheme(color, mode);
  };

  const generateAndApplyTheme = (baseHex: string, isDarkMode: boolean) => {
    const lightTheme = generateLightColors(baseHex);
    const darkTheme = generateDarkColors(baseHex);
    debouncedSetTheme({
      light: lightTheme,
      dark: darkTheme,
    });

    if (isDarkMode) {
      applyThemeColors(darkTheme);
    } else {
      applyThemeColors(lightTheme);
    }
  };

  const handleAdvControls = (e: any) => {
    const { h, s, l } = hexToHsl(e.target.value);
    const hsl = `${h} ${s}% ${l}%`;
    const mode = isDarkMode ? 'dark' : 'light';

    setTheme({
      ...theme,
      [mode]: {
        ...theme[mode],
        [e.target.id]: hsl,
      },
    });

    const cssVarName = `--${e.target.id}`;
    document.documentElement.style.setProperty(cssVarName, hsl);
  };

  function modifyColor(hsl: HslProp, config?: ConfigProp) {
    if (!config) {
      return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
    }

    let { h = 0, s = 0, l = 0 } = hsl;

    const { sFixed, lFixed, sMax, sMin, lMax, lMin } = config;

    if (sFixed != undefined && lFixed != undefined)
      return `${h} ${sFixed}% ${lFixed}%`;

    if (sMax != undefined && sMin != undefined)
      s = Math.min(sMax, Math.max(sMin, saturation));

    if (lMax != undefined && lMin != undefined)
      l = Math.min(lMax, Math.max(lMin, lightness));

    return `${Math.ceil(h)} ${Math.ceil(s)}% ${Math.ceil(l)}%`;
  }

  function generateLightColors(primaryColor: string): Record<string, string> {
    const hsl = hexToHsl(primaryColor);
    const { h, l } = hsl;

    const theme = {
      background: modifyColor(hsl, {
        sMin: 0,
        sMax: 100,
        lMin: 95,
        lMax: 100,
      }),
      foreground: modifyColor(hsl, { sMin: 0, sMax: 5, lMin: 0, lMax: 10 }),
      card: modifyColor(hsl, { sMin: 0, sMax: 50, lMin: 90, lMax: 100 }),
      'card-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 10,
        lMax: 15,
      }),
      popover: modifyColor(hsl, {
        sMin: 0,
        sMax: 100,
        lMin: 95,
        lMax: 100,
      }),
      'popover-foreground': modifyColor(hsl, {
        sMin: 95,
        sMax: 100,
        lMin: 0,
        lMax: 10,
      }),
      primary: modifyColor(hsl, {}),
      'primary-foreground': modifyColor(
        { h: 0 },
        { sFixed: 0, lFixed: l > 60 ? 0 : 100 }
      ),
      secondary: modifyColor(hsl, {
        sMin: 10,
        sMax: 30,
        lMin: 70,
        lMax: 90,
      }),
      'secondary-foreground': modifyColor({ h: 0 }, { sFixed: 0, lFixed: 0 }),
      muted: modifyColor(
        { h: h / 1.2 },
        { sMin: 10, sMax: 30, lMin: 85, lMax: 95 }
      ),
      'muted-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 35,
        lMax: 40,
      }),
      accent: modifyColor(
        { h: h / 1.2 },
        { sMin: 10, sMax: 30, lMin: 80, lMax: 90 }
      ),
      'accent-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 10,
        lMax: 15,
      }),
      destructive: modifyColor(
        { h: 0 },
        { sMin: 50, sMax: 100, lMin: 30, lMax: 50 }
      ),
      'destructive-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 90,
        lMax: 100,
      }),
      border: modifyColor(hsl, { sMin: 20, sMax: 30, lMin: 50, lMax: 82 }),
      input: modifyColor(hsl, { sMin: 20, sMax: 30, lMin: 18, lMax: 50 }),
      ring: modifyColor(hsl, {}),
      radius,
    };

    return theme;
  }

  function generateDarkColors(primaryColor: string) {
    const hsl = hexToHsl(primaryColor);
    const { h, l } = hsl;

    const theme = {
      background: modifyColor(hsl, {
        sMin: 10,
        sMax: 50,
        lMin: 5,
        lMax: 10,
      }),
      foreground: modifyColor(hsl, { sMin: 0, sMax: 5, lMin: 90, lMax: 100 }),
      card: modifyColor(hsl, { sMin: 0, sMax: 50, lMin: 0, lMax: 10 }),
      'card-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 90,
        lMax: 100,
      }),
      popover: modifyColor(hsl, {
        sMin: 10,
        sMax: 50,
        lMin: 5,
        lMax: 5,
      }),
      'popover-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 90,
        lMax: 100,
      }),
      primary: modifyColor(hsl),
      'primary-foreground': modifyColor({ h: 0, s: 0, l: l > 60 ? 0 : 100 }),
      secondary: modifyColor(hsl, {
        sMin: 10,
        sMax: 30,
        lMin: 10,
        lMax: 20,
      }),
      'secondary-foreground': modifyColor({ h: 0, s: 100, l: 100 }),
      muted: modifyColor(
        { h: h / 1.2 },
        { sMin: 10, sMax: 30, lMin: 15, lMax: 25 }
      ),
      'muted-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 60,
        lMax: 65,
      }),
      accent: modifyColor(
        { h: h / 1.2 },
        { sMin: 10, sMax: 30, lMin: 15, lMax: 25 }
      ),
      'accent-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 90,
        lMax: 95,
      }),
      destructive: modifyColor(
        { h: 0 },
        { sMin: 50, sMax: 100, lMin: 30, lMax: 50 }
      ),
      'destructive-foreground': modifyColor(hsl, {
        sMin: 0,
        sMax: 5,
        lMin: 90,
        lMax: 100,
      }),
      border: modifyColor(hsl, { sMin: 20, sMax: 30, lMin: 18, lMax: 50 }),
      input: modifyColor(hsl, { sMin: 20, sMax: 30, lMin: 18, lMax: 50 }),
      ring: modifyColor(hsl),
      radius,
    };

    return theme;
  }

  return {
    color,
    saturation,
    lightness,
    applyTheme,
    modifySaturation,
    modifyLightness,
    handleAdvControls,
    isDarkMode,
    handleDarkmodeChange,
  };
}
