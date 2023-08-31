import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar" 
import Home from './screens/Home' 
import Search from './screens/Search' 
import Coins from './screens/Coins' 
import NotFound from './screens/NotFound'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>  
      <Route path="/navbar" element={<Search/>}/> 
      <Route path="/coin/:id" element={<Coins/>}/> 
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
