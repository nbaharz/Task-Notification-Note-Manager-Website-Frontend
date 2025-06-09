import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/types';

const STORAGE_KEY = 'notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Omit<Note, 'pinned'>>({ 
    title: '', 
    content: '' 
  });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes) as Note[];
        setNotes(parsedNotes);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load notes');
      console.error('Error loading notes:', err);
      setIsLoading(false);
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      setError('Failed to save notes');
      console.error('Error saving notes:', err);
    }
  }, [notes]);

 const addNote = useCallback((note: Note) => {
  if (!note.title.trim()) {
    setError('Note title cannot be empty');
    return;
  }

  if (notes.some(n => n.title === note.title)) {
    setError('A note with this title already exists');
    return;
  }

  setError(null);
  setNotes(prev => [...prev, note]);
}, [notes]);

  const deleteNote = useCallback((titleToDelete: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.title !== titleToDelete));
    if (selectedNote?.title === titleToDelete) {
      setSelectedNote(null);
    }
  }, [selectedNote]);

  const updateNote = useCallback(() => {
    if (!selectedNote) {
      setError('No note selected for update');
      return;
    }

    if (!selectedNote.title.trim()) {
      setError('Note title cannot be empty');
      return;
    }

    setError(null);
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.title === selectedNote.title ? selectedNote : note
      )
    );
  }, [selectedNote]);

  const togglePin = useCallback((title: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.title === title ? { ...note, pinned: !note.pinned } : note
      )
    );
  }, []);
  return {
  notes,
  isLoading,
  error,
  addNote,             // ✅ parametreli hâl
  deleteNote,
  updateNote,
  togglePin,
  selectedNote,
  setSelectedNote,
  clearError: () => setError(null)
  };
}