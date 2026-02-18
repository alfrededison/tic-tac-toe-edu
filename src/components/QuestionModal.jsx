import { useEffect, useRef, useState } from 'react'
import styles from './QuestionModal.module.css'

export default function QuestionModal({
    question,
    currentTeam,
    teamName,
    timeRemaining,
    totalTime,
    selectedAnswer,
    onSelectAnswer,
    onConfirm,
    onTimeout,
    onTick,
}) {
    const [phase, setPhase] = useState('answering') // 'answering' | 'revealed'
    const [revealedCorrect, setRevealedCorrect] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const timerRef = useRef(null)

    // Start countdown
    useEffect(() => {
        timerRef.current = setInterval(() => {
            onTick()
        }, 1000)
        return () => clearInterval(timerRef.current)
    }, [])

    // Handle timeout
    useEffect(() => {
        if (timeRemaining <= 0 && phase === 'answering') {
            clearInterval(timerRef.current)
            handleTimeout()
        }
    }, [timeRemaining])

    function stopTimer() {
        clearInterval(timerRef.current)
    }

    function handleTimeout() {
        setPhase('timeout')
        if (question.type === 'multiple_choice') {
            setRevealedCorrect(true)
        } else {
            setTimeout(() => onTimeout(), 1000)
        }
    }

    function handleConfirmMultipleChoice() {
        if (phase === 'revealed') {
            // Continue after reveal
            onConfirm(revealedCorrect)
            return
        }
        stopTimer()
        const isCorrect = selectedAnswer === question.answer
        setRevealedCorrect(isCorrect)
        setPhase('revealed')
    }

    function handleOpenEnded(isCorrect) {
        stopTimer()
        onConfirm(isCorrect)
    }

    function handleTimeoutContinue() {
        onTimeout()
    }

    const timerPercent = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0
    const isWarning = timeRemaining <= 5
    const isTimeout = phase === 'timeout'

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Câu Hỏi —{' '}
                        <span style={{ color: currentTeam === 'X' ? 'var(--team-x-primary)' : 'var(--team-o-primary)' }}>
                            {teamName}
                        </span>
                    </h2>

                    {/* Timer */}
                    <div className={styles.timerContainer}>
                        <div className={styles.timerLabel}>Thời gian</div>
                        <div className={`${styles.timerDisplay} ${isWarning ? styles.warning : ''}`}>
                            {timeRemaining}s
                        </div>
                        <div className={styles.timerBar}>
                            <div
                                className={`${styles.timerProgress} ${isWarning ? styles.warning : ''}`}
                                style={{ width: `${timerPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Question */}
                <div className={styles.questionContent}>
                    <p className={styles.questionText}>{question.question}</p>
                </div>

                {/* Answer Area */}
                <div className={styles.answerArea}>
                    {question.type === 'multiple_choice' ? (
                        <div className={styles.optionsGrid}>
                            {question.options.map((option, idx) => {
                                let btnClass = styles.optionBtn
                                if (phase === 'revealed' || isTimeout) {
                                    if (idx === question.answer) btnClass += ` ${styles.correct}`
                                    else if (idx === selectedAnswer && idx !== question.answer) btnClass += ` ${styles.incorrect}`
                                } else if (idx === selectedAnswer) {
                                    btnClass += ` ${styles.selected}`
                                }
                                return (
                                    <button
                                        key={idx}
                                        className={btnClass}
                                        onClick={() => phase === 'answering' && !isTimeout && onSelectAnswer(idx)}
                                        disabled={phase !== 'answering' || isTimeout}
                                    >
                                        <span className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</span>
                                        <span>{option}</span>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        <div className={styles.openEndedDisplay}>
                            {!showAnswer ? (
                                <button
                                    className={`${styles.actionBtn} ${styles.revealBtn}`}
                                    onClick={() => {
                                        setShowAnswer(true)
                                        stopTimer()
                                    }}
                                >
                                    👁 Hiện đáp án
                                </button>
                            ) : (
                                <>
                                    <div className={styles.openEndedLabel}>Đáp án:</div>
                                    <div className={styles.openEndedAnswer}>{question.answer}</div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    {question.type === 'multiple_choice' ? (
                        isTimeout ? (
                            <button className={`${styles.actionBtn} ${styles.incorrect}`} onClick={handleTimeoutContinue}>
                                ⏰ Hết Giờ — Tiếp Tục
                            </button>
                        ) : (
                            <button
                                className={`${styles.actionBtn} ${styles.confirm}`}
                                onClick={handleConfirmMultipleChoice}
                                disabled={phase === 'answering' && selectedAnswer === null}
                            >
                                {phase === 'revealed' ? '➡ Tiếp Tục' : '✓ Xác Nhận'}
                            </button>
                        )
                    ) : (
                        <>
                            <button className={`${styles.actionBtn} ${styles.correct}`} onClick={() => handleOpenEnded(true)}>
                                ✓ Đúng
                            </button>
                            <button className={`${styles.actionBtn} ${styles.incorrect}`} onClick={() => handleOpenEnded(false)}>
                                ✗ Sai
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
