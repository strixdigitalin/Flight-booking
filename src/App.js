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
import "./Styles/Flights/bookingcard.css";
import "./Styles/Flights/footer.css";
import "./Styles/Flights/payment.css";
import "./Styles/Flights/orders.css";
import "./Styles/Flights/flightdetail.css";
import "./Styles/Login/login.css";
import "./Styles/Login/login.css";

// ------------------------------
import Header, { Header2 } from "./Components/Header";
import Navbar from "./Components/BookingCard";
import Home from "./Pages/Home";
import Flights from "./Pages/Flights";
import LoginPage from "./Pages/Authentication/Login";
import Booking from "./Pages/Booking/Booking";
import Footer from "./Components/Footer";
import FlightByOfferId from "./Pages/Flights/FlightsByOfferId";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useEffect, useState } from "react";
import PaymentSuccess, { PaymentFailed } from "./Pages/Payments/PaymentSuccess";
import DuffelPayment from "./Pages/Payments/CreatePayment";
import "@duffel/components/dist/CardPayment.min.css";
import FlightOffer2 from "./Pages/Flights/index2";
import { Preview } from "@mui/icons-material";
import PreviousOrders from "./Pages/Orders/PreviousOrders";
// ------------

//
let language = "en";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          heading1: "Enjoy The Experience Of",
          heading2: "In Your Budget",
          oneway: "One Way",
          roundtrip: "Round Trip",
          multicity: "Multi City",
          origin: "Origin",
          destination: "Destination",
          passengers: "Passengers",
          livesupport: "Live 24/7 Support",

          search: "Search",
          savemoney: "Save Money",
          freecancelation: "Free Cancelation",
          within24: "Within 24 Hours",
        },
      },
      es: {
        translation: {
          heading1: "Disfruta la experiencia de",
          heading2: "en tu presupuesto",
          oneway: "Un camino",
          roundtrip: "Ida y vuelta",
          multicity: "Multi ciudad",
          origin: "Origen",
          destination: "Destino",
          passengers: "pasajeras",
          search: "Buscar",
          livesupport: "Vive 24/7 Apoyo",
          savemoney: "Ahorrar dinero",
          freecancelation: "Cancelación Gratis",
          within24: "en 24 horas",
        },
      },
    },
    // lng: async () => await localStorage.getItem("language"), // if you're using a "en" detector, do not define the lng option
    lng: language, // if you're using a "en" detector, do not define the lng option
    fallbackLng: language,
    // fallbackLng: async () => await localStorage.getItem("language"),

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
function App() {
  const { t } = useTranslation();
  // const [language, setLanguage] = useState("en");
  const trans = t;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home trans={t} />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/flights/:origin/:destination/:departure_date/:cabin_class/:adult/:child/:stringify"
            element={
              <>
                <Header />
                <Flights />
              </>
            }
          />
          <Route
            path="/flights2/:flightdata"
            element={
              <>
                <Header />
                <FlightOffer2 />
              </>
            }
          />
          <Route
            path="/filghts-offer/:offerId"
            element={
              <>
                <Header />
                <FlightByOfferId />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <PreviousOrders />
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
          {/* <Route
            path="/payment"
            element={
              <>
                <Header />
                <DuffelPayment />
              </>
            }
          /> */}
          <Route
            path="/success/:orderId"
            element={
              <>
                <Header />
                <PaymentSuccess />
              </>
            }
          />
          <Route
            path="/cancel"
            element={
              <>
                <Header />
                <PaymentFailed />
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
