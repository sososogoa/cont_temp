import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import RoomsList from "./components/RoomsList";
import ReviewsList from "./components/ReviewsList";
import ReservationsList from "./components/ReservationsList";
import RoomDetail from "./components/RoomDetail";
import ReviewDetail from "./components/ReviewDetail";
import ReservationDetail from "./components/ReservationDetail";
import Naver from "./components/Naver";
import Home from "./components/Home";
import UsersList from "./components/UsersList";

const pageVariants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 50,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

const navVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const NavBar = () => {
  return (
    <motion.nav
      className="bg-white shadow-md p-4 mb-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto">
        <div className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/rooms"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              호실 목록
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/users"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              유저 목록
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/reviews"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              리뷰 목록
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/reservations"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              예약 목록
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/naver"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              로그인
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/home"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/naver"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Naver />
                </motion.div>
              }
            />
            <Route
              path="/rooms"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <RoomsList />
                </motion.div>
              }
            />
            <Route
              path="/users"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <UsersList />
                </motion.div>
              }
            />
            <Route
              path="/reviews"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ReviewsList />
                </motion.div>
              }
            />
            <Route
              path="/reservations"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ReservationsList />
                </motion.div>
              }
            />
            <Route
              path="/rooms/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <RoomDetail />
                </motion.div>
              }
            />
            <Route
              path="/reviews/room/:roomId"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ReviewDetail />
                </motion.div>
              }
            />
            <Route
              path="/reservations/:reservationId"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ReservationDetail />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
