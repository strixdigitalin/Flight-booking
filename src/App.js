import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import "../src/Style/header.css"
import Home from './Pages/home';

function App() {
  return (
    <div className="App">
    <Header/>
    <Home/>
    </div>
  );
}

export default App;
