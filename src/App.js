import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Navbar from "./components/Navbar/Navbar";
import UserLogin from "./screens/UserLogin/UserLogin";
import DigitalGold from "./screens/DigitalGold/DigitalGoldRoutes";
import Dashboard from "./screens/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import ListPage from "./screens/test/test"

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000
        }}
      />
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/test" element={<ListPage />} />

        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/digitalGold/*" element={<DigitalGold />} />
        </Route>

        <Route path="*" element={<UserLogin />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
