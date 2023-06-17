import { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import { GameMap } from '../GameMap/GameMap'
import { GamePanel } from '../GamePanel/GamePanel'
import styles from './GameStep.module.scss'

export const GameStep = () => {
    const { setPause } = useContext(AppContext)

    const pauseGame = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            setPause?.(prev => !prev)
        }
    }, [setPause])

    useEffect(() => {
        window.addEventListener('keydown', pauseGame)

        return () => {
            window.removeEventListener('keydown', pauseGame)
        }
    }, [pauseGame])

    return (
        <div className={styles.game}>
            <GamePanel />
            <GameMap />
        </div>
    )
}

