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
      <div className="info-bar">
        World Generation Demo using <a href="https://windowai.io/" target="_blank">window.ai</a>
        <br />
        Generate environments and objects with natural language
        <br />
        MOUSE to look around and to throw balls
        <br />
        WASD to move and SPACE to jump
        <br />
        ESC to see your mouse
      </div>
      <GenerateInput />
      <div>
        <a className="code-button" target="_blank"
          href="https://github.com/zoan37/world-generation-demo"
          title="View source code on GitHub">
          <img src="/svg/ic_code_black_24dp.svg" />
        </a>
      </div>
    </>
  )
}

export default App
