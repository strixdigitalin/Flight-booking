// import logo from "./assets/logo-banner/flight logo.jpg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/BookingCard";
import Home from "./Pages/Home";
import Flights from "./Pages/Flights";
import "./Styles/autocomplete-input.css";
import "./Styles/departure.css";
import "./Styles/font.css";
import "./Styles/home-offers.css";
import "./Styles/Flights/flightcomponent.css";
import "./Styles/Flights/flightdetail.css";
import "./Styles/Login/login.css";
import LoginPage from "./Pages/Authentication/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </BrowserRouter>
      {/* <div className="App">
        <Navbar />
      </div> */}
    </>
  );
}

export default App;
