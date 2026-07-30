import React, { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const initialTasks = [
  { id: '1', title: 'Grade Midterm Papers', status: 'TODO', priority: 'HIGH' },
  { id: '2', title: 'Update Syllabus', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: '3', title: 'Department Meeting Prep', status: 'COMPLETED', priority: 'LOW' },
];

function SortableTask({ task }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors: any = {
    HIGH: 'text-red-400 bg-red-400/10',
    MEDIUM: 'text-orange-400 bg-orange-400/10',
    LOW: 'text-blue-400 bg-blue-400/10',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-gray-900 border border-gray-700 rounded-xl mb-3 cursor-grab active:cursor-grabbing hover:border-blue-500/50 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-gray-200 font-medium">{task.title}</h4>
      </div>
      <span className={`text-xs px-2 py-1 rounded-md font-medium ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
    </div>
  );
}

function Column({ id, title, tasks }: any) {
  return (
    <div className="flex flex-col bg-gray-800 rounded-2xl p-4 border border-gray-700 w-full min-h-[500px]">
      <h3 className="text-gray-400 font-medium mb-4 flex justify-between items-center">
        {title} <span className="bg-gray-700 px-2 py-1 rounded-md text-xs">{tasks.length}</span>
      </h3>
      <SortableContext items={tasks.map((t: any) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1">
          {tasks.map((task: any) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    // Quick mocked drop logic for demonstration
    if (active.id !== over.id) {
      console.log(`Moved task ${active.id} to ${over.id}`);
      // Real logic requires array reordering based on column IDs
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
          CampusFlow
        </h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/tasks" className="text-blue-400 font-medium bg-blue-500/10 px-4 py-2 rounded-lg">Tasks Kanban</Link>
          <Link to="/calendar" className="text-gray-400 hover:text-white transition-colors">Smart Calendar</Link>
        </nav>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Task Management</h1>
              <p className="text-gray-400 text-sm">Drag and drop tasks across stages.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium">
              + Add Task
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Column id="TODO" title="To Do" tasks={tasks.filter(t => t.status === 'TODO')} />
              <Column id="IN_PROGRESS" title="In Progress" tasks={tasks.filter(t => t.status === 'IN_PROGRESS')} />
              <Column id="COMPLETED" title="Completed" tasks={tasks.filter(t => t.status === 'COMPLETED')} />
            </div>
          </DndContext>
        </motion.div>
      </main>
    </div>
  );
}
