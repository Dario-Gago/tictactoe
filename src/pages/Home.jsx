import React, { useState } from 'react'

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] }
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? '🐱' : '🐶'
    setBoard(newBoard)

    const result = calculateWinner(newBoard)
    if (result) {
      setGameOver(true)
    } else if (!newBoard.includes(null)) {
      setGameOver(true)
    } else {
      setIsXNext(!isXNext)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
  }

  const winnerInfo = calculateWinner(board)
  const winner = winnerInfo?.winner
  const winningLine = winnerInfo?.line || []
  const isDraw = !winner && !board.includes(null)

  const getStatus = () => {
    if (winner) {
      return `🎉 ¡Ganador: ${winner}!`
    } else if (isDraw) {
      return '🤝 ¡Empate!'
    } else {
      return `Turno: ${isXNext ? '🐱 Gato' : '🐶 Perro'}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tic Tac Toe
        </h1>

        <div className="text-center mb-6">
          <div className="text-2xl font-semibold text-gray-800 mb-4">
            {getStatus()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={gameOver || cell !== null}
              className={`
                aspect-square rounded-xl text-5xl font-bold
                transition-all duration-200 transform hover:scale-105
                ${
                  cell === null && !gameOver
                    ? 'hover:bg-gray-100 cursor-pointer'
                    : 'cursor-not-allowed'
                }
                ${
                  winningLine.includes(index)
                    ? 'bg-gradient-to-br from-yellow-300 to-yellow-400'
                    : 'bg-gray-50'
                }
                ${cell === '🐱' ? 'text-blue-600' : 'text-red-600'}
                shadow-md hover:shadow-lg
                disabled:opacity-75
              `}
            >
              {cell}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl
                     hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-xl"
        >
          🔄 Nuevo Juego
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🐱 Gato siempre comienza primero</p>
        </div>
      </div>
    </div>
  )
}

export default Home
