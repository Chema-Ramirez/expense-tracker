import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/expenses" element={<PrivateRoute>
          <Expenses />
        </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
