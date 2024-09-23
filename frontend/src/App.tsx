import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Register from "./components/Register"

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
