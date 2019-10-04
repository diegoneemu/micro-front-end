import React, { useState, useReducer, FormEvent, Fragment } from "react";
import { Store, IState, IAction, ContextActions } from "../store/Store";

enum EActions {
  ADD = "ADD",
  DEL = "DEL"
}

interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  // load store
  const store: IState = React.useContext(Store);

  // reducer
  const reducer = (state: number, action: IAction): number => {
    switch (action.type) {
      case EActions.ADD:
        return ++state;
      case EActions.DEL:
        return --state;
      default:
        return state;
    }
  };

  // declare reducer
  const [count, dispatch] = useReducer(reducer, 0);

  // state
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  // fetch data
  const fetchUserData = async () => {
    const URL = "/user";
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: ContextActions.FETCH_USER,
      payload: dataJSON
    });
  };

  // handlers
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string) => {
    const newTodos: Array<ITodo> = [...todos, { text, complete: false }];
    setTodos(newTodos);
    dispatch({ type: EActions.ADD, payload: null });
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    dispatch({ type: EActions.DEL, payload: null });
  };

  return (
    <>
      <h1>Todo list of DC Universe Front End</h1>
      <p>Create todos for organize your life</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        <h2>List of Todos</h2>
        <h3>Total of todos: {count}</h3>
        <article>
          {todos.map((todo: ITodo, index: number) => (
            <Fragment key={index}>
              <div
                style={{
                  textDecoration: todo.complete ? "line-through" : ""
                }}
              >
                {todo.text}
              </div>
              <button type="button" onClick={() => completeTodo(index)}>
                {" "}
                {todo.complete ? "Incomplete" : "Complete"}{" "}
              </button>
              <button type="button" onClick={() => removeTodo(index)}>
                {" "}
                X{" "}
              </button>
            </Fragment>
          ))}
        </article>
      </section>
    </>
  );
}
