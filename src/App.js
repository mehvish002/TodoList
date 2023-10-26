import React, { useState, useEffect } from 'react';
import "./App.css";


const App = () => {
 
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);


 useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
 
}, [todos]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(editId){
      const editTodo=todos.find((i)=>i.id===editId);
      const updatedTodos=todos.map((t)=>
        t.id===editTodo.id
          ?(t={id:t.id,todo})
          :{id:t.id,todo:t.todo}
        );
        setTodos(updatedTodos);
        setEditId(0);
        setTodo("")
        return;
    }

    if(todo !== ""){
      setTodos([{ id: `$(todo)-${Date.now()}`,todo}, ...todos]);
      setTodo("")
    }
  };
  const clearAll=()=>{
    setTodos([]);
    localStorage.removeItem('todos');
  };


  const handleDelete=(id)=>{
    const delTodo=todos.filter((to)=>to.id !==id);
    setTodos([...delTodo]);
  };
  const handleEdit=(id)=>{
    const editTodo=todos.find((i)=>i.id===id);
    setTodo(editTodo.todo);
    setEditId(id)
  };
  return(
  <div className="App">
  <div className="container">
    <div className='title'>
    <h1>Todo List </h1>
    <img src="https://thumbs.dreamstime.com/b/to-do-list-black-icon-clipboard-checklist-vector-graphics-various-use-187733056.jpg" alt='img'></img>
    </div>
    <form className="todoForm" onSubmit={handleSubmit}>
      <input type="text"
      value={todo}
      onChange={(e)=>setTodo(e.target.value)} />
      <button type="submit">{editId?"Edit":"Add"}</button>
       
      </form>
      <h2>Work to be done</h2>
      

    <ul className="allTodos">
    {
      todos.map((t)=>(
        <li className="singleTodo">
          <span className="todoText" key={t.id}>{t.todo}</span>
         
          <button onClick={()=>handleEdit(t.id)}>Edit</button>
          <button onClick={()=>handleDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
    <button id='btn' onClick={clearAll}>Accomplished</button>
     
  </div>
  </div>
  );
};

export default App
