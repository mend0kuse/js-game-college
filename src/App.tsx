import { useContext, useEffect } from "react";
import { ChooseMap } from "./components/ChooseMap/ChooseMap";
import { GameStep } from "./components/GameStep/GameStep";
import { Stats } from "./components/Stats/Stats";
import { AppContext } from "./context/appContext";

export function App() {
  const { currentStep, lives, setCurrentStep } = useContext(AppContext)

  useEffect(() => {
    if (lives === 0) {
      setCurrentStep?.("stats")
    }
  }, [lives])

  return (
    <div className="app">
      {currentStep === 'chooseMap' && <ChooseMap />}
      {currentStep === 'game' && <GameStep />}
      {currentStep === 'stats' && <Stats />}
    </div>
  );
}


