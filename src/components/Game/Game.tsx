import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import { Modal } from '../Modal/Modal'
import { Timer } from '../Timer/Timer'
import styles from './Game.module.scss'

export const Game = () => {
    const { username, lives, pause, setPause } = useContext(AppContext)

    useEffect(() => {
        const pauseGame = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                setPause?.(true)
            }
        }

        window.addEventListener('keydown', pauseGame)

        return () => {
            window.removeEventListener('keydown', pauseGame)
        }
    }, [setPause])

    return (
        <div className={styles.game}>
            <div className={styles.panel}>
                <p>Ник: {username}</p>
                <Timer />
                <p>Число жизней: {lives}</p>
            </div>
            <Modal open={pause} setOpen={setPause}>
                <p>Пауза</p>
            </Modal>
        </div>
    )
}

