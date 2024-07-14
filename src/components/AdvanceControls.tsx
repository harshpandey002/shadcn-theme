'use client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import useThemeGenerator from '../hooks/useThemeGenerator';
import { cssVariables } from '@/lib/cssVariables';
import { useAtomValue } from 'jotai';
import { themeAtom } from '@/jotai/jotai';
import { hslToHex } from '@/lib/color/hslToHex';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Code } from 'lucide-react';

export default function AdvanceControls({
  onOpenCode,
}: {
  onOpenCode: () => void;
}) {
  const { handleAdvControls } = useThemeGenerator();
  const theme = useAtomValue(themeAtom);

  return (
    <Card className="sticky top-10">
      <CardHeader className="flex-row justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Advance Controls</CardTitle>
          <CardDescription className="italic text-destructive">
            Note: Updating basic controls will override these values
          </CardDescription>
        </div>

        <Button onClick={onOpenCode} className="w-max flex items-center gap-2">
          <Code size={18} />
          Code
        </Button>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-5 gap-4 w-full">
          {cssVariables.map((cssVar) => (
            <div className="flex items-center" key={cssVar}>
              <Label className="text-xs w-full" htmlFor="hue">
                {cssVar}
              </Label>
              <Input
                type="color"
                id={cssVar}
                className="ml-auto w-24 p-0 border-none bg-transparent"
                value={hslToHex(theme[cssVar])}
                onChange={handleAdvControls}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
