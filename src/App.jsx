import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("")
  const [editing, setEditing] = useState(false);
  const [valueEdit, setValueEdit] = useState(-1)
  
  function handleInput(e){
    setTodo(e.target.value)
    console.log(todo);
  }

  function handleSubmit(e){
    e.preventDefault();
    if (todo !== ""){
      setTodos([...todos, 
        {
          id: todos.length + 1,
          text: todo.trim()
        }])
      setTodo("")
    }
  }

  function handleDeleteButton(id){
    const myArr = todos
    const indexToDelete = id
    myArr.splice(indexToDelete, 1)
    myArr.map((element, index)=>console.log(element.id = index+1))
    setTodos([...myArr])
    setValueEdit(-1)
    setEditing(false)
  }

  function handleEditButton(id){
    console.log("hello world");
    setEditing(true);
    setValueEdit(id);
    console.log(todos[id].text);
    setEditInput("")
  }

  const [editInput, setEditInput] = useState("")

  function handleEditInput(e){
    setEditInput(e.target.value)
  }

  function handleEditSubmit(e){
    e.preventDefault();
    if (editInput != ""){
      const myArr = todos;
      const indexToEdit = valueEdit
      myArr.splice(indexToEdit, 1)
      myArr.splice(indexToEdit, 0,
      {
        id: valueEdit + 1,
        text: editInput.trim()
      });
      setTodos([...myArr])
    }
  }

  function handleCancleButton(e){
    setEditing(false)
  }

  useEffect(()=> {console.log(todos)}, [todos])

  return (
    <>
      {editing ?
        <div className='container'>
          <form onSubmit={handleEditSubmit} className='form-container'>
            <h2>EDIT</h2>
            {valueEdit != -1 ? <h3>id {todos[valueEdit].id} : {todos[valueEdit].text}</h3>:<></>}
            <input onChange={handleEditInput} type="text" value={editInput}/>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button type='submit'>Update</button>
              <button onClick={handleCancleButton}>Cancle</button>
            </div>
          </form>
        </div>
        :
        <div className='container'>
          <form onSubmit={handleSubmit} className='form-container'>
            <h2> ADD TO-DO-LIST</h2>
            <input onChange={handleInput} type="text" value={todo}/>
            <button type='submit'>submit</button>
          </form>
        </div>
      }
      {(todos.length != 0) ? 
      <div className='todo-container'>
        <div className='todo'>
            {todos.map((todo, key)=>{
            return <div key={key} className='todo-item'>
                <h3> id {todo.id} : {todo.text} </h3>
                  <button onClick={() => handleDeleteButton(key)}>delete</button>
                  <button onClick={() => handleEditButton(key)}>Edit</button>
              </div>
            })}
        </div>  
      </div>      
      :
      <></>
      }
      

    </>
  )
}



export default App
