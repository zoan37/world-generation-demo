import { useEffect } from 'react'
import './App.css'
// @ts-ignore
import { startGenDemo } from "./gen_demo.js";
import GenerateInput from './GenerateInput.tsx';

function App() {
  useEffect(() => {
    startGenDemo();
  }, []);

  return (
    <>
      <GenerateInput />
    </>
  )
}

export default App
