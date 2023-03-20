import('./index.css');

function App() {
  return (
    <div>
      <div className='border'>
        <nav className='container mx-auto py-5'>
          <h1 className='text-xl font-black'>HowToBase64</h1>
        </nav>
      </div>
      <div className='container mx-auto'>
        <div className='flex'>
          {/* drawer */}
          <div className='flex-initial w-64 border-x border-b h-full px-3 py-3'>
            <div>
              <input className='w-full border'></input>
            </div>
            <div className='w-full py-3'>
              <button>Hello world</button>
            </div>
          </div>
          {/* content */}
          <div className='flex-1'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
