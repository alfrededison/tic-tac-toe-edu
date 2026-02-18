import Board from './Board'
import styles from './GameScreen.module.css'

export default function GameScreen({ state, onCellClick, onReset, onBack }) {
    const { teamXName, teamOName, teamXScore, teamOScore, currentTeam, board, winResult } = state

    return (
        <div className={styles.screen}>
            {/* Header */}
            <div className={styles.header}>
                <div className={`${styles.teamInfo} ${styles.teamX} ${currentTeam === 'X' ? styles.active : ''}`}>
                    <div className={styles.teamName}>{teamXName}</div>
                    <div className={styles.teamScore}>
                        <span className={styles.scoreLabel}>Điểm:</span>
                        <span className={styles.scoreValue}>{teamXScore}</span>
                    </div>
                </div>

                <div className={styles.turnBox}>
                    <div className={styles.turnLabel}>Lượt chơi</div>
                    <div
                        className={styles.turnTeam}
                        style={{ color: currentTeam === 'X' ? 'var(--team-x-primary)' : 'var(--team-o-primary)' }}
                    >
                        {currentTeam === 'X' ? teamXName : teamOName}
                    </div>
                </div>

                <div className={`${styles.teamInfo} ${styles.teamO} ${currentTeam === 'O' ? styles.active : ''}`}>
                    <div className={styles.teamName}>{teamOName}</div>
                    <div className={styles.teamScore}>
                        <span className={styles.scoreLabel}>Điểm:</span>
                        <span className={styles.scoreValue}>{teamOScore}</span>
                    </div>
                </div>
            </div>

            {/* Board */}
            <div className={styles.boardContainer}>
                <Board board={board} winPattern={winResult?.pattern} onCellClick={onCellClick} />
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <button className={styles.controlBtn} onClick={onReset}>
                    🔄 Chơi Lại
                </button>
                <button className={styles.controlBtn} onClick={onBack}>
                    🏠 Về Trang Chủ
                </button>
            </div>
        </div>
    )
}
