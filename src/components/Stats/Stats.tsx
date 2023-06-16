import { useContext } from "react"
import { AppContext } from "../../context/appContext"
import { msToHMS } from "../../utils/convertMs"
import styles from "./Stats.module.scss";

export const Stats = () => {
    const { aliveTime, setAliveTime, setCurrentStep, collectedTraps, collectedMonsters, setLives, setCollectedTraps, setCollectedMonsters } = useContext(AppContext)

    const restartGame = () => {
        setAliveTime?.(0)
        setCollectedTraps?.(0)
        setCollectedMonsters?.(0)
        setLives?.(5)
        setCurrentStep?.('game')
    }

    return (
        <div className={styles.stats}>
            <p>Вы продержались = {msToHMS(aliveTime)}</p>
            <p>Вы наткнулись на {collectedTraps} ловушек</p>
            <p>Вы наткнулись на {collectedMonsters} монстров</p>
            <button onClick={restartGame}>Начать заново</button>
        </div>
    )
}