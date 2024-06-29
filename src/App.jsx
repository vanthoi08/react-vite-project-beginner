import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import "./components/todo/todo.css"
import reactLogo from './assets/react.svg'
import { useState } from "react"
const App = () => {

  const [todoList,setTodoList] = useState([
    {id:1, name: "Learning React"},
    {id:2, name: "Watching Youtube"}
  ])
  const hoidanit = "Eric";
  const age = 25;
  const date ={
    address: "Ha Noi",
    country: "Viet Nam"
  }
  const addNewTodo = (name) => {
    alert(`call me ${name}`);
  }
// {key:value}
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew 
     addNewTodo = {addNewTodo}
      
      />
     <TodoData
     name={hoidanit}
     age={age}
     data={date}
     todoList={todoList}
     />
     <div className="todo-image">
      <img className="logo" src={reactLogo}/>
     </div>
    </div>
  )
}

export default App
