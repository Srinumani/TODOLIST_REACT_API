import { useEffect, useRef, useState } from "react";
import axios from 'axios';


function Todolist(){
    const [title,setTitle]=useState("");
    const [todos,setTodos]=useState([]);
    const titleRef=useRef(null);
    
// fetch the dummy data from the jsonplaceholder
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
          .then(response => {
            setTodos(response.data);
          })
          .catch(error => {
            console.error('Error fetching todos:', error);
          });
      }, []);

// for the refernce of title focus
    useEffect(()=>{
        titleRef.current.focus();
    },[])


// handlesubmit and add todos 
    function handleSubmit(event){
        event.preventDefault();
        setTodos([{title},...todos]);
        titleRef.current.focus();
        console.log(todos);
        setTitle("");
    }

// remove todo item  function
    function remove(id){
        setTodos(todos.filter((todo,index)=>id!==index));
    }

// update the Todo
    function update(id){
        setTodos(
            todos.map((todo, i) =>
                i === id ? { ...todo, checked: !todo.checked } : todo
            )
        );
    }

    
    return(
        <>
        
            <form className="form-container" onSubmit={handleSubmit}>
                <input  className="inputfield"  
                    value={title} 
                    ref={titleRef}
                    onChange={(e)=>setTitle(e.target.value)} 
                    placeholder="Enter Todo..." required/>
                <button className="btn">Add</button>
            </form>

            <div className="container">
            <ol >
                {todos.map((item,index)=>(
                    <li className= {item.checked ?"items1":"items"} key={index}  >
                        <input
                                type="checkbox"
                                checked={item.checked}
                                className="checkbox"
                                onChange={() => update(index)}
                            />
                          {item.title}
                        {item.checked &&<img src="https://cdn-icons-png.flaticon.com/128/190/190411.png" className="image2"/> }
                        <img src="https://cdn-icons-png.flaticon.com/128/12617/12617666.png"
                         className="image" onClick={()=>remove(index)}/>
                    </li>
                ))}
                 
                
            </ol>
        </div>

        
        </>
    )
}
export default Todolist;