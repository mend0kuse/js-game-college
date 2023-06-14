import { useContext } from "react"
import { AppContext } from "../../context/appContext"
import { Modal } from "../Modal/Modal"
import { Timer } from "../Timer/Timer"
import styles from './GamePanel.module.scss';

export const GamePanel = () => {
    const { username, lives, pause, setPause } = useContext(AppContext)

    return (
        <>
            <div className={styles.panel}>
                <p>Ник: {username}</p>
                <Timer />
                <p>Число жизней: {lives}</p>
            </div>
            <Modal open={pause} setOpen={setPause}>
                <p>Пауза</p>
                <button onClick={() => { setPause?.(false) }}>Возобновить</button>
            </Modal>
        </>
    )
}