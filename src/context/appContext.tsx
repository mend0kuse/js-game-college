import { createContext, ReactNode, useState } from "react";
import { Step } from "../types/types";

export interface AppContextProps {
    currentStep?: Step
    setCurrentStep?: (step: Step) => void

    username?: string;
    setUsername?: (username: string) => void

    aliveTime?: number;
    setAliveTime?: React.Dispatch<React.SetStateAction<number>>

    collectedTraps?: number;
    setCollectedTraps?: React.Dispatch<React.SetStateAction<number>>

    collectedMonsters?: number;
    setCollectedMonsters?: React.Dispatch<React.SetStateAction<number>>

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
    const [collectedTraps, setCollectedTraps] = useState(0);
    const [collectedMonsters, setCollectedMonsters] = useState(0);
    const [lives, setLives] = useState(5);
    const [pause, setPause] = useState(false);

    return (
        <AppContext.Provider value={{
            username, setUsername,
            aliveTime, setAliveTime,
            collectedTraps, setCollectedTraps,
            collectedMonsters, setCollectedMonsters,
            currentStep, setCurrentStep,
            lives, setLives,
            pause, setPause
        }}>
            {children}
        </AppContext.Provider>
    )
}