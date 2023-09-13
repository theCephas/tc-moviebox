import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

// import MovieBox from "./components/Home";
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={ <MovieDetails /> } />
        {/* <Route path="/movies/:id" component={MovieBox} /> */}
      </Routes>
    </Router>
  )
}

export default App
