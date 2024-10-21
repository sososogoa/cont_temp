import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { increment, decrement } from "./store/exampleSlice";

function App() {
  const count = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter : {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default App;
