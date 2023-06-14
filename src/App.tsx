import { useContext } from "react";
import { ChooseMap } from "./components/ChooseMap";
import { GameStep } from "./components/GameStep/GameStep";
import { AppContext } from "./context/appContext";

export function App() {
  const { currentStep } = useContext(AppContext)

  return (
    <div className="app">
      {currentStep === 'chooseMap' && <ChooseMap />}
      {currentStep === 'game' && <GameStep />}
    </div>
  );
}


