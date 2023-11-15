import { Link } from "react-router-dom";
import createGame from '../createGame.png';
import Header from "../components/Header";

function Accueil() {
  return (
    <div className='min-h-screen'>
      <Header/>
      <div className="flex justify-between gap-10 mr-10 rounded rounded-tr-full bg-white overflow-hidden">
        <p className='font-bold uppercase text-7xl max-w-xl text-center'>Skateboarding is coming to the Olympic Games!</p>
        <div className="overflow-hidden">
          <img src={createGame} className=""></img>
        </div>
      </div>
      <div className='flex justify-end pr-10'>
        
      </div>
    </div>

  );
}

export default Accueil;