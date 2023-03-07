// import logo from "./assets/logo-banner/flight logo.jpg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// ------------------
import "./Styles/autocomplete-input.css";
import "./Styles/departure.css";
import "./Styles/Flights/booking.css";
import "./Styles/font.css";
import "./Styles/home-offers.css";
import "./Styles/Flights/flightcomponent.css";
import "./Styles/Flights/footer.css";
import "./Styles/Flights/flightdetail.css";
import "./Styles/Login/login.css";
import "./Styles/Components/component.css";

// ------------------------------
import Header, { Header2 } from "./Components/Header";
import Navbar from "./Components/BookingCard";
import Home from "./Pages/Home";
import Flights from "./Pages/Flights";
import LoginPage from "./Pages/Authentication/Login";
import Booking from "./Pages/Booking/Booking";
import Footer from "./Components/Footer";

// ------------

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/flights/:origin/:destination/:departure_date/:cabin_calss"
            element={
              <>
                <Header />
                <Flights />
              </>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <>
                <Header />
                <Booking />
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
