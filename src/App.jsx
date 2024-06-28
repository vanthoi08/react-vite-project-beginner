import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import "./components/todo/todo.css"
import reactLogo from './assets/react.svg'
const App = () => {
  const hoidanit = "Eric";
  const age = 25;
  const date ={
    address: "Ha Noi",
    country: "Viet Nam"
  }
// {key:value}
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
     <TodoData 
     name={hoidanit}
     age={age}
     data={date}
     />
     <div className="todo-image">
      <img className="logo" src={reactLogo}/>
     </div>
    </div>
  )
}

export default App
