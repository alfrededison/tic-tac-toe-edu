import styles from './Board.module.css'

export default function Board({ board, winPattern, onCellClick }) {
    return (
        <div className={styles.board}>
            {board.map((value, index) => {
                const isWinning = winPattern?.includes(index)
                const isEmpty = value === null

                let cellClass = styles.cell
                if (value === 'X') cellClass += ` ${styles.x}`
                if (value === 'O') cellClass += ` ${styles.o}`
                if (!isEmpty) cellClass += ` ${styles.disabled}`
                if (isWinning) cellClass += ` ${styles.winning}`

                return (
                    <div
                        key={index}
                        className={cellClass}
                        data-index={index}
                        onClick={() => isEmpty && onCellClick(index)}
                        role="button"
                        aria-label={`Ô ${index + 1}${value ? `: ${value}` : ''}`}
                    >
                        {value === 'X' && '✕'}
                        {value === 'O' && '○'}
                    </div>
                )
            })}
        </div>
    )
}
