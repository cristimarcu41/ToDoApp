import './App.css';
import React, {useState, useEffect} from 'react'
import TodoList from "./components/TodoList";
import Form from "./components/Form";

function App() {
    const [inputText, setInputText] = useState("")
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState('all')
    const [filteredTodos, setFilteredTodos] = useState([])
    useEffect(() => { getLocalTodos(); }, [])
    useEffect(() => { filterHandler(); saveLocalTodos(); }, [status, todos])

    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter((item) => item.completed === true))
                break
            case 'uncompleted':
                setFilteredTodos(todos.filter((item) => item.completed === false))
                break
            default:
                setFilteredTodos(todos)
                break
        }
    }

    const saveLocalTodos = () => {localStorage.setItem('todos', JSON.stringify(todos))}

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {  localStorage.setItem('todos', JSON.stringify([]))}
        else {
            let localTodo = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
            setTodos(localTodo)
        }
    }

    return (
        <div className="App">
            <header>
                <h1>TO DO List</h1>
            </header>
            <Form todos={todos}
                  setTodos={setTodos}
                  inputText={inputText}
                  setInputText={setInputText}
                  status={status}
                  setStatus={setStatus} />
            <TodoList todos={filteredTodos}
                      setTodos={setTodos} />

        </div>
    );
}

export default App;
