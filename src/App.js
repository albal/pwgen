import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [useLetters, setUseLetters] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_-+=<>?';

    let characters = '';
    if (useLetters) characters += letters;
    if (useNumbers) characters += numbers;
    if (useSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  return (
    <div className="App">
      <h2>Password Generator</h2>
      <div>
        <label>
          Length: 
          <input 
            type="number" 
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Letters:
          <input 
            type="checkbox" 
            checked={useLetters}
            onChange={() => setUseLetters(!useLetters)}
          />
        </label>
      </div>
      <div>
        <label>
          Numbers:
          <input 
            type="checkbox" 
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
        </label>
      </div>
      <div>
        <label>
          Symbols:
          <input 
            type="checkbox" 
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
        </label>
      </div>
      <button onClick={generatePassword}>Generate</button>
      <hr/>
      <div>
        <strong>Password:</strong> {password}
      </div>
    </div>
  );
}

export default App;

