import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../types/task';
import { deleteTask, toggleTaskComplete, updateTask } from '../store/taskSlice';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleUpdate = () => {
    dispatch(
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-6 animate-slideIn border border-white/20">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded search-animation bg-white/90"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded search-animation bg-white/90"
        />
        <input
          type="datetime-local"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
          className="w-full mb-2 p-2 border rounded search-animation bg-white/90"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleUpdate}
            className="p-2 text-green-600 hover:text-green-800 edit-animation"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-red-600 hover:text-red-800 delete-animation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-6 animate-slideIn border border-white/20 ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTaskComplete(task.id))}
            className="mt-1 checkbox-animation"
          />
          <div>
            <h3
              className={`text-lg font-semibold transition-all duration-300 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Due: {format(parseISO(task.dueDate), 'PPp')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:text-blue-800 edit-animation"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-800 delete-animation"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}