// ===== INITIAL STATE =====
export const initialState = {
    screen: 'setup',           // 'setup' | 'game'
    modal: null,               // null | 'question' | 'victory'
    questions: [],
    usedQuestions: [],
    currentQuestion: null,
    currentTeam: 'X',
    teamXName: 'Đội Đỏ',
    teamOName: 'Đội Xanh',
    teamXScore: 0,
    teamOScore: 0,
    board: Array(9).fill(null),
    selectedCell: null,
    selectedAnswer: null,
    timeRemaining: 0,
    totalTime: 0,
    gameActive: false,
    winResult: null,           // { winner, pattern } | null
    isDraw: false,
}

// ===== REDUCER =====
export function gameReducer(state, action) {
    switch (action.type) {

        case 'LOAD_QUESTIONS':
            return { ...state, questions: action.payload }

        case 'START_GAME':
            return {
                ...state,
                screen: 'game',
                teamXName: action.payload.teamXName,
                teamOName: action.payload.teamOName,
                currentTeam: 'X',
                teamXScore: 0,
                teamOScore: 0,
                board: Array(9).fill(null),
                usedQuestions: [],
                gameActive: true,
                winResult: null,
                isDraw: false,
                modal: null,
            }

        case 'RESET_GAME':
            return {
                ...state,
                currentTeam: 'X',
                teamXScore: 0,
                teamOScore: 0,
                board: Array(9).fill(null),
                usedQuestions: [],
                gameActive: true,
                winResult: null,
                isDraw: false,
                modal: null,
                currentQuestion: null,
                selectedCell: null,
                selectedAnswer: null,
            }

        case 'BACK_TO_SETUP':
            return {
                ...state,
                screen: 'setup',
                gameActive: false,
                modal: null,
            }

        case 'SELECT_CELL':
            return {
                ...state,
                selectedCell: action.payload.cellIndex,
                currentQuestion: action.payload.question,
                selectedAnswer: null,
                timeRemaining: action.payload.question.time,
                totalTime: action.payload.question.time,
                modal: 'question',
            }

        case 'SELECT_ANSWER':
            return { ...state, selectedAnswer: action.payload }

        case 'TICK_TIMER':
            return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) }

        case 'PROCESS_ANSWER': {
            const { isCorrect, winResult, isDraw } = action.payload
            const teamToMark = isCorrect
                ? state.currentTeam
                : state.currentTeam === 'X' ? 'O' : 'X'

            const newBoard = [...state.board]
            newBoard[state.selectedCell] = teamToMark

            const newXScore = state.teamXScore + (teamToMark === 'X' ? 1 : 0)
            const newOScore = state.teamOScore + (teamToMark === 'O' ? 1 : 0)

            const nextTeam = state.currentTeam === 'X' ? 'O' : 'X'

            return {
                ...state,
                board: newBoard,
                teamXScore: newXScore,
                teamOScore: newOScore,
                winResult: winResult || null,
                isDraw: isDraw || false,
                gameActive: !winResult && !isDraw,
                modal: winResult || isDraw ? 'victory' : null,
                currentTeam: winResult || isDraw ? state.currentTeam : nextTeam,
                usedQuestions: [...state.usedQuestions, state.currentQuestion.id],
            }
        }

        default:
            return state
    }
}
