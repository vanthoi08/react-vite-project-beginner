const TodoData = (props) =>{
  const {todoList,deleteTodo} = props;
const handleClickDelete = (id)=>{
  deleteTodo(id)
}
    return(
        <div className="todo-data">
          {todoList.map((item, index) =>{
            return (
              <div className={`todo-item ${index}`} key={item.id}>
                  <div>
                      {item.name}
                  </div>
                 <button 
                 style={{cursor:"pointer"}} 
                 onClick={() => handleClickDelete(item.id)}>Delete</button>
             </div>
            )
          })}
    
      </div>
    );
}
export default TodoData;