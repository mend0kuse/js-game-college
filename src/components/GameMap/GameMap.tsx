import { memo, MutableRefObject, useCallback, useContext, useEffect, useRef, useState, } from 'react';
import { AppContext } from '../../context/appContext';
import { ITrap, IMonster } from '../../types/types';
import { isCollision } from '../../utils/isCollision';
import { Monster } from '../Monster/Monster';
import { Trap } from '../Trap/Trap';
import styles from './GameMap.module.scss';
import { createTwoElements } from '../../utils/createTwoRadomPos';

export const GameMap = memo(() => {
    const { pause, setLives, setCollectedTraps, setCollectedMonsters, setCurrentStep, setIsWin, currentMap } = useContext(AppContext)

    const playerRef = useRef<null | HTMLDivElement>(null);
    const trapsRef = useRef<null | HTMLDivElement>(null);
    const monstersRef = useRef<null | HTMLDivElement>(null);
    const mapRef = useRef<null | HTMLDivElement>(null);
    const finishRef = useRef<null | HTMLDivElement>(null);
    const wallsRef = useRef<null | HTMLDivElement>(null);

    const [traps, setTraps] = useState<ITrap[]>([])
    const [monsters, setMonsters] = useState<IMonster[]>([])

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;
    const checkRef = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;

    const checkCollision = useCallback(() => {
        if (playerRef.current) {
            const playerPos = playerRef.current.getBoundingClientRect()

            trapsRef.current?.childNodes.forEach((i) => {
                const trap = (i as HTMLDivElement)
                const trapPos = trap.getBoundingClientRect()

                if (isCollision(playerPos, trapPos)) {
                    const id = Number(trap.dataset.id)
                    setLives?.(prev => prev - 1)
                    setTraps(prev => prev.filter((i) => i.id !== id))
                    setCollectedTraps?.(prev => prev + 1)
                }
            })

            monstersRef.current?.childNodes.forEach((i) => {
                const monster = (i as HTMLDivElement)
                const monsterPos = monster.getBoundingClientRect()

                if (isCollision(playerPos, monsterPos)) {
                    const id = Number(monster.dataset.id)
                    setLives?.(prev => prev - 1)
                    setMonsters(prev => prev.filter((i) => i.id !== id))
                    setCollectedMonsters?.(prev => prev + 1)
                }
            })

            if (finishRef.current) {
                const finishPos = finishRef.current.getBoundingClientRect()
                if (isCollision(playerPos, finishPos)) {
                    setIsWin?.(true);
                    setCurrentStep?.('stats')
                }
            }

        }
    }, [setCollectedMonsters, setCollectedTraps, setCurrentStep, setIsWin, setLives])

    const playerMove = useCallback((e: KeyboardEvent) => {
        if (playerRef.current) {
            const initialLeft = Number(playerRef.current.style.left.split('px')[0])
            const initialTop = Number(playerRef.current.style.top.split('px')[0])

            let newLeft = initialLeft
            let newTop = initialTop

            switch (e.code) {
                case 'ArrowRight':
                    if (initialLeft < 970) {
                        newLeft += 6
                    }
                    break;
                case 'ArrowDown':
                    if (initialTop < 770) {
                        newTop += 6
                    }
                    break;
                case 'ArrowLeft':
                    if (initialLeft > 0) {
                        newLeft -= 6
                    }
                    break;
                case 'ArrowUp':
                    if (initialTop > 0) {
                        newTop -= 6
                    }
                    break;

                default:
                    break;
            }

            playerRef.current.style.left = newLeft + 'px'
            playerRef.current.style.top = newTop + 'px'

            const playerPos = playerRef.current.getBoundingClientRect()

            wallsRef.current?.childNodes.forEach((i) => {
                const wall = (i as HTMLDivElement)
                const wallPos = wall.getBoundingClientRect()

                if (isCollision(playerPos, wallPos)) {
                    setTimeout(() => {
                        if (playerRef.current) {
                            playerRef.current.style.left = initialLeft + 'px'
                            playerRef.current.style.top = initialTop + 'px'
                        }
                    }, 10)

                }
            })
        }
    }, [])


    const createTrap = () => {
        setTraps(prev => [...prev, ...createTwoElements()])
    }

    const createMonsters = () => {
        setMonsters(prev => [...prev, ...createTwoElements()])
    }

    useEffect(() => {
        if (pause) {
            clearInterval(timerRef.current)
            clearInterval(checkRef.current)
            window.removeEventListener('keydown', playerMove)

        } else {
            timerRef.current = setInterval(() => {
                createTrap()
                createMonsters()
            }, 3000)

            checkRef.current = setInterval(() => {
                checkCollision()
            }, 5)

            window.addEventListener('keydown', playerMove)
        }

        return () => {
            clearInterval(timerRef.current)
            clearInterval(checkRef.current)
            window.removeEventListener('keydown', playerMove)
        }
    }, [checkCollision, pause, playerMove])

    return (
        <div className={styles.wrapper} ref={mapRef}>
            <div ref={trapsRef} className={styles.traps}>
                {traps.map((i) => (<Trap trap={i} className={styles.trap} key={i.id} />))}
            </div>
            <div ref={monstersRef} className={styles.monsters}>
                {monsters.map((i) => (<Monster monster={i} className={styles.monster} key={i.id} />))}
            </div>
            <div ref={playerRef} style={{ left: 0, top: 0 }} className={styles.player} />
            <div ref={wallsRef} className={styles.walls}>
                {currentMap?.walls.map((properties, index) => (<div key={index} style={{ ...properties }} className={styles.wall} />))}
            </div>
            <div ref={finishRef} className={styles.finish} style={{ ...currentMap?.finish }} />
        </div>
    )
})