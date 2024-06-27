import './style.css';

// () => {}
// component = html + css + js
// JSX
const MyComponent = () => {
    // const hoidanit = "eric1"; // string
    // const hoidanit = 25; // number
    // const hoidanit = true;// boolean
    // const hoidanit = undefined;
    // const hoidanit = null;
    const hoidanit = [1,2,3];
    // const hoidanit = {
    //     name: 'hoidanit',
    //     age: 10
    // }
    return(
        <>
                <div>{console.log("eric")}</div>
                <div className=""> {JSON.stringify(hoidanit)} hhh</div>
                <div className='child' style={
                    {borderRadius: "10px"}
                }
                >child</div>

        </>
    );
}
export default MyComponent;
