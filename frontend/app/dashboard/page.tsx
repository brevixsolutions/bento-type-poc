"use client";

import { BentoCard } from "@/components/common/BentoCard";
import LogoutButton from "@/components/common/LogoutButton";
import { Twitter, Github, Heart, Coffee, PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  closestCenter,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { AddLinkForm } from "@/components/common/AddLinkForm";
import { CommandMenu } from "@/components/common/CommandMenu";

export default function DashboardPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [socialCards, setSocialCards] = useState([
    {
      id: "1", // Add unique IDs to each card
      cols: 2,
      rows: 1,
      icon: Twitter,
      iconBgColor: "bg-blue-400",
      title: "Twitter",
      subtitle: "@eyeshreya",
      actionButton: {
        text: "Follow",
        onClick: () => window.open("https://twitter.com/eyeshreya", "_blank"),
        variant: "primary",
      },
    },
    {
      id: "2",
      cols: 2,
      rows: 1,
      icon: Github,
      iconBgColor: "bg-black",
      title: "Shreya Purohit",
      actionButton: {
        text: "Follow",
        onClick: () => {},
        variant: "secondary",
      },
    },
    // Add more card configurations...
  ]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Reduced from 10 to make it more responsive
        delay: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // Reduced from 250 to make it more responsive
        tolerance: 8,
      },
    })
  );
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // Add null check for over
    if (!over) return;

    if (active.id !== over.id) {
      setSocialCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        return newItems;
      });
    }
  };
  const handleAddLink = (newCard: any) => {
    setSocialCards((prev) => [...prev, newCard]);
  };

  return (
    <>
      <CommandMenu onAddLink={() => setShowAddForm(true)} />
      {showAddForm && (
        <AddLinkForm
          onSubmit={handleAddLink}
          onClose={() => setShowAddForm(false)}
        />
      )}
      <div className="flex flex-col md:flex-row md:gap-12">
        {/* Bio Section */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 md:sticky md:top-12 md:self-start md:w-1/4">
          <div className="w-32 h-32 md:w-40 md:h-40 relative mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B6kDMDRY4L1SKYbyhRvpIosRyjdAcC.png"
              alt="Profile Picture"
              className="rounded-full object-cover"
              width={160}
              height={160}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shreya Purohit</h1>
          <p className="text-gray-600 text-lg">Data Analyst</p>
  
          <LogoutButton />
        </div>
  
        {/* Cards Section */}
        <div className="md:w-3/4">
          <DndContext
            sensors={sensors}
            modifiers={[restrictToWindowEdges]}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            measuring={{
              droppable: {
                strategy: MeasuringStrategy.WhileDragging,
              },
            }}
          >
            <div className="hidden sm:grid grid-cols-6 gap-4 auto-rows-[100px]">
              <SortableContext
                items={socialCards.map((card) => card.id)}
                strategy={rectSortingStrategy}
              >
                {socialCards.map((card) => (
                  <BentoCard
                    key={card.id}
                    id={card.id}
                    cols={card.cols}
                    rows={card.rows}
                    icon={card.icon}
                    iconBgColor={card.iconBgColor}
                    title={card.title}
                    subtitle={card.subtitle}
                    actionButton={{
                      text: card.actionButton.text,
                      onClick: card.actionButton.onClick,
                      variant: card.actionButton.variant as
                        | "primary"
                        | "secondary",
                    }}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
          {/* Mobile view remains the same */}
        </div>
      </div>
    </>
  );
}
