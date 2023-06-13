import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/appContext";
import { msToHMS } from "../../utils/convertMs";

export const Timer = () => {

    const { aliveTime, setAliveTime, pause } = useContext(AppContext)
    const [currentDate, setCurrentDate] = useState(new Date())


    useEffect(() => {
        const timer = setInterval(() => {
            if (!pause) {
                setCurrentDate(new Date());
                setAliveTime?.(prev => prev += 1000)
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [pause, setAliveTime]);

    return (
        <>
            <p>Текущее время <span>{currentDate.toLocaleString().split(',')[1]}</span></p>
            <p>Прошло с начала игры <span>{msToHMS(aliveTime)}</span></p>
        </>

    )
}

