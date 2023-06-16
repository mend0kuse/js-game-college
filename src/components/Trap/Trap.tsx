import styles from './Trap.module.scss';

import cn from 'classnames'
import { ITrap } from '../../types/types';
import { FC } from 'react';

interface TrapProps {
    className: string;
    trap: ITrap
}

export const Trap: FC<TrapProps> = (props) => {
    const { className, trap } = props
    return (
        <div data-id={trap.id} className={cn(styles.trap, className)} style={{ left: trap.posX, top: trap.posY }} />
    )
}


