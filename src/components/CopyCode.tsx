import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CopyCode({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
      setHasCopied(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl outline-none">
        <DialogHeader>
          <DialogTitle>Theme</DialogTitle>
          <DialogDescription>
            Copy and paste the following code into your CSS file.
          </DialogDescription>
        </DialogHeader>
        <pre className="text-sm p-4 bg-muted rounded-lg relative">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setHasCopied(true);
            }}
            className="absolute right-4 top-2">
            {hasCopied ? (
              <CheckIcon className="mr-2 h-4 w-4" />
            ) : (
              <CopyIcon className="mr-2 h-4 w-4" />
            )}
            Copy
          </Button>
          ruke lauda
        </pre>
      </DialogContent>
    </Dialog>
  );
}