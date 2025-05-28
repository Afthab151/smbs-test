import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NoPage from "../pages/noPage/NoPage";

export default function Layout() {
  return (
    <Router>
      <div className="w-full">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
