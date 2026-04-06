const { useState, useEffect } = React;

const MOCK_DATA = [
  { id: 1, name: "דוד", score: 120, wins: 5 },
  { id: 2, name: "שרה", score: 95, wins: 3 },
  { id: 3, name: "יוסף", score: 80, wins: 2 },
  { id: 4, name: "מיכל", score: 110, wins: 4 }
];

const categories = ["ארץ", "עיר", "חיה", "צמח", "מאכל"];
const letters = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];

function App() {
  const [gameState, setGameState] = useState('landing'); // 'landing', 'playing', 'results'
  const [currentLetter, setCurrentLetter] = useState('א');
  const [timer, setTimer] = useState(60);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(MOCK_DATA);

  useEffect(() => {
    if (gameState === 'playing' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && gameState === 'playing') {
      setGameState('results');
    }
  }, [gameState, timer]);

  const startGame = () => {
    setGameState('playing');
    setTimer(60);
    setCurrentLetter(letters[Math.floor(Math.random() * letters.length)]);
    setAnswers({});
    setScore(0);
  };

  const handleAnswerChange = (category, value) => {
    setAnswers(prev => ({ ...prev, [category]: value }));
  };

  const submitAnswers = () => {
    const newScore = Object.values(answers).filter(a => a && a.startsWith(currentLetter)).length * 10;
    setScore(newScore);
    setGameState('results');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {gameState === 'landing' && (
        <div className="text-center bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Eretz-Ir</h1>
          <p className="text-xl mb-8 text-gray-300">משחק ארץ עיר בעברית - אתגר מילים בזמן אמת!</p>
          <button onClick={startGame} className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            התחל משחק
          </button>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">טבלת המובילים</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="min-w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="py-3 px-4 text-right">שם</th>
                    <th className="py-3 px-4 text-right">ניקוד</th>
                    <th className="py-3 px-4 text-right">ניצחונות</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map(player => (
                    <tr key={player.id} className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-4">{player.name}</td>
                      <td className="py-3 px-4">{player.score}</td>
                      <td className="py-3 px-4">{player.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {gameState === 'playing' && (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700 animate-slide-up">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">משחק פעיל</h2>
            <div className="text-2xl font-bold text-yellow-400">{timer} שניות</div>
          </div>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-400 mb-2">{currentLetter}</div>
            <p className="text-gray-300">הכנס מילים המתחילות באות זו:</p>
          </div>
          <div className="space-y-4">
            {categories.map(cat => (
              <div key={cat} className="flex items-center">
                <label className="w-24 text-lg font-medium">{cat}:</label>
                <input
                  type="text"
                  className="flex-grow bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="הכנס תשובה..."
                  value={answers[cat] || ''}
                  onChange={(e) => handleAnswerChange(cat, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button onClick={submitAnswers} className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            שלח תשובות
          </button>
        </div>
      )}
      {gameState === 'results' && (
        <div className="text-center bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">תוצאות המשחק</h2>
          <div className="text-5xl font-bold text-green-400 mb-6">{score} נקודות</div>
          <p className="text-xl text-gray-300 mb-8">האות הייתה: <span className="text-blue-400 font-bold">{currentLetter}</span></p>
          <button onClick={startGame} className="bg-gradient-to-r from-blue-500 to-indigo-400 hover:from-blue-600 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mr-4">
            משחק חדש
          </button>
          <button onClick={() => setGameState('landing')} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
            חזרה לדף הבית
          </button>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));