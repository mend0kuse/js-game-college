import { createContext, ReactNode, useState } from "react";
import { Step } from "../types/types";

export interface AppContextProps {
    currentStep?: Step
    setCurrentStep?: (step: Step) => void

    username?: string;
    setUsername?: (username: string) => void

    aliveTime?: number;
    setAliveTime?: React.Dispatch<React.SetStateAction<number>>

    collectedtraps?: number;
    setCollectedTraps?: React.Dispatch<React.SetStateAction<number>>

    monsters?: number;
    setMonsters?: (monsters: number) => void

    lives: number;
    setLives?: React.Dispatch<React.SetStateAction<number>>

    pause?: boolean;
    setPause?: (pause: boolean) => void
}

export const AppContext = createContext<AppContextProps>({ lives: 5 })

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState('');
    const [currentStep, setCurrentStep] = useState<Step>('chooseMap');
    const [aliveTime, setAliveTime] = useState(0);
    const [collectedtraps, setCollectedTraps] = useState(0);
    const [monsters, setMonsters] = useState(0);
    const [lives, setLives] = useState(5);
    const [pause, setPause] = useState(false);

    return (
        <AppContext.Provider value={{
            username, setUsername,
            aliveTime, setAliveTime,
            collectedtraps, setCollectedTraps,
            monsters, setMonsters,
            currentStep, setCurrentStep,
            lives, setLives,
            pause, setPause
        }}>
            {children}
        </AppContext.Provider>
    )
}