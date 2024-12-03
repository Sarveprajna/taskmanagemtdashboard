import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';
import { isAfter, parseISO } from 'date-fns';

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending' | 'overdue';
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskComplete, setFilter, setSearchQuery } =
  taskSlice.actions;

export const selectFilteredTasks = (state: { tasks: TaskState }) => {
  const { tasks, filter, searchQuery } = state.tasks;
  const now = new Date();

  let filteredTasks = tasks;

  // Apply search filter
  if (searchQuery) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply status filter
  switch (filter) {
    case 'completed':
      return filteredTasks.filter((task) => task.completed);
    case 'pending':
      return filteredTasks.filter((task) => !task.completed);
    case 'overdue':
      return filteredTasks.filter(
        (task) => !task.completed && isAfter(now, parseISO(task.dueDate))
      );
    default:
      return filteredTasks;
  }
};

export default taskSlice.reducer;