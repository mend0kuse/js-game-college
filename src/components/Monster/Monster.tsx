import styles from './Monster.module.scss';

import cn from 'classnames'
import { IMonster } from '../../types/types';
import { FC, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

interface MonsterProps {
    className: string;
    monster: IMonster
}

const directions = ['left', 'top']
const values = [1, -1]

interface Pos {
    left: number
    top: number
}

export const Monster: FC<MonsterProps> = (props) => {
    const { className, monster } = props;

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;

    const [pos, setPos] = useState<Pos>({ left: monster.posX, top: monster.posY })

    const changedDirection = useMemo(() => directions[Math.floor(Math.random() * 2)] as keyof Pos, [])
    const changedValue = useMemo(() => values[Math.floor(Math.random() * 2)], [])

    const move = () => {
        setPos({ ...pos, [changedDirection]: pos[changedDirection] + changedValue })
    }

    useEffect(() => {
        timerRef.current = setInterval(move, 5)

        return () => {
            clearInterval(timerRef.current)
        }
    }, [move])

    return (
        <div data-id={monster.id} className={cn(styles.monster, className)} style={{ left: pos.left, top: pos.top }} />
    )
}


