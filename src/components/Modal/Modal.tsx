import { FC, ReactNode } from "react"
import styles from './Modal.module.scss';
import cn from 'classnames';

interface ModalProps {
    open?: boolean
    setOpen?: (open: boolean) => void
    children: ReactNode
}

export const Modal: FC<ModalProps> = (props) => {
    const { open, setOpen, children } = props

    return (
        <div onClick={() => setOpen?.(false)} className={cn(styles.modal, { [styles.open]: open })}>
            <div onClick={e=> e.stopPropagation()} className={styles.content}>
                {children}
            </div>
        </div>
    )
}

