import Header from '../components/Header';
import skateImage from '../skate.png';

function PageInfo() {
    return (
        <div className='min-h-screen'>
            <Header></Header>
            <div className="flex flex-row justify-between p-20 gap-10">
                <div>
                    <img src={skateImage}></img>
                </div>
                <div className="flex flex-col justify-between">
                    <p className='text-white text-2xl text-center'>Skateboarding, an emblematic sport of urban youth, is making its debut at the Paris Olympic Games in 2024, bringing a touch of creativity and daring to the competition. Skateboarders from around the world will come together to push the boundaries of the discipline, mixing technique, style and adrenaline in the Olympic spirit.</p>
                    <div className="flex justify-center">
                        <button className='bg-white px-12 py-4 text-2xl rounded-full'>Play now</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PageInfo;