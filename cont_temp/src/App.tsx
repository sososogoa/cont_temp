// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "./store/store";
// import { increment, decrement } from "./store/exampleSlice";
// import { motion } from "framer-motion";

// function App() {
//   const count = useSelector((state: RootState) => state.example.value);
//   const dispatch = useDispatch();

//   return (
//     <div className="w-full h-screen flex items-center justify-center space-x-4">
//       <motion.p
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="text-2xl font-bold"
//       >
//         Counter: {count}
//       </motion.p>

//       <motion.button
//         className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
//         onClick={() => dispatch(increment())}
//         whileTap={{ scale: 0.9 }}
//         whileHover={{ scale: 1.1 }}
//       >
//         +
//       </motion.button>

//       <motion.button
//         className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
//         onClick={() => dispatch(decrement())}
//         whileTap={{ scale: 0.9 }}
//         whileHover={{ scale: 1.1 }}
//       >
//         -
//       </motion.button>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RoomsList from "./components/RoomsList";
import ReviewsList from "./components/ReviewsList";
import ReservationsList from "./components/ReservationsList";
import RoomDetail from "./components/RoomDetail";
import ReviewDetail from "./components/ReviewDetail";
import ReservationDetail from "./components/ReservationDetail";
import Naver from "./components/Naver";
import Home from "./components/Home";
import UsersList from "./components/UsersList";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 mb-4">
          <div className="container mx-auto">
            <div className="flex space-x-4">
              {/* <Link
                to="/home"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                메인
              </Link> */}
              <Link
                to="/rooms"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                호실 목록
              </Link>
              <Link
                to="/users"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                유저 목록
              </Link>
              <Link
                to="/reviews"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                리뷰 목록
              </Link>
              <Link
                to="/reservations"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                예약 목록
              </Link>
              <Link
                to="/naver"
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                로그인
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/naver" element={<Naver />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/reviews" element={<ReviewsList />} />
            <Route path="/reservations" element={<ReservationsList />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/reviews/room/:roomId" element={<ReviewDetail />} />
            <Route
              path="/reservations/:reservationId"
              element={<ReservationDetail />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
