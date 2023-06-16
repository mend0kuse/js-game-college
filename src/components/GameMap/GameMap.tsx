import { memo, MutableRefObject, useCallback, useContext, useEffect, useRef, useState, } from 'react';
import { AppContext } from '../../context/appContext';
import { ITrap } from '../../types/types';
import { isCollision } from '../../utils/isCollision';
import { Trap } from '../Trap/Trap';
import styles from './GameMap.module.scss';

export const GameMap = memo(() => {
    const { pause, setLives, setCollectedTraps } = useContext(AppContext)

    const playerRef = useRef<null | HTMLDivElement>(null);
    const trapsRef = useRef<null | HTMLDivElement>(null);
    const mapRef = useRef<null | HTMLDivElement>(null);

    const [traps, setTraps] = useState<ITrap[]>([])

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;

    const checkCollision = () => {
        if (playerRef.current) {
            const playerPos = playerRef.current.getBoundingClientRect()
            trapsRef.current?.childNodes.forEach((i, index) => {
                const trap = (i as HTMLDivElement)
                const trapPos = trap.getBoundingClientRect()

                if (isCollision(playerPos, trapPos)) {
                    const id = Number(trap.dataset.id)
                    setLives?.(prev => prev - 1)
                    setTraps(prev => prev.filter((i) => i.id !== id))
                    setCollectedTraps?.(prev => prev + 1)
                }
            })
        }
    }

    const playerMove = useCallback((e: KeyboardEvent) => {
        if (playerRef.current) {
            let currentLeft = Number(playerRef.current.style.left.split('px')[0])
            let currentTop = Number(playerRef.current.style.top.split('px')[0])

            switch (e.code) {
                case 'ArrowRight':
                    if (currentLeft < 970) {
                        currentLeft += 5
                    }
                    break;
                case 'ArrowDown':
                    if (currentTop < 770) {
                        currentTop += 5
                    }
                    break;
                case 'ArrowLeft':
                    if (currentLeft > 0) {
                        currentLeft -= 5

                    }
                    break;
                case 'ArrowUp':
                    if (currentTop > 0) {
                        currentTop -= 5
                    }
                    break;

                default:
                    break;
            }

            playerRef.current.style.left = currentLeft + 'px';
            playerRef.current.style.top = currentTop + 'px';
            checkCollision()
        }
    }, [])

    const createTrap = () => {
        const posx = (Math.random() * 1000).toFixed();
        const posy = (Math.random() * 800).toFixed();
        const newTrap = { id: Date.now(), posX: Number(posx), posY: Number(posy) }
        setTraps(prev => [...prev, newTrap])
        checkCollision()
    }

    useEffect(() => {
        if (pause) {
            clearInterval(timerRef.current)
            window.removeEventListener('keydown', playerMove)

        } else {
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    createTrap()
                }, 3000)
            }

            window.addEventListener('keydown', playerMove)
        }

        return () => {
            window.removeEventListener('keydown', playerMove)
        }
    }, [pause, playerMove])

    return (
        <div className={styles.wrapper} ref={mapRef}>
            <div ref={trapsRef} className={styles.traps}>
                {traps.map((i) => (<Trap trap={i} className={styles.trap} key={i.id} />))}
            </div>
            <div ref={playerRef} style={{ left: 0, top: 0 }} className={styles.player} />
        </div>
    )
})