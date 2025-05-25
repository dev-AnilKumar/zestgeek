import { useState } from 'react';
import './App.css';
import TodoItem from './TodoItem';

function App() {
  const [activeTab, setactiveTab] = useState(0);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editinput, setEditInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      title: input,
      completed: false,
      important: false,
      archived: false,
      isEditing: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const updateTodo = (id, updates) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  function handleTabSelect(tabId) {
    return () => {
      setactiveTab(tabId);
    }
  };

  function handleEditInput(val) {
    setEditInput(val);
  }

  function handleEditSave(id) {
    if (!!editinput) {
      let newtodos = todos.map(item => {
        if (item.id === id) {
          item.title = editinput;
          item.isEditing = false;
        }
        return item
      });
      setEditInput("");
      setTodos(newtodos);
    } else {
      updateTodo(id, { isEditing: false })
    }
  };

  function handleEditProp(id) {
    let newtodos = todos.map(item => {
      if (item.id === id) {
        item.isEditing = true;
      } else {
        item.isEditing = false;
      }
      return item
    });
    setTodos(newtodos);
  }

  const importantTodos = todos.filter(todo => todo.important === true);
  const archivedTodos = todos.filter(todo => todo.archived === true);
  const allTodos = todos.filter(todo => todo.archived === false);

  return (
    <div className="app">
      <h1>📝 To-Do App</h1>

      <div className="input_box">
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task..."
        />
        <button className='btn' onClick={addTodo}>Add</button>
      </div>

      <div className='tabs'>
        <div onClick={handleTabSelect(0)} className={`tab ${activeTab === 0 ? "activetab" : ""}`}>
          <h5>All Todos</h5>
        </div>
        <div onClick={handleTabSelect(1)} className={`tab ${activeTab === 1 ? "activetab" : ""}`}>
          <h5>Important</h5>
        </div>
        <div onClick={handleTabSelect(2)} className={`tab ${activeTab === 2 ? "activetab" : ""}`}>
          <h5>Archived</h5>
        </div>
      </div>

      <hr />

      <div className="todo-list">
        {(activeTab === 0 ? allTodos : activeTab === 1 ? importantTodos : archivedTodos)?.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editval={editinput}
            editprop={handleEditProp}
            editChange={handleEditInput}
            onEdit={handleEditSave}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;


