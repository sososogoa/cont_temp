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

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/rooms">호실 목록</Link>
            </li>
            {/* <li>
              <Link to="/reviews">리뷰 목록</Link>
            </li> */}
            {/* <li>
              <Link to="/reservations">예약 목록</Link>
            </li> */}
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/naver" element={<Naver />} />
          {/* 방 목록 */}
          <Route path="/rooms" element={<RoomsList />} />
          {/* 리뷰 목록 */}
          <Route path="/reviews" element={<ReviewsList />} />
          {/* 예약 목록 */}
          <Route path="/reservations" element={<ReservationsList />} />
          {/* 특정 방의 세부 정보 */}
          <Route path="/rooms/:id" element={<RoomDetail />} />
          {/* 특정 방의 리뷰 목록 */}
          <Route path="/reviews/room/:roomId" element={<ReviewDetail />} />
          {/* 특정 방의 예약 목록 */}
          <Route path="/reservations/:reservationId" element={<ReservationDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
