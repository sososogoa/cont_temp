import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { increment, decrement } from "./store/exampleSlice";
import { motion } from "framer-motion";

function App() {
  const count = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-screen flex items-center justify-center space-x-4">
      <motion.p
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold"
      >
        Counter: {count}
      </motion.p>

      <motion.button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
        onClick={() => dispatch(increment())}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        +
      </motion.button>

      <motion.button
        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
        onClick={() => dispatch(decrement())}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        -
      </motion.button>
    </div>
  );
}

export default App;
