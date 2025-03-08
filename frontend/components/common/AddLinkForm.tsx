"use client";

import * as React from "react";
import { LucideIcon, Twitter, Link, Github, Heart, Coffee, PlusCircle } from "lucide-react";

interface AddLinkFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const iconOptions = [
  { icon: Twitter, label: "Twitter", bgColor: "bg-blue-400" },
  { icon: Github, label: "Github", bgColor: "bg-black" },
  { icon: Heart, label: "Heart", bgColor: "bg-blue-300" },
  { icon: Coffee, label: "Coffee", bgColor: "bg-yellow-400" },
  { icon: Link, label: "Link", bgColor: "bg-purple-400" },
];

export function AddLinkForm({ onSubmit, onClose }: AddLinkFormProps) {
  const [formData, setFormData] = React.useState({
    title: "",
    subtitle: "",
    url: "",
    icon: iconOptions[0].icon,
    iconBgColor: iconOptions[0].bgColor,
    actionButton: {
      text: "Visit",
      variant: "primary" as "primary" | "secondary",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Automatically determine best size based on content
    const cols = formData.subtitle ? 2 : 1;
    const rows = formData.subtitle ? 2 : 1;

    onSubmit({
      ...formData,
      id: `card-${Date.now()}`,
      cols,
      rows,
      actionButton: {
        ...formData.actionButton,
        onClick: () => formData.url && window.open(formData.url, "_blank"),
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 text-zinc-200 p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add New Link</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Subtitle (optional)</label>
            <input
              type="text"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">URL</label>
            <input
              type="url"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Icon</label>
            <select
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
              onChange={(e) => {
                const selected = iconOptions[Number(e.target.value)];
                setFormData({
                  ...formData,
                  icon: selected.icon,
                  iconBgColor: selected.bgColor,
                });
              }}
            >
              {iconOptions.map((option, index) => (
                <option key={option.label} value={index}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Button Style</label>
            <select
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
              value={formData.actionButton.variant}
              onChange={(e) => setFormData({
                ...formData,
                actionButton: {
                  ...formData.actionButton,
                  variant: e.target.value as "primary" | "secondary"
                }
              })}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded"
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}