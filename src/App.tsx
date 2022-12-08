import { Helmet } from "react-helmet";
import GlobalStyle from "./shared/GlobalStyle";
import Router from "./shared/Router";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.warn = function () {};
  }
  return (
    <>
      <Helmet>
        <title>떨면뭐하니 - 떨리는 면접, 우리만 아는 방법이 있다!</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
