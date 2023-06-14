import { createContext, ReactNode, useState } from "react";
import { Step } from "../types/types";

export interface AppContextProps {
    currentStep?: Step
    setCurrentStep?: (step: Step) => void

    username?: string;
    setUsername?: (username: string) => void

    aliveTime?: number;
    setAliveTime?: React.Dispatch<React.SetStateAction<number>>

    traps?: number;
    setTraps?: (traps: number) => void

    monsters?: number;
    setMonsters?: (monsters: number) => void

    lives?: number;
    setLives?: (monsters: number) => void

    pause?: boolean;
    setPause?: (pause: boolean) => void
}

export const AppContext = createContext<AppContextProps>({})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState('');
    const [currentStep, setCurrentStep] = useState<Step>('chooseMap');
    const [aliveTime, setAliveTime] = useState(0);
    const [traps, setTraps] = useState(0);
    const [monsters, setMonsters] = useState(0);
    const [lives, setLives] = useState(5);
    const [pause, setPause] = useState(false);

    return (
        <AppContext.Provider value={{
            username, setUsername,
            aliveTime, setAliveTime,
            traps, setTraps,
            monsters, setMonsters,
            currentStep, setCurrentStep,
            lives, setLives,
            pause, setPause
        }}>
            {children}
        </AppContext.Provider>
    )
}