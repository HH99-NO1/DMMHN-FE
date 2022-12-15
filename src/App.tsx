import GlobalStyle from "./shared/GlobalStyle";
import Router from "./shared/Router";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.debug = function no_console() {};
    console.warn = function no_console() {};
    console.warn = function () {};
  }
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
