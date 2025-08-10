'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Plus } from 'lucide-react';
import Navbar from '../components/navbar';

const API_URL =
  typeof window === 'undefined'
    ? 'http://backend:3001' 
    : 'http://localhost:3001'; 

interface Todo {
  id: number;
  title: string;
  userId: number;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/todos`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch todos');
        }

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [router]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTodoTitle }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create todo');
      }

      const newTodo = await res.json();
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTodoTitle('');
      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p>Loading your dashboard...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          </div>

          {error && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}
          
          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Add a new task..."
              className="text-black flex-grow appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="inline-flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="h-5 w-5" />
            </button>
          </form>

          <div className="space-y-3">
            {todos.length > 0 ? (
              todos.map(todo => (
                <div key={todo.id} className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                  <CheckCircle className="h-5 w-5 text-black mr-3" />
                  <span className="text-gray-800">{todo.title}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500">You have no tasks yet. Add one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
