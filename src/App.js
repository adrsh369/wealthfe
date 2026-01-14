import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Navbar from "./components/Navbar/Navbar";
import UserLogin from "./screens/UserLogin/UserLogin";
import DigitalGold from "./screens/DigitalGold/DigitalGoldRoutes";
import Dashboard from "./screens/Dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/digitalGold" element={<DigitalGold />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Route>

        {/* <Route path="*" element={<Login />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
