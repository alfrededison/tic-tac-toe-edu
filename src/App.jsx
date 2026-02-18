import { useReducer, useEffect } from 'react'
import { gameReducer, initialState } from './gameReducer'
import { sounds, checkWinner, getRandomQuestion } from './utils'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'
import QuestionModal from './components/QuestionModal'
import VictoryModal from './components/VictoryModal'
import questionsData from './questions.json'

export default function App() {
    const [state, dispatch] = useReducer(gameReducer, {
        ...initialState,
        questions: questionsData
    })

    // ===== HANDLERS =====
    function handleStartGame(teamXName, teamOName) {
        sounds.click()
        dispatch({ type: 'START_GAME', payload: { teamXName, teamOName } })
    }

    function handleCellClick(index) {
        if (!state.gameActive) return
        if (state.board[index] !== null) return
        sounds.click()
        const question = getRandomQuestion(state.questions, state.usedQuestions)
        dispatch({ type: 'SELECT_CELL', payload: { cellIndex: index, question } })
    }

    function handleSelectAnswer(index) {
        dispatch({ type: 'SELECT_ANSWER', payload: index })
    }

    function handleTimerTick() {
        dispatch({ type: 'TICK_TIMER' })
    }

    function handleProcessAnswer(isCorrect) {
        const newBoard = [...state.board]
        const teamToMark = isCorrect
            ? state.currentTeam
            : state.currentTeam === 'X' ? 'O' : 'X'
        newBoard[state.selectedCell] = teamToMark

        const winResult = checkWinner(newBoard)
        const isDraw = !winResult && newBoard.every(c => c !== null)

        if (isCorrect) sounds.correct()
        else sounds.incorrect()

        if (winResult) {
            setTimeout(() => sounds.victory(), 300)
        }

        dispatch({
            type: 'PROCESS_ANSWER',
            payload: { isCorrect, winResult, isDraw },
        })
    }

    function handleReset() {
        sounds.click()
        dispatch({ type: 'RESET_GAME' })
    }

    function handleBackToSetup() {
        sounds.click()
        dispatch({ type: 'BACK_TO_SETUP' })
    }

    function handleTimeout() {
        sounds.timeout()
        handleProcessAnswer(false)
    }

    return (
        <>
            {state.screen === 'setup' && (
                <SetupScreen onStart={handleStartGame} />
            )}

            {state.screen === 'game' && (
                <GameScreen
                    state={state}
                    onCellClick={handleCellClick}
                    onReset={handleReset}
                    onBack={handleBackToSetup}
                />
            )}

            {state.modal === 'question' && state.currentQuestion && (
                <QuestionModal
                    question={state.currentQuestion}
                    currentTeam={state.currentTeam}
                    teamName={state.currentTeam === 'X' ? state.teamXName : state.teamOName}
                    timeRemaining={state.timeRemaining}
                    totalTime={state.totalTime}
                    selectedAnswer={state.selectedAnswer}
                    onSelectAnswer={handleSelectAnswer}
                    onConfirm={handleProcessAnswer}
                    onTimeout={handleTimeout}
                    onTick={handleTimerTick}
                />
            )}

            {state.modal === 'victory' && (
                <VictoryModal
                    winResult={state.winResult}
                    isDraw={state.isDraw}
                    teamXName={state.teamXName}
                    teamOName={state.teamOName}
                    teamXScore={state.teamXScore}
                    teamOScore={state.teamOScore}
                    onPlayAgain={handleReset}
                />
            )}
        </>
    )
}
