import { useRecoilValue } from "recoil";
import Simulation from "../components/simulation/Simulation";
import SimulationSetting from "../components/simulation/SimulationSetting";
import { isSimulationState } from "../recoil/atoms/atoms";

const SimulationPage = () => {
  const isSimulation = useRecoilValue(isSimulationState);
  console.log(isSimulation);

  return <>{!isSimulation ? <SimulationSetting /> : <Simulation />}</>;
};

export default SimulationPage;
