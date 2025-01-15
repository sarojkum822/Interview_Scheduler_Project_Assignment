// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InterviewForm from "./components/InterviewForm";
import InterviewDashboard from "./components/InterviewDashboard";
import Notification from "./components/Notification";
import store from "../src/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import 'react-big-calendar/lib/css/react-big-calendar.css';

import SimpleCalendar from "./components/BigCalender";
import { IoMdArrowBack } from "react-icons/io";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className="w-full bg-white-300 p-4 shadow-md">
            <h1 className="text-3xl font-medium font-sans">Interview Scheduler</h1>
          </div>
          <Notification />  
            
          <Routes>
            <Route path="/form" element={<InterviewForm />} />
            <Route path="/" element={<InterviewDashboard />} />
            <Route path="/simplecalender" element={<SimpleCalendar />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default App;
