import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import AddTransaction from "./pages/AddTransaction"
import Crud from "./pages/crud"
import AddCategory from "./pages/AddCategory/"
import TransactionModify from "./pages/TransactionModify";
import DeleteCategory from "./pages/DeleteCategory"
import Insights from "./pages/Insights"
import ProtectedRoute from "./components/ProtectedRoute"
import "./styles/styles.css"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete-category/"
          element={
            <ProtectedRoute>
              <DeleteCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-transactions"
          element={
            <ProtectedRoute>
              <Crud />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={

          <Login />

          } />
        <Route path="/register" element={

          <RegisterAndLogout />

          } />
        <Route path="/logout" element={<Logout />} />
        <Route path="/view-transaction/:id" element={<ProtectedRoute><TransactionModify /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path="/in" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
