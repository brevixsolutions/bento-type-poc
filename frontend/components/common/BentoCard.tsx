"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BentoCardProps {
  id: string;  // Add this new prop
  cols: number;
  rows: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionButton?: {
    text: string;
    onClick: () => void;
    variant: "primary" | "secondary";
  };
  extraContent?: React.ReactNode;
}

const getGridClasses = (cols: number, rows: number) => {
  const colSpanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  };

  const rowSpanClasses = {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
  };

  return `${colSpanClasses[cols as keyof typeof colSpanClasses]} ${
    rowSpanClasses[rows as keyof typeof rowSpanClasses]
  }`;
};

export function BentoCard({
  id,  // Add this
  cols,
  rows,
  icon: Icon,
  iconBgColor,
  iconColor = "white",
  title,
  subtitle,
  description,
  actionButton,
  extraContent,
}: BentoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        getGridClasses(cols, rows),
        "bg-gray-50 rounded-xl p-4 flex flex-col cursor-move touch-none",
        isDragging && "opacity-50 shadow-2xl scale-105",
        "transition-all duration-200 ease-out"
      )}
    >
      <div className="flex items-center mb-2">
        <div
          className={`w-8 h-8 rounded-md ${iconBgColor} flex items-center justify-center mr-3`}
        >
          <Icon className={`w-5 h-5 text-${iconColor}`} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}

      {actionButton && (
        <button
          className={`mt-auto ${
            actionButton.variant === "primary"
              ? "bg-blue-400 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          } rounded-full py-1 px-4 text-sm self-start`}
          onClick={actionButton.onClick}
        >
          {actionButton.text}
        </button>
      )}

      {extraContent}
    </div>
  );
}
