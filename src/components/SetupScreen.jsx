import { useState } from 'react'
import styles from './SetupScreen.module.css'

export default function SetupScreen({ onStart }) {
    const [teamXName, setTeamXName] = useState('Đội Đỏ')
    const [teamOName, setTeamOName] = useState('Đội Xanh')

    function handleSubmit(e) {
        e.preventDefault()
        onStart(teamXName.trim() || 'Đội X', teamOName.trim() || 'Đội O')
    }

    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <span className={styles.titleIcon}>🎮</span>
                    Tic-Tac-Toe
                    <span className={styles.titleIcon}>📚</span>
                </h1>
                <p className={styles.subtitle}>Học tập qua trò chơi - Vui học, hiệu quả cao!</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.teamInputs}>
                        <div className={`${styles.inputGroup} ${styles.teamX}`}>
                            <label htmlFor="teamXName">
                                <span className={styles.teamSymbol}>✕</span>
                                Tên Đội X
                            </label>
                            <input
                                id="teamXName"
                                type="text"
                                value={teamXName}
                                onChange={e => setTeamXName(e.target.value)}
                                placeholder="Nhập tên đội X..."
                                maxLength={20}
                            />
                        </div>

                        <div className={styles.vsDivider}>VS</div>

                        <div className={`${styles.inputGroup} ${styles.teamO}`}>
                            <label htmlFor="teamOName">
                                <span className={styles.teamSymbol}>○</span>
                                Tên Đội O
                            </label>
                            <input
                                id="teamOName"
                                type="text"
                                value={teamOName}
                                onChange={e => setTeamOName(e.target.value)}
                                placeholder="Nhập tên đội O..."
                                maxLength={20}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.startButton} id="startButton">
                        <span>Bắt Đầu Trò Chơi</span>
                        <span className={styles.buttonIcon}>🚀</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
