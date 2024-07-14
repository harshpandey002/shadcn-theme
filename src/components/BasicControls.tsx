'use client';
import { FileJson, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { HexColorPicker } from 'react-colorful';
import { Slider } from './ui/slider';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import useThemeGenerator from '../hooks/useThemeGenerator';
import { useAtom } from 'jotai';
import { themeAtom } from '@/jotai/jotai';

export default function BasicControls({
  setShowAdvControls,
}: {
  setShowAdvControls: (ctr: boolean) => void;
}) {
  const {
    applyTheme,
    color,
    saturation,
    lightness,
    modifyLightness,
    modifySaturation,
  } = useThemeGenerator();

  const [theme, setTheme] = useAtom(themeAtom);

  const handleRadiusChange = (radius: string) => {
    setTheme((prev) => ({ ...prev, radius }));

    document.documentElement.style.setProperty(`--radius`, radius);
  };

  return (
    <div className="flex gap-4 mt-4">
      <div className="w-max">
        <HexColorPicker color={color} onChange={applyTheme} />
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
      <div className="flex flex-col flex-1 gap-4">
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
          <ToggleGroup
            id="radius"
            variant="outline"
            type="single"
            value={theme['radius']}
            onValueChange={handleRadiusChange}
            className="w-full flex justify-between mt-2">
            {['0', '0.3', '0.5', '0.75', '1.0'].map((rad) => (
              <ToggleGroupItem
                key={rad}
                className="flex-1 h-8 rounded-3xl border-border data-[state=on]:bg-transparent data-[state=on]:border-2"
                value={`${rad}rem`}
                aria-label={`Radius ${rad}`}>
                {rad}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="mt-auto flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowAdvControls(true)}
            className="w-full flex items-center gap-1">
            <Settings2 size={18} />
            Advance Controls
          </Button>
          <Button onClick={undefined} className="w-max flex items-center gap-1">
            <FileJson size={18} />
            Code
          </Button>
        </div>
      </div>
    </div>
  );
}
