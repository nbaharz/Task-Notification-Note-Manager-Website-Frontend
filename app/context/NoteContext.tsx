'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Note } from '@/types/types';

interface NoteContextType {
  notes: Note[];
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (note: Note) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error("useNote must be used within a NoteProvider");
  return context;
};

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("notes");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => setNotes((prev) => [...prev, note]);
  const removeNote = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id));
  const updateNote = (updatedNote: Note) =>
    setNotes((prev) => prev.map((n) => (n.id === updatedNote.id ? updatedNote : n)));

  return (
    <NoteContext.Provider value={{ notes, selectedNote, setSelectedNote, addNote, removeNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
}; 