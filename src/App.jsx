import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4} from "uuid";
import { TodoList } from "./components/TodoList";


const KEY = "todo.App.todos";


export function App () {

    const [todos, setTodos] = useState([{id: 1, task: "Tarea 1", completed:false}]);

    const todoTaskRed = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=> todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = () =>{
        const task = todoTaskRed.current.value;
        if ( task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}]
        })
        todoTaskRed.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo)=> !todo.completed)
        setTodos(newTodos);
    }
    return (
        <>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRed} type ="text" placeholder="Nueva Tarea"/>
        <button onClick={handleTodoAdd}>+</button>
        <button onClick={handleClearAll}>-</button>
        <br />
        <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </>
    )
}