import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import AddExpense from "./Components/AddExpense";
import AddIncome from "./Components/AddIncome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="addexpense" element={<AddExpense />} />
      <Route path="addincome" element={<AddIncome />} />
    </Routes>
  );
}

export default App;
