// import logo from "./assets/logo-banner/flight logo.jpg";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import "./Styles/autocomplete-input.css";
import "./Styles/departure.css";
import "./Styles/font.css";
import "./Styles/home-offers.css";

function App() {
  return (
    <>
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ marginTop: "60px" }}>
          website is being deployed, it may take some time to fetch files.
        </p>
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          We will get back soon!!
        </a> */}
        {/* </header> */}
        <Header />
        <Navbar />
      </div>
    </>
  );
}

export default App;
