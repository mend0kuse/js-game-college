import { useContext, useState } from 'react';
import { Maps } from '../../const/maps';
import { AppContext } from '../../context/appContext';
import styles from './ChooseMap.module.scss';
import { Modal } from './../Modal/Modal';

export const ChooseMap = () => {
    const [usernameModal, setUsernameModal] = useState(false);
    const { username, setUsername, setCurrentStep, currentMap, setCurrentMap } = useContext(AppContext)

    const pickMap = (map: number) => {
        setCurrentMap?.(map)
        setUsernameModal(true)
    }

    const startGame = () => {
        setCurrentStep?.('game')
    }

    return (
        <>
            <div className={styles.inner}>
                {Maps.map((map, index) => (
                    <button onClick={() => pickMap(index + 1)} key={index} type='button' className={styles.map}>
                        <img src={`/assets/${map.preview}`} />
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

