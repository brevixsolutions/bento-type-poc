"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Clipboard,
  Eye,
  MessageSquare,
  Settings,
  Sparkles,
  LayoutGrid,
} from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        setOpen(true);
        // Position the menu at the current mouse position
        if (buttonRef.current) {
          buttonRef.current.style.position = "absolute";
          buttonRef.current.style.left = `${mousePosition.x}px`;
          buttonRef.current.style.top = `${mousePosition.y}px`;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mousePosition]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          ref={buttonRef}
          className="fixed invisible"
          style={{ top: -100, left: -100 }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200 absolute"
        align="start"
      >
        <DropdownMenuItem className="text-zinc-400">
          <Clipboard className="mr-2 h-4 w-4" />
          <span>Add A link</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          <span>Show/Hide UI</span>
          <span className="ml-auto text-xs text-zinc-500">Ctrl+\</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Show/Hide comments</span>
          <span className="ml-auto text-xs text-zinc-500">Shift+C</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Cursor chat</span>
          <span className="ml-auto text-xs text-zinc-500">/</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Actions...</span>
          <span className="ml-auto text-xs text-zinc-500">Ctrl+K</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Plugins</span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <DropdownMenuItem>Plugin 1</DropdownMenuItem>
              <DropdownMenuItem>Plugin 2</DropdownMenuItem>
              <DropdownMenuItem>Plugin 3</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <LayoutGrid className="mr-2 h-4 w-4" />
          <span>Widgets</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
