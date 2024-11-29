import React from 'react';

function Todos({ todos, setTodos }) {
  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);

    fetch(`http://localhost:3000/completed`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => console.log('Todo marked as complete:', data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button onClick={() => handleComplete(todo._id)}>
            {todo.completed ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
