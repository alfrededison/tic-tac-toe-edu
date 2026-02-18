// ===== SOUND EFFECTS =====
function playBeep(frequency, duration, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = type
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
    } catch (e) {
        console.log('Audio not supported')
    }
}

export const sounds = {
    correct: () => playBeep(800, 0.2, 'sine'),
    incorrect: () => playBeep(200, 0.3, 'sawtooth'),
    timeout: () => playBeep(150, 0.5, 'triangle'),
    victory: () => {
        playBeep(523, 0.15, 'sine')
        setTimeout(() => playBeep(659, 0.15, 'sine'), 150)
        setTimeout(() => playBeep(784, 0.3, 'sine'), 300)
    },
    click: () => playBeep(400, 0.05, 'sine'),
}

// ===== WIN DETECTION =====
export const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
]

export function checkWinner(board) {
    for (const pattern of WIN_PATTERNS) {
        const [a, b, c] = pattern
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], pattern }
        }
    }
    return null
}

// ===== QUESTION HELPERS =====
export function getRandomQuestion(questions, usedIds) {
    const available = questions.filter(q => !usedIds.includes(q.id))
    if (available.length === 0) {
        return questions[Math.floor(Math.random() * questions.length)]
    }
    return available[Math.floor(Math.random() * available.length)]
}
