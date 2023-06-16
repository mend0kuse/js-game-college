import { useContext } from "react"
import { AppContext } from "../../context/appContext"
import { msToHMS } from "../../utils/convertMs"
import styles from "./Stats.module.scss";

export const Stats = () => {
    const { aliveTime, setAliveTime, setCurrentStep, collectedtraps, setLives, setCollectedTraps } = useContext(AppContext)

    const restartGame = () => {
        setAliveTime?.(0)
        setCollectedTraps?.(0)
        setLives?.(5)
        setCurrentStep?.('game')
    }

    return (
        <div className={styles.stats}>
            <p>Вы продержались = {msToHMS(aliveTime)}</p>
            <p>Вы наткнулись на {collectedtraps} ловушек</p>
            <button onClick={restartGame}>Начать заново</button>
        </div>
    )
}