'use client';

import AdvanceControls from './AdvanceControls';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

export default function EditTheme({
  showAdvControls,
  setShowAdvControls,
}: {
  showAdvControls: boolean;
  setShowAdvControls: (ctr: boolean) => void;
}) {
  return (
    <Sheet open={showAdvControls} onOpenChange={setShowAdvControls}>
      <SheetContent className="h-max max-w-[600px] sm:max-w-[600px] right-3 bottom-3 top-auto rounded-lg">
        <SheetHeader className="space-y-0 mb-2">
          <SheetTitle>Edit theme</SheetTitle>
          <SheetDescription>Advanced controls</SheetDescription>
        </SheetHeader>
        <AdvanceControls setShowAdvControls={setShowAdvControls} />
      </SheetContent>
    </Sheet>
  );
}
