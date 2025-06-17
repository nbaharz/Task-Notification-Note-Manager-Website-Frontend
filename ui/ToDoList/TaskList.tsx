'use client';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { Task } from '@/types/types';
import { TaskItem } from './TaskItem';
import TaskSkeleton from './ToDoListSkeleton';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onOpenModal: (task: Task) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

export function TaskList({ 
  tasks, 
  isLoading, 
  onToggleComplete, 
  onDelete, 
  onOpenModal, 
  onDragEnd 
}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) {
    return (
      <div className="space-y-3 mt-4">
        {[...Array(3)].map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
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
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <motion.ul 
            layout={false}
            className="space-y-3 mt-4 pr-2 pb-2 relative"
            style={{
              maxHeight: tasks.length > 5 ? '350px' : 'none',
              overflowY: tasks.length > 5 ? 'auto' : 'hidden'
            }}
          >
            <AnimatePresence mode="popLayout">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onOpenModal={onOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        </SortableContext>
      </DndContext>
    </LayoutGroup>
  );
}