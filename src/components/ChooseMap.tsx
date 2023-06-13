import { useContext, useState } from 'react';
import { AppContext } from '../context/appContext';
import styles from './ChooseMap.module.scss';
import { Modal } from './Modal/Modal';

export const ChooseMap = () => {
    const [usernameModal, setUsernameModal] = useState(false);
    const [currentMap, setCurrentMap] = useState<null | number>(null)
    const { username, setUsername, setCurrentStep } = useContext(AppContext)

    const pickMap = (map: number) => {
        setCurrentMap(map)
        setUsernameModal(true)
    }

    const startGame = () => {
        setCurrentStep?.('game')
    }

    return (
        <>
            <div className={styles.inner}>
                {new Array(16).fill(null).map((_, index) => (
                    <button onClick={() => pickMap(index + 1)} key={index} type='button' className={styles.map}>
                        <p>Карта № {index + 1}</p>
                    </button>
                ))}
            </div>
            <Modal open={usernameModal} setOpen={setUsernameModal}>
                <div className={styles.start}>
                    <p>Игра на карте № {currentMap}</p>
                    <input value={username} onChange={e => setUsername?.(e.target.value)} placeholder='Введите никнейм' type="text" />
                    <button onClick={startGame}>Начать</button>
                </div>
            </Modal>
        </>
    )
}

