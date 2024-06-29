const TodoNew = (props) =>{
  console.log(">>> check point :",props);
  const {addNewTodo} = props;
  // addNewTodo("eric"); // fire
  const handleClick = () => {
    alert("Click Me");
  }

  const handleOnChange= (name) => {
  console.log(">>>handleOnChange ", name)
  }
    return(
        <div className="todo-new">
        <input type="text" 
        onChange={(event) => handleOnChange(event.target.value)}
        />
        <button style={{cursor:"pointer"}}
        onClick={handleClick}
        >Add</button>
      </div>
    );
}
export default TodoNew;