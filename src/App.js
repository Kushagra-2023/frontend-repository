import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import TrainData from './components/tp';
import Homepage from './components/homepage';
import Booking from './components/booking';
import StationList from './components/stations';
import Display from './components/viewhistory';
import Profile from './components/profile';
import ResponsiveAppBar from './components/navbar';
import Footer from './components/footer';
import { motion, AnimatePresence } from "framer-motion";

function LocationProvider({ children }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

const routeVariants = {
  initial: { opacity: 0 }, // Start with no opacity and slight downward movement
  animate: {
    opacity: 1, // Fully visible
    transition: {
      duration: 0.5, // Smooth transition duration
      ease: "easeInOut", // Smooth easing for both entry and exit
    },
  },
  exit: {
    opacity: 0, // Fade out
    transition: {
      duration: 0.5, // Faster exit duration
      ease: "easeIn", // Ease for a quicker exit
    },
  },
};


const transitionDuration = 1;

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route 
          path="/" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <Login />
            </motion.div>
          } 
        />
        <Route 
          path="signup" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <Signup />
            </motion.div>
          } 
        />
        <Route 
          path="tp" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <TrainData />
            </motion.div>
          } 
        />
        <Route 
          path="booking" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <Booking />
            </motion.div>
          } 
        />
        <Route 
          path="homepage" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <StationList />
            </motion.div>
          } 
        />
        <Route 
          path="history" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <Display />
            </motion.div>
          } 
        />
        <Route 
          path="profile" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <Profile />
            </motion.div>
          } 
        />
        <Route 
          path="*" 
          element={
            <motion.div 
              variants={routeVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              transition={{ duration: transitionDuration }}
            >
              <h2>404: Page Not Found</h2>
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();
  const noNavRoutes = ["/", "/signup"];

  return (
    <div className="App">
      <div style={{ minHeight: '80vh' }}>
        {!noNavRoutes.includes(location.pathname) && (
          <ResponsiveAppBar pages={["Book", "History"]} />
        )}
        <LocationProvider>
          <RoutesWithAnimation />
        </LocationProvider>
      </div>
      {!noNavRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
