import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-[var(--modal-overlay)]"
      onClick={() => onOpenChange(false)}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            "my-auto max-h-[calc(100dvh-2rem)] w-full min-h-0 max-w-md overflow-y-auto overscroll-contain bg-[var(--color-card)] p-6 shadow-xl",
            className,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
