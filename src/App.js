import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numbers] = useState(Array.from({ length: 90 }, (_, i) => i + 1));
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        const remainingNumbers = numbers.filter(n => !drawnNumbers.includes(n));
        if (remainingNumbers.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
          const newNumber = remainingNumbers[randomIndex];
          setCurrentNumber(newNumber);
          setShowAnimation(true);
          setTimeout(() => {
            setShowAnimation(false);
            setDrawnNumbers(prev => [...prev, newNumber]);
          }, 2000);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused, drawnNumbers, numbers]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetGame = () => {
    setDrawnNumbers([]);
    setCurrentNumber(null);
    setIsPaused(true);
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={togglePause}>
          {isPaused ? 'Iniciar Sorteio' : 'Pausar Sorteio'}
        </button>
        <button onClick={resetGame}>Reiniciar Jogo</button>
      </div>

      {showAnimation && currentNumber && (
        <>
          <div className="number-animation">
            <div className="current-number">{currentNumber}</div>            
          </div>
          <div className="fireworks">
            <div className="firework"></div>
            <div className="firework"></div>
            <div className="firework"></div>
            <div className="firework"></div>
          </div>
        </>
      )}

      <div className="bingo-grid">
        {numbers.map(number => (
          <div
            key={number}
            className={`number-circle ${drawnNumbers.includes(number) ? 'drawn' : ''}`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
