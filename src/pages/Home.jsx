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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          Tic Tac Toe
        </h1>

        <div className="text-center mb-6">
          <div className="text-2xl font-semibold text-white mb-4">
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
                aspect-square rounded-lg text-5xl font-bold
                transition-all duration-200 transform hover:scale-105
                border-2 border-gray-600
                ${
                  cell === null && !gameOver
                    ? 'hover:bg-gray-700 cursor-pointer bg-gray-800 text-white border-gray-600'
                    : 'cursor-not-allowed bg-gray-900 text-white border-gray-700'
                }
                ${
                  winningLine.includes(index)
                    ? 'bg-gradient-to-br from-gray-700 to-gray-600 text-yellow-300 border-yellow-400 border-2'
                    : ''
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
          className="w-full bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-gray-600 transition-colors border border-gray-600"
        >
          Reiniciar Juego
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🐱 Gato siempre comienza primero</p>
        </div>
      </div>
    </div>
  )
}

export default Home
