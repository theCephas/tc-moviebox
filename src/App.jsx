import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

// import MovieBox from "./components/Home";
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/movies/:id" component={MovieBox} /> */}
      </Routes>
    </Router>
  )
}

export default App
