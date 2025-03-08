import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authServiceInstance from "./appwrite/authservice.js"; // Adjust the path


function App() {
  const [count, setCount] = useState(0)
  // authServiceInstance.logout()
  // authServiceInstance.createAccount({email:"bawa6271i@gmail.com",password:"Ayush@7310",Name:"Ayush233"});
 async function func(){
  const x= await authServiceInstance.getCurrentUser();
  console.log(x);
  
 }
 func()

  
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react bg-red-400" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
