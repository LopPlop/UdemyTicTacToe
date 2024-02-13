import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"; 
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";



const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]


let gameBoard = [...initialGameboard.map(array => [...array])]



const derivePlayerSymbol = (gameTurn) => {
  let currentSymbol = 'X';

      if(gameTurn.length > 0 && gameTurn[0].player === 'X')
      {
        currentSymbol = 'O'
      }
      return currentSymbol;
}




function App() {
  const [ players, setPlayers ] = useState({
    X : 'Player 1',
    O : 'Player 2'
  })
  const [ gameTurn, setGameTurn ]  = useState([])

  const playerSymbol = derivePlayerSymbol(gameTurn)

  let winner = null;

  for(const item of gameTurn){
    const {square, player} = item
    const {row, col } = square;

    gameBoard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  const onSelectSquare = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      const currentSymbol = derivePlayerSymbol(prevTurn)
      const updateTurn = [
        {
          square: {row: rowIndex, col: colIndex},
          player: currentSymbol
        }, 
        ...prevTurn,      
      ];

      return updateTurn;
    });
  }

  const handlePlayerNameChange = (playerSymbol, playerName) => {
    setPlayers((prevPlayers) => {
      return{
        ...prevPlayers, 
        [playerSymbol] : playerName
      }
    })
  }

  
  const handleRestart = () =>{
    setGameTurn([]);
    gameBoard = [...initialGameboard.map(array => [...array])]
  }

  return (
    <main>
      <div id="game-container">
         <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={playerSymbol === 'X'} onPlayerChangeName={handlePlayerNameChange}/>
            <Player initialName="Player 2" symbol="O" isActive={playerSymbol === 'O'} onPlayerChangeName={handlePlayerNameChange}/>
            <li></li>
         </ol>
         {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
         <GameBoard 
         onSelectSquare={onSelectSquare}
         board={gameBoard}
         />
      </div>
      <Log turn={gameTurn}/>
    </main>
  )
}

export default App
