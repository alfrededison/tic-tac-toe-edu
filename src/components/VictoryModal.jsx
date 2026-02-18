import { useEffect, useRef } from 'react'
import styles from './VictoryModal.module.css'

const FIREWORK_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']

export default function VictoryModal({
    winResult,
    isDraw,
    teamXName,
    teamOName,
    teamXScore,
    teamOScore,
    onPlayAgain,
}) {
    const fireworksRef = useRef(null)

    const winnerName = winResult
        ? winResult.winner === 'X' ? teamXName : teamOName
        : null

    const winnerColor = winResult
        ? winResult.winner === 'X' ? 'var(--team-x-primary)' : 'var(--team-o-primary)'
        : 'var(--text-secondary)'

    useEffect(() => {
        if (!winResult) return
        const container = fireworksRef.current
        if (!container) return

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const fw = document.createElement('div')
                fw.className = styles.firework
                fw.style.left = Math.random() * 100 + '%'
                fw.style.top = Math.random() * 100 + '%'
                fw.style.background = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
                fw.style.animationDelay = Math.random() * 0.5 + 's'
                container.appendChild(fw)
                setTimeout(() => fw.remove(), 1200)
            }, i * 50)
        }
    }, [winResult])

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.fireworks} ref={fireworksRef} />

                <h2 className={styles.title}>
                    {isDraw ? '🤝 Hòa! 🤝' : '🎉 Chiến Thắng! 🎉'}
                </h2>

                <p className={styles.winnerName} style={{ color: winnerColor }}>
                    {isDraw ? 'Trận đấu kết thúc hòa!' : winnerName}
                </p>

                <p className={styles.message}>
                    {isDraw ? 'Cả hai đội đều chơi rất tốt!' : 'Chúc mừng! Bạn đã chiến thắng!'}
                </p>

                <div className={styles.finalScore}>
                    <div className={styles.scoreItem} style={{ color: 'var(--team-x-primary)' }}>
                        <span className={styles.scoreName}>{teamXName}</span>
                        <span className={styles.scoreNum}>{teamXScore}</span>
                    </div>
                    <div className={styles.scoreSep}>:</div>
                    <div className={styles.scoreItem} style={{ color: 'var(--team-o-primary)' }}>
                        <span className={styles.scoreNum}>{teamOScore}</span>
                        <span className={styles.scoreName}>{teamOName}</span>
                    </div>
                </div>

                <button className={styles.playAgainBtn} onClick={onPlayAgain} id="playAgainButton">
                    <span>Chơi Lại</span>
                    <span>🎮</span>
                </button>
            </div>
        </div>
    )
}
