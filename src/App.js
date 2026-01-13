import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
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
