'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Board {
  id: string;
  name: string;
  // Diğer board alanları
}

interface BoardContextType {
  boards: Board[];
  selectedBoard: Board | null;
  setSelectedBoard: (board: Board | null) => void;
  addBoard: (board: Board) => void;
  removeBoard: (id: string) => void;
  updateBoard: (board: Board) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within a BoardProvider");
  return context;
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const addBoard = (board: Board) => setBoards((prev) => [...prev, board]);
  const removeBoard = (id: string) => setBoards((prev) => prev.filter((b) => b.id !== id));
  const updateBoard = (updatedBoard: Board) =>
    setBoards((prev) => prev.map((b) => (b.id === updatedBoard.id ? updatedBoard : b)));

  return (
    <BoardContext.Provider value={{ boards, selectedBoard, setSelectedBoard, addBoard, removeBoard, updateBoard }}>
      {children}
    </BoardContext.Provider>
  );
}; 