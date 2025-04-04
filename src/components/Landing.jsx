import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon as Balloon, Star, Trophy } from 'lucide-react';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8 flex items-center justify-center gap-4">
          <Balloon className="animate-bounce" size={48} />
          Balloon Pop
          <Balloon className="animate-bounce delay-100" size={48} />
        </h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-6">How to Play</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-white">
              <Balloon size={32} className="mb-2" />
              <p>Pop as many balloons as you can</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <Trophy size={32} className="mb-2" />
              <p>Score points for each pop</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <Star size={32} className="mb-2" />
              <p>Beat your high score</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/game')}
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-purple-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Landing;