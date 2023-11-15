import { useState, useEffect } from "react";
import Square from "./components/Square";
import Modal from "./components/Modal";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(INITIAL_SCORES);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }

    checkForWinner();
  }, [gameState]);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWin = () => {
    openModal(`${currentPlayer} is Winner!`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  };

  const handleDraw = () => {
    openModal("Draw!");

    resetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 text-slate-800 bg-redyan-400">
      <h1 className="uppercase font-bold text-center text-5xl mb-4 font-display text-redyan-200">
        Tic Tac Toe
      </h1>
      <div className="mx-auto sm:w-96">
        <div className="grid grid-cols-3 gap-3 mx-auto">
          {gameState.map((player, index) => (
            <Square key={index} onClick={handleCellClick} {...{ index, player }} />
          ))}
        </div>

        <div className="text-xl sm:text-2xl text-serif mt-5">
          <p className="text-redyan-200">
            Next Player: <span>{currentPlayer}</span>
          </p>
          <p className="text-redyan-200 mt-3 sm:mt-5">
            Player X wins: <span>{scores["X"]}</span>
          </p>
          <p className="text-redyan-200 mt-3 sm:mt-5">
            Player O wins: <span>{scores["O"]}</span>
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} title="Game Result" onClose={closeModal}>
        <p className="text-redyan-200">{modalContent}</p>
      </Modal>
    </div>
  );
}

export default App;
