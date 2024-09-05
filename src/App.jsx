import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState('#ffffff'); // Set default color

  const onClick = async () => {
    // Get the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab?.id && color) {
      // Ensure that the chrome scripting API is used correctly
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          args: [color],
          func: (color) => {
            document.body.style.backgroundColor = color;
          }
        });
      } catch (error) {
        console.error('Error executing script:', error);
      }
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Background Color Picker</h1>
      <div className="card">
        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)} // Fix the target event
        />
        <button onClick={onClick}>
          Click me!
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
