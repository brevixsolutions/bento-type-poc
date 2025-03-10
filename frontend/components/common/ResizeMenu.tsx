"use client";

import { animate, motion, stagger } from "framer-motion";
import { useEffect } from "react";

interface ResizeOption {
  cols: number;
  rows: number;
  label: string;
}

const resizeOptions: ResizeOption[] = [
  { cols: 6, rows: 1, label: "Full Width" },
  { cols: 3, rows: 1, label: "Half Width" },
  { cols: 2, rows: 2, label: "Square" },
];

interface ResizeMenuProps {
  onResize: (cols: number, rows: number) => void;
  onClose: () => void;
  open: boolean;
}

export function ResizeMenu({ onResize, onClose, open }: ResizeMenuProps) {
  //   const staggerList = stagger(0.1, { startDelay: 0.25 });
  //   useEffect(() => {
  //     animate(
  //       "ul",
  //       {
  //         width: open ? 150 : 0,
  //         height: open ? 200 : 0,
  //         opacity: open ? 1 : 0,
  //       },
  //       {
  //         type: "spring",
  //         bounce: 0,
  //         duration: 0.4,
  //       }
  //     );
  //     animate(
  //       "li",
  //       open
  //         ? { opacity: 1, scale: 1, x: 0 }
  //         : { opacity: 0, scale: 0.3, x: -50 },
  //       {
  //         duration: 0.2,
  //         delay: open ? staggerList : 0,
  //       }
  //     );
  //   }, [open]);
  return (
    <div className="absolute bottom-3 w-[500px] bg-zinc-900/95 border border-zinc-800 rounded-xl p-3 flex gap-2">
      {resizeOptions.map((option) => (
        <button
          key={`${option.cols}x${option.rows}`}
          onClick={() => {
            onResize(option.cols, option.rows);
            onClose();
          }}
          className="flex-1 px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-200"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
