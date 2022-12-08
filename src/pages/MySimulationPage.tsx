import { useRecoilValue } from "recoil";
import CustomSimulation from "../components/customSimulation/CustomSimulation";
import MySimulation from "../components/mySimulation/MySimulation";
import { isCustom } from "../recoil/atoms/atoms";

const MySimulationPage = () => {
  const isCustomState = useRecoilValue(isCustom);
  return <>{!isCustomState ? <MySimulation /> : <CustomSimulation />}</>;
};

export default MySimulationPage;
