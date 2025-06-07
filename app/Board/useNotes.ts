import { useState, useEffect } from 'react';
import {Note} from '../../types/types';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>({ 
    title: '', 
    content: '', 
    pinned: false 
  });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() === '') return;
    
    setNotes([...notes, { 
      ...newNote, 
      pinned: true 
    }]);
    
    setNewNote({ 
      title: '', 
      content: '', 
      pinned: false 
    });
  };

  const deleteNote = (titleToDelete: string) => {
    setNotes(notes.filter(note => note.title !== titleToDelete));
    setSelectedNote(null);
  };

  const updateNote = () => {
    if (!selectedNote) return;
    
    setNotes(notes.map(note => 
      note.title === selectedNote.title ? selectedNote : note
    ));
  };

  const togglePin = (title: string) => {
    setNotes(notes.map(note =>
      note.title === title ? { ...note, pinned: !note.pinned } : note
    ));
  };

  return {
    notes,
    addNote,
    deleteNote,
    updateNote,
    togglePin,
    newNote,
    setNewNote,
    selectedNote,
    setSelectedNote
  };
}