import { useRecoilValue } from "recoil";
import Simulation from "../components/simulation/Simulation";
import SimulationGuide from "../components/simulation/SimulationGuide";
import SimulationSetting from "../components/simulation/SimulationSetting";
import { isLoginState, isSimulationState } from "../recoil/atoms/atoms";

const SimulationPage = () => {
  const isSimulation = useRecoilValue(isSimulationState);
  const isLogin = useRecoilValue(isLoginState);

  return (
    <>
      {isLogin ? (
        !isSimulation ? (
          <SimulationSetting />
        ) : (
          <Simulation />
        )
      ) : (
        <SimulationGuide />
      )}
    </>
  );
};

export default SimulationPage;
