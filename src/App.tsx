import { Helmet } from "react-helmet";
import GlobalStyle from "./shared/GlobalStyle";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <Helmet>
        <title>떨면뭐하니 테스트 코드</title>
      </Helmet>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
