import { HeaderBox } from "../elements/elements";
import { instance } from "../recoil/instance";

const SnsLoginPage = () => {
  const onClick = async () => {
    try {
      // console.log(process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
      const { data } = await instance.post(
        "social/google/isGoogle"
        // process.env.REACT_APP_GOOGLE_CLIENT_SECRET
      );
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
