import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [useLetters, setUseLetters] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const allSymbols = '!@#$%^&*()_-+=<>?';
  const [selectedSymbols, setSelectedSymbols] = useState(
    allSymbols.split('').reduce((acc, symbol) => {
      acc[symbol] = true;
      return acc;
    }, {})
  );

  const handleUseSymbolsToggle = () => {
    const newValue = !useSymbols;
    setUseSymbols(newValue);
    setSelectedSymbols(
      allSymbols.split('').reduce((acc, symbol) => {
        acc[symbol] = newValue;
        return acc;
      }, {})
    );
  };

  const handleSymbolToggle = (symbol) => {
    const newSelectedSymbols = {
      ...selectedSymbols,
      [symbol]: !selectedSymbols[symbol]
    };
    setSelectedSymbols(newSelectedSymbols);
    setUseSymbols(Object.values(newSelectedSymbols).some(val => val));
  };

  const generatePassword = useCallback(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let characters = '';
    if (useSymbols) characters += Object.keys(selectedSymbols)
                                      .filter(symbol => selectedSymbols[symbol])
                                      .join('');
    if (useLetters) characters += letters;
    if (useNumbers) characters += numbers;

    // Check if all checkboxes are unset
    if (characters === '') {
        setPassword('');
        return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, useLetters, useNumbers, useSymbols, selectedSymbols]);  // <-- Add dependencies here

  useEffect(() => {
    generatePassword();
  }, [length, useLetters, useNumbers, useSymbols, selectedSymbols, generatePassword]);

  return (
    <div className="App">
      <h2>Password Generator</h2>
      <div>
        <label>
          Length: 
          <input
	    className="length-input"
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
            onChange={handleUseSymbolsToggle}
          />
        </label>
      </div>
      <div>
        <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
          Advanced Options
        </button>
      </div>

      {showAdvancedOptions && (
        <div>
          <table>
            <tbody>
              {allSymbols.split('').map((symbol, index) => {
                if (index % 3 === 0) {
                  return (
                    <tr key={index}>
                      {allSymbols.split('').slice(index, index + 3).map(s => (
                        <td key={s}>
                          <label>
                            {s}
                            <input
                              type="checkbox"
                              disabled={!useSymbols}
                              checked={selectedSymbols[s]}
                              onChange={() => handleSymbolToggle(s)}
                            />
                          </label>
                        </td>
                      ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      )}

      <button className="generate-btn" onClick={generatePassword}>Generate</button>
      <hr/>
      <div>
        <strong>Password:</strong> {password}
      </div>
    </div>
  );
}

export default App;

