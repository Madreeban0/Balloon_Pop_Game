import React, { useState, useEffect } from 'react';
import { CircleDot } from 'lucide-react';

function Game() {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [timeLeft, gameOver, score, highScore]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        const newBalloon = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 50),
          y: window.innerHeight,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 1,
          size: Math.random() * 20 + 40,
        };
        setBalloons((prev) => [...prev, newBalloon]);
      }, 1000);

      const animationFrame = requestAnimationFrame(animate);

      return () => {
        clearInterval(interval);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [gameOver]);

  const animate = () => {
    setBalloons((prev) =>
      prev
        .map((balloon) => ({
          ...balloon,
          y: balloon.y - balloon.speed,
        }))
        .filter((balloon) => balloon.y > -50)
    );
    if (!gameOver) {
      requestAnimationFrame(animate);
    }
  };

  const handlePop = (id) => {
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id));
    setScore((prev) => prev + 1);
  };

  const resetGame = () => {
    setScore(0);
    setBalloons([]);
    setGameOver(false);
    setTimeLeft(30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative overflow-hidden">
      <div className="fixed top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-10">
        <p className="text-2xl font-bold text-purple-600">Score: {score}</p>
        <p className="text-xl text-pink-600">Time: {timeLeft}s</p>
        <p className="text-lg text-orange-600">High Score: {highScore}</p>
      </div>

      {gameOver ? (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/90 p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Game Over!</h2>
            <p className="text-xl mb-2 text-pink-600">Final Score: {score}</p>
            <p className="text-lg mb-4 text-orange-600">High Score: {highScore}</p>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      ) : (
        balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute transition-transform cursor-pointer"
            style={{
              left: `${balloon.x}px`,
              top: `${balloon.y}px`,
              transform: `scale(${1 + Math.sin(Date.now() / 500) * 0.1})`,
            }}
            onClick={() => handlePop(balloon.id)}
          >
            <CircleDot
              size={balloon.size}
              className={`text-${balloon.color}-500 filter drop-shadow-lg transform hover:scale-110 transition-transform`}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Game;