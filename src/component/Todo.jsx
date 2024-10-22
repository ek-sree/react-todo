import React,{useState, useEffect, useRef} from "react"
import {FaEdit} from 'react-icons/fa'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md"


const Todo = ()=>{

    const[todo, settodo] = useState("")
    const[todos, settodos] = useState([])
    const[edit, setedit] = useState(null)

    const inputRef = useRef(0)

    useEffect(()=>{
        inputRef.current.focus()
    })

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todo"));
        if (savedTodos && savedTodos.length > 0) {
            settodos(savedTodos); 
        }
    }, []);  


    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos));
    }, [todos]);


    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const addTodo=()=>{
        if(todo.trim()){
            if(edit !== null){
                const newTodo = [...todos]
                newTodo[edit].value = todo
                settodos(newTodo)
                setedit(null)
            }else{
                if(!duplicate){
                    settodos([...todos,{value:todo, status:false}])
                }else{
                    alert("this value is already exist")
                }
            }
            settodo('')
        }
}

const duplicate = todos.find((val)=>val.value===todo)

const onDone=(index)=>{
    const newTodo = [...todos]
    newTodo[index].status = !newTodo[index].status
    settodos(newTodo)
}

const onEdit = (index) => {
    setedit(index);
    settodo(todos[index].value);
};


const onDelete=(index)=>{
    const newTodo = [...todos]
    newTodo.splice(index,1)
    settodos(newTodo)
}

    return(
        <div className="todo">
            <div>
            <h2>Todo App</h2>
            <form onSubmit={handleSubmit}>
                <div className="form">
                <input type="text" value={todo} placeholder="Enter your text here!!" ref={inputRef} onChange={e=>settodo(e.target.value)}/>
                <button className="add-btn" title="click to add text" onClick={addTodo}>{edit !== null ? "Edit" :"Add"}</button>
                </div>
            </form>
            <div>
                    {todos.map((data, index)=>(
                <ul key={index}>
                    <li key={index} id={data.status ? "for-strike" :""}>{data.value}
                    <span>
                        <IoCheckmarkDoneCircle className="done" title="mark as completed" onClick={()=>onDone(index)}/>
                        <FaEdit className="edit"title="edit this" onClick={()=>onEdit(index)}/>
                        <MdDeleteSweep className="delete" title="Delete this" onClick={()=>onDelete(index)}/>
                    </span></li>
                    </ul>
                    ))}
            </div>
            </div>
        </div>
    )
}

export default Todo;