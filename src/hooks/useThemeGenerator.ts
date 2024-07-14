import { useAtom } from 'jotai';
import {
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

  const debouncedSetTheme = useDebounce(setTheme, 400);

  function applyTheme(baseHex: string) {
    setColor(baseHex);
    generateThemeColors(baseHex);
  }

  function modifySaturation(sat: number[]) {
    setSaturation(sat[0]);
    generateThemeColors(color);
  }

  function modifyLightness(lig: number[]) {
    setLightness(lig[0]);
    generateThemeColors(color);
  }

  const handleAdvControls = (e: any) => {
    const { h, s, l } = hexToHsl(e.target.value);
    const hsl = `${h} ${s}% ${l}%`;

    setTheme({
      ...theme,
      [e.target.id]: hsl,
    });

    const cssVarName = `--${e.target.id}`;
    document.documentElement.style.setProperty(cssVarName, hsl);
  };

  function modifyColor(hsl: HslProp, config: ConfigProp) {
    let { h, s = 0, l = 0 } = hsl;

    const { sFixed, lFixed, sMax, sMin, lMax, lMin } = config;

    if (sFixed != undefined && lFixed != undefined)
      return `${h} ${sFixed}% ${lFixed}%`;

    if (sMax != undefined && sMin != undefined)
      s = Math.min(sMax, Math.max(sMin, saturation));

    if (lMax != undefined && lMin != undefined)
      l = Math.min(lMax, Math.max(lMin, lightness));

    return `${h} ${s}% ${l}%`;
  }

  function generateThemeColors(primaryColor: string) {
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
    };

    applyThemeColors(theme);
    debouncedSetTheme(theme);
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
  };
}
