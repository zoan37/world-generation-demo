import { useEffect } from 'react'
import './App.css'
// @ts-ignore
import { startGenDemo } from "./gen_demo.js";

function App() {
  useEffect(() => {
    startGenDemo();
  }, []);

  return (
    <>
    </>
  )
}

export default App
