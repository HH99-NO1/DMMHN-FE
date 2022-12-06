import { HeaderBox } from "../elements/elements";
import { instance } from "../recoil/instance";

const SnsLoginPage = () => {
  const onClick = async () => {
    try {
      const { data } = await instance.post("google/isGoogle");
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <HeaderBox />
      <button onClick={() => onClick()}>구글 로그인</button>
    </>
  );
};
export default SnsLoginPage;
