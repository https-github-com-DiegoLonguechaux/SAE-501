import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Accueil from './pages/Accueil.js';
import PageInfo from './pages/PageInfo.js';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import RegistrationSuccess from './pages/RegistrationSuccess';
import GamePage from './pages/GamePage';
import GameCreation from './pages/GameCreation';
import LogOut from './components/LogOut';
import AccountPage from './pages/AccountPage';
import MyThreeJSComponent from './components/MyThreeJSComponent';
import './fonts/paris-2024-font/Paris2024-Variable.ttf';
//gggggg
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/page-info" element={<PageInfo />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/signup-form" element={<SignUpForm />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/game-page" element={<GamePage />} />
        <Route path="/game-creation" element={<GameCreation />} />
        <Route path="/game-training" element={<MyThreeJSComponent />} />
        <Route path="/account" element={<AccountPage />} />
        <Route exact path="/game" render={() => {window.location.href="game.html"}} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
