import { Link } from "react-router-dom";
import createGame from '../createGame.png';
import Header from "../components/Header";
import skateImage from '../skate.png';
import photoSkate from '../photo-skate2.jpg';

function Accueil() {
  return (
    <div className=''>
      <Header/>
      <div className="flex flex-row justify-between mr-10 rounded rounded-tr-[216px] bg-white overflow-hidden shadow-2xl">
        
        <div className="flex flex-col py-4 pl-4 gap-5 mx-16">  
          <p className='flex justify-center items-center text-center font-face-gm font-bold uppercase text-7xl max-w-xl'>Skateboarding is coming to the Olympic Games!</p>
        
          <div className="flex flex-row m-5 p-5 gap-10 border-l-[3px] border-black">
            <div>
                <img src={skateImage} width={220}></img>
            </div>
            <div className="flex justify-center items-center text-center max-w-lg">
              <p className=' text-lg text-center'>Skateboarding, an emblematic sport of urban youth, is making its debut at the Paris Olympic Games in 2024, bringing a touch of creativity and daring to the competition. Skateboarders from around the world will come together to push the boundaries of the discipline, mixing technique, style and adrenaline in the Olympic spirit.</p>
            </div>
          </div>

        </div>

        <div className="flex justify-end items-end m-4">
            <Link to="/login-form">
                <button className='bg-black text-white px-12 py-2 text-2xl rounded-full'>Play</button>
            </Link>
        </div>
        
        <div className="flex justify-end items-center">
          <img src={photoSkate} className="max-h-[640px] max-w-[420px]"></img>
        </div>
          
        

        
      </div>
    </div>

  );
}

export default Accueil;