import React, { FormEvent, useEffect, useReducer, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { IAction, IState, MFront, Store } from "../store/Store";

/* enum EActions {
  ADD = "ADD",
  DEL = "DEL"
} */

interface ITodo {
  text: string;
  complete: boolean;
}

const HomeComponent = (props: any) => {
  return <h1>DC Component!</h1>;
};

// about route component
const AboutComponent = (props: any) => {
  return <h1>Marvel Component!</h1>;
};

// contact route component
const ContactComponent = (props: any) => {
  return <h1>Star Wars Component!</h1>;
};

export default function App(): JSX.Element {
  // load store
  const store: IState = React.useContext(Store);

  // reducer
  const reducer = (state: MFront, action: IAction): MFront => {
    switch (action.type) {
      case "ADD":
        const mFront = action.payload;
        return { element: mFront, ...state };
      case "DEL":
        return { element: null, ...state };
      default:
        return state;
    }
  };

  // declare reducer
  const [mFront, dispatch] = useReducer(reducer, { element: null, id: "" });

  // state
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  // useEffect(() => {
  //   console.log("load core front end");
  //   import(`../../../../marvel-universe/client/src/components/App`).then(
  //     (module: any) => {
  //       dispatch({
  //         type: "ADD",
  //         payload: { element: module.default, id: "1234" }
  //       });
  //     }
  //   );
  // }, []);

  // fetch data
  /* const fetchUserData = async () => {
    const URL = "/user";
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: ContextActions.FETCH_USER,
      payload: dataJSON
    });
  }; */

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

  // import("../../../../dc-universe/client/src/index").then((module: any) => {
  //   let Component = module.Component;
  // });

  const routeProps: any = { render: null };

  routeProps.render = (props: any) => {
    console.log(`route props render`);
    const App = mFront.element;
    return <App {...props} />;
  };

  return (
    <>
      <h1>Core Front End</h1>
      <p>Create todos for organize your life in HQs Universe</p>
      <h2>Aqui vai ser o header de nível 2</h2>
      <div>
        Menu Bar
        <BrowserRouter>
          <Link to="/dc" onClick={useState()[1]}>
            DC
          </Link>
          <Switch>
            <Route exact path="/dc" {...routeProps} />
          </Switch>
        </BrowserRouter>
      </div>
      <div id="mFront">{}</div>
    </>
  );
}
