import { useState } from "react";
import Modal from 'react-modal';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTodo = (todoText) => {
    setTodos([...todos, todoText]);
    setModalIsOpen(false);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="heading">
        <h1>TODO List</h1>
      </div>

      <input type="text" placeholder="Search..." onChange={handleSearchInputChange} />

      <button onClick={() => setModalIsOpen(true)}>Add a todo</button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="container">
        <h2>Add a todo</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const todoText = event.target.todoText.value;
            handleAddTodo(todoText);
          }}
        >
          <input type="text" name="todoText" placeholder="Enter a new todo" />
          <button type="submit">Submit</button>
        </form>
      </Modal>

      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
