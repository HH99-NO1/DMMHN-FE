import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-style: normal;
}

* {
  box-sizing: border-box;
  /* font-family: 'Noto Sans KR', sans-serif; */
  font-family: 'Pretendard-Regular';
  line-height: 1.2;
  font-weight: 300;
  font-size: 14px;
  color: #222222
}

strong {
  font-weight: 600;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  /* font-family: 'Noto Sans KR', sans-serif; */
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  /* font: inherit; */
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

menu, ol, ul, li {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

body {
  line-height: 1;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}

/* .react-datepicker-wrapper{
  width: 50%;
} */

.react-datepicker__header {
  border-bottom: 1px solid ${(props) => props.theme.__greenMidium};
}

.birth-datepicker {
  border: none;
}
.react-datepicker {
  border: 1px solid ${(props) => props.theme.__grayLight};
  box-shadow: 0px 4px 4px rgb(0 0 0 / 0.05);

}

.react-datepicker__input-container{
  input{
    width: 100%;
    min-width: 100px;
    position: relative;
    padding: 8px 20px;
    border-radius: 67px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid ${(props) => props.theme.__grayLight};
    :focus {
      outline: 1px solid ${(props) => props.theme.__grayMedium};
    }
  }
  position: relative;
  width: 300px;
  @media screen and (max-width: 600px) {
    width: auto;
  }
}
.react-datepicker__close-icon {
  right: 0
}
.react-datepicker__close-icon::after {
  background-color: ${(props) => props.theme.__grayMedium};
}
.react-datepicker__day:hover {
  border-radius: 50%;
}
.react-datepicker__day--selected {
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.__greenMidium};
}
.react-datepicker__day--selected:hover {
  background-color: ${(props) => props.theme.__greenDark};
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
}

input:autofill,
input:autofill:hover,
input:autofill:focus,
input:autofill:active {
	-webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
}


`;

export default GlobalStyle;
