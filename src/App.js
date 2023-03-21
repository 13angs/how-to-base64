import {Outlet} from 'react-router-dom';
import('./index.css');

function App() {
  return (
    <div>
      <div className='border'>
        <nav className='container mx-auto py-5'>
          <h1 className='text-xl font-black'>
            <a href='#/'>
              HowToBase64
            </a>
          </h1>
        </nav>
      </div>
      <div className='container mx-auto'>
        <div className='flex'>
          {/* drawer */}
          <div className='flex-initial w-64 border border-b h-full mt-3 px-3 py-3'>
            <div>
              <input className='w-full border'></input>
            </div>
            <div className='w-full py-3'>
              <ul>
                <li>
                  <a href='#/converting-video-to-image'>Converting video to image</a>
                </li>
              </ul>
            </div>
          </div>
          {/* content */}
          <div className='flex-1 border border-b mt-3 mx-3 py-3 px-3'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
