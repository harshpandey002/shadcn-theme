'use client';
import { Code, MoonStar, Settings2, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { HexColorPicker } from 'react-colorful';
import { Slider } from './ui/slider';
import useThemeGenerator from '../hooks/useThemeGenerator';
import { useAtom } from 'jotai';
import { themeAtom } from '@/jotai/jotai';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

export default function BasicControls({
  showAdvControls,
  setShowAdvControls,
  onOpenCode,
}: {
  showAdvControls: boolean;
  setShowAdvControls: Dispatch<SetStateAction<boolean>>;
  onOpenCode: () => void;
}) {
  const {
    applyTheme,
    color,
    saturation,
    lightness,
    modifyLightness,
    modifySaturation,
    isDarkMode,
    handleDarkmodeChange,
  } = useThemeGenerator();

  const [theme, setTheme] = useAtom(themeAtom);

  const handleRadiusChange = (radius: string) => {
    setTheme((prev) => ({
      ...prev,
      light: { ...prev.light, radius },
      dark: { ...prev.dark, radius },
    }));

    document.documentElement.style.setProperty(`--radius`, radius);
  };

  const triggerAdvControls = () => {
    setShowAdvControls((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <div className="w-full md:w-max">
        <Label className="text-xs" htmlFor="hex">
          Pick a color
        </Label>
        <HexColorPicker
          color={color}
          onChange={applyTheme}
          className="mt-1 h-[200px] bg-card rounded-lg"
        />
        <div className="mt-2">
          <Label className="text-xs" htmlFor="hex">
            Or enter a HEX value
          </Label>
          <Input
            id="hex"
            placeholder="e.g. #84D455"
            value={color}
            onChange={(e) => applyTheme(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1.5">
        <div className="w-full">
          <Label className="text-xs" htmlFor="saturation">
            Saturation
          </Label>
          <Slider
            value={[saturation]}
            onValueChange={modifySaturation}
            min={0}
            max={100}
            step={1}
            id="saturation"
            className="mt-2 w-full"
          />
        </div>
        <div className="w-full">
          <Label className="text-xs" htmlFor="lightness">
            Lightness
          </Label>
          <Slider
            value={[lightness]}
            onValueChange={modifyLightness}
            min={0}
            max={100}
            step={1}
            id="lightness"
            className="mt-2 w-full"
          />
        </div>
        <div className="w-full">
          <Label className="text-xs" htmlFor="radius">
            Radius
          </Label>
          <div id="radius" className="w-full flex justify-between gap-2 mt-2">
            {['0rem', '0.3rem', '0.5rem', '0.75rem', '1.0rem'].map((rad) => (
              <span
                key={rad}
                onClick={() => handleRadiusChange(rad)}
                className={cn(
                  'flex items-center justify-center text-sm h-8 flex-1 rounded-lg border border-border outline outline-transparent hover:bg-accent transition-colors cursor-pointer',
                  theme.light['radius'] === rad &&
                    'border-primary outline-1 outline-primary'
                )}
                aria-label={`Radius ${rad}`}>
                {rad.replace('rem', '')}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Label className="text-xs" htmlFor="mode">
            Mode
          </Label>
          <div id="theme" className="w-full flex gap-2 justify-start mt-2">
            {['light', 'dark'].map((mode) => (
              <span
                key={mode}
                onClick={() => handleDarkmodeChange(mode === 'dark')}
                className={cn(
                  'flex items-center justify-center gap-2 text-sm h-8 flex-1 rounded-lg border border-border outline outline-transparent hover:bg-accent transition-colors cursor-pointer',
                  isDarkMode === (mode === 'dark') &&
                    'border-primary outline-1 outline-primary'
                )}
                aria-label={`${mode} mode`}>
                {mode === 'light' ? (
                  <Sun className="h-5 w-5 mr-2" />
                ) : (
                  <MoonStar className="h-5 w-5 mr-2" />
                )}
                {mode}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Button
            variant="secondary"
            onClick={triggerAdvControls}
            className="w-full flex items-center gap-2">
            <Settings2 size={18} />
            {showAdvControls ? 'Hide ' : 'Show '}
            Advance Controls
          </Button>
          <Button
            onClick={onOpenCode}
            className="w-max flex items-center gap-2">
            <Code size={18} />
            Code
          </Button>
        </div>
      </div>
    </div>
  );
}
