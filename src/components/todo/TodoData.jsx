const TodoData = ({props}) =>{
  // props là một object
  // {
  //   name: "eric",
  //   age: 25,
  //   data: {}
  // }
  // cach 1
  // const {name, age, data} = props;
  // cach 2:
  // const name = props.name;
  // const age = props.age;
  // const data = props.data;
console.log(">>> check props: ", props);
    return(
        <div className="todo-data">
          <div>My name is {name}</div>
        <div>Learning React</div>
        <div>Watching Youtube</div>
      </div>
    );
}
export default TodoData;