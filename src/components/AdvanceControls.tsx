'use client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import useThemeGenerator from '../hooks/useThemeGenerator';
import { cssVariables } from '@/lib/cssVariables';
import { useAtomValue } from 'jotai';
import { themeAtom } from '@/jotai/jotai';
import { hslToHex } from '@/lib/color/hslToHex';

export default function AdvanceControls({
  setShowAdvControls,
}: {
  setShowAdvControls: (ctr: boolean) => void;
}) {
  const { handleAdvControls } = useThemeGenerator();
  const theme = useAtomValue(themeAtom);

  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-10 w-full">
      {cssVariables.map((cssVar) => (
        <div className="flex items-center" key={cssVar}>
          <Label className="text-xs w-full" htmlFor="hue">
            {cssVar}
          </Label>
          <Input
            type="color"
            id={cssVar}
            className="ml-auto w-24"
            value={hslToHex(theme[cssVar])}
            onChange={handleAdvControls}
          />
        </div>
      ))}
      <div className="mt-auto flex gap-2">
        <Button
          variant="secondary"
          onClick={undefined}
          className="rounded-3xl w-full">
          Code
        </Button>
        <Button
          onClick={() => setShowAdvControls(false)}
          className="rounded-3xl">
          Close
        </Button>
      </div>
    </div>
  );
}
