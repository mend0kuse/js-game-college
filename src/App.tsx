import { useContext } from "react";
import { ChooseMap } from "./components/ChooseMap";
import { Game } from "./components/Game/Game";
import { AppContext } from "./context/appContext";

export function App() {
  const { currentStep } = useContext(AppContext)

  return (
    <div className="app">
      {currentStep === 'chooseMap' && <ChooseMap />}
      {currentStep === 'game' && <Game />}
    </div>
  );
}


