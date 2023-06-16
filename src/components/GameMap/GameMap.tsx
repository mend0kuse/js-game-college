import { memo, MutableRefObject, useCallback, useContext, useEffect, useRef, useState, } from 'react';
import _debounce from 'lodash/debounce'
import { AppContext } from '../../context/appContext';
import { ITrap, IMonster } from '../../types/types';
import { isCollision } from '../../utils/isCollision';
import { Monster } from '../Monster/Monster';
import { Trap } from '../Trap/Trap';
import styles from './GameMap.module.scss';
import { createTwoElements } from '../../utils/createTwoRadomPos';

export const GameMap = memo(() => {
    const { pause, setLives, setCollectedTraps, setCollectedMonsters } = useContext(AppContext)

    const playerRef = useRef<null | HTMLDivElement>(null);
    const trapsRef = useRef<null | HTMLDivElement>(null);
    const monstersRef = useRef<null | HTMLDivElement>(null);
    const mapRef = useRef<null | HTMLDivElement>(null);

    const [traps, setTraps] = useState<ITrap[]>([])
    const [monsters, setMonsters] = useState<IMonster[]>([])

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;
    const checkRef = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;

    const checkCollision = () => {
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
            }, 10)

            window.addEventListener('keydown', playerMove)
        }

        return () => {
            clearInterval(timerRef.current)
            clearInterval(checkRef.current)
            window.removeEventListener('keydown', playerMove)
        }
    }, [pause, playerMove])

    return (
        <div className={styles.wrapper} ref={mapRef}>
            <div ref={trapsRef} className={styles.traps}>
                {traps.map((i) => (<Trap trap={i} className={styles.trap} key={i.id} />))}
            </div>
            <div ref={monstersRef} className={styles.monsters}>
                {monsters.map((i) => (<Monster monster={i} className={styles.monster} key={i.id} />))}
            </div>
            <div ref={playerRef} style={{ left: 0, top: 0 }} className={styles.player} />
        </div>
    )
})