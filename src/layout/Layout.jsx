import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NoPage from "../pages/noPage/NoPage";



export default function Layout() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  return (
    <div className="min-h-[calc(100vh-8vh)] flex flex-col">
      <Router>
        {/* <div className="w-full h-auto flex-col items-center">
          <Header />
        </div> */}
        <div className="w-full">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
{/* 
        <div className="w-full h-auto">
          <Footer />
        </div> */}
      </Router>
    </div>
  );
}
