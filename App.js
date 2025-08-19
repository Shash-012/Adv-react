import { useState } from "react";

const ToDo = props =>{
    <tr>
        <td>
            <label>{props.id}</label>
        </td>
        <td>
            <input />
        </td>
        <td>
            <label>{props.createdAt}</label>
        </td>
    </tr>
};

function App() {
    const [todos, setTodos] = useState([{
        id: 'todo1',
        createdAt: '18:00',
    },{
        id: 'todo2',
        createdAt: '20:30',
    }])

    const reverseOrder = () => {
        // Reverse is a mutative operation, so we create a new array
        setTodos(prevTodos => [...prevTodos].reverse());
    }
    // [...prevTodos]: This is the spread syntax. It creates a shallow copy of the prevTodos array.
    //  This is crucial because React state should be treated as immutable; you should never modify it directly.
    // reverse(): This method reverses the order of the elements in the new array copy.

    return(
        <div>
            <button onClick={reverseOrder}>Reverse</button>
            <table>
                <tbody>
                    {todos.map((todo, index)=>(
                        <ToDo id={todo.id} createdAt={todo.createdAt} key={index}/>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}
// For each todos element, we create a new ToDo component, passing the id and createdAt as props.
// Index is used as a key, which is acceptable here since the list is static and does not change dynamically.


// The current code moves all other elements except the text field. this is one of the main problems of using the index as a key.
// when I reverse the order of the todos, the id and createdAt prop have changed.
//  But the key is still the same because I'm using the index.
//  Since it's the same, React is instructed to keep the internal state of that node. 
// That's why the input state from the todo is preserved.

// To solve this, we can keep key={todo.id} instead of key={index}.