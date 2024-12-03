import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-pattern bg-cover bg-center bg-fixed">
        <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 min-h-screen">
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8 animate-fadeIn">
              <CheckSquare className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Task Management Dashboard</h1>
            </div>
            
            <TaskForm />
            <TaskFilters />
            <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;