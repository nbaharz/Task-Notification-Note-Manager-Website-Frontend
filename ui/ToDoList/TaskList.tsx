'use client';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { useToDo } from '@/app/context/ToDoContext';
import { useModal } from '@/app/context/ModalContext';
import { TaskItem } from './TaskItem';
import TaskSkeleton from './ToDoListSkeleton';
import { useState, useEffect } from 'react';
import { deleteTask as deleteTaskApi } from '@/app/api/TaskApi/DeleteTask';
import { useUser } from '@/app/context/UserContext';
import { updateTask as updateTaskApi } from '@/app/api/TaskApi/Update';

export function TaskList() {
  const { tasks, updateTask, removeTask, setSelectedTask } = useToDo();
  const { openModal } = useModal();
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [orderedTasks, setOrderedTasks] = useState(tasks);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setOrderedTasks(tasks);
    setIsMounted(true);
  }, [tasks]);

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task && token) {
      try {
        await updateTaskApi({ ...task, iscompleted: !task.iscompleted }, token);
        updateTask({ ...task, iscompleted: !task.iscompleted });
      } catch (e) {
        alert('Görev güncellenemedi.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      await deleteTaskApi(id, token);
      if (task.id) removeTask(task.id);
    } catch (e) {
      alert('Görev silinemedi.');
      console.error(e);
    }
  };

  const handleOpenModal = (task: any) => {
    setSelectedTask(task);
    openModal('taskDetail');
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedTasks.findIndex(t => t.id === active.id);
      const newIndex = orderedTasks.findIndex(t => t.id === over.id);
      const newTasks = arrayMove(orderedTasks, oldIndex, newIndex);
      setOrderedTasks(newTasks);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="space-y-3 mt-4">
        {[...Array(3)].map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (orderedTasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4 py-4">
        Bu tarih için görev bulunmuyor.
      </div>
    );
  }

  return (
    <LayoutGroup>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={orderedTasks.filter(task => !!task.id).map(task => task.id as string)}
          strategy={verticalListSortingStrategy}
        >
          <motion.ul 
            layout={false}
            className="space-y-3 mt-4 pr-2 pb-2 relative"
            style={{
              maxHeight: orderedTasks.length > 5 ? '350px' : 'none',
              overflowY: orderedTasks.length > 5 ? 'auto' : 'hidden'
            }}
          >
            <AnimatePresence mode="popLayout">
              {orderedTasks.filter(task => !!task.id).map((task, idx) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={() => handleToggleComplete(task.id!)}
                  onDelete={() => handleDelete(task.id!)}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        </SortableContext>
      </DndContext>
    </LayoutGroup>
  );
}