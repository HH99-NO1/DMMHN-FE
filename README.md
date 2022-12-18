# 😎 면접깡패 양성 프로그램, 떨면 뭐하니

&nbsp;
![KakaoTalk_20221212_152425796](https://user-images.githubusercontent.com/98001726/206976472-b9ef65a4-df2e-45ad-b346-95463e1032ec.png)

> 떨면 뭐하니는 IT개발 분야 모의 면접 서비스입니다.  
> 프로젝트는 2022.11.04 ~ 2022.12.16 일간 진행되었습니다.

👉 [떨면뭐하니 바로 가기](https://itterview.com)  
&nbsp;

<hr>

&nbsp;

## 📢 주요 기능

- 질문(텍스트)을 음성(보이스)으로 변환하여 AI 모의면접관이 직접 질문을 읽어주고,
  각 질문의 소요 시간을 측정하여 실제 면접처럼 긴장되는 모의면접을 체험할 수 있어요.
- IT 개발자를 위한 면접 질문의 프리셋
  (현재 React.js, Node.js, Spring 총 3가지 프리셋 적용)
- 내가 원하는 질문이 없어도 걱정하지 마세요!
  내가 직접 입력한 질문으로 커스텀 모의 면접을 진행할 수 있어요.

&nbsp;

## 🌉 아키텍처

<img width="100%" alt="서비스 아키텍처" src="https://user-images.githubusercontent.com/98001726/206996021-1d6871a8-e616-4531-b233-e0c3c6f6c60e.png">

&nbsp;

## 🛠 사용한 기술

<p align=center>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/RecordRTC-61DAFB?style=for-the-badge&logo=RecordRTC&logoColor=black">
  <img src="https://img.shields.io/badge/RECOIL-0550ae?style=for-the-badge&logo=RECOIL&logoColor=black">
  <img src="https://img.shields.io/badge/React--Hook--Form-EC5990?style=for-the-badge&logo=React-Hook-Form&logoColor=white">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/
axios-5A29E4?style=for-the-badge&logo=
axios&logoColor=white">
<br>
  <img src="https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=Amazon AWS&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
</p>

🌟 [더 자세한 내용 보러가기](https://fog-cyclone-297.notion.site/b101de37e067486399ae7bf539cd03f7)

&nbsp;

## ⚽ 트러블 슈팅

### 1. 소요시간 실시간 피드백

| 구분                                         | 설명                                                                                                                                                                                                                                                                                         |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|도입 이유| 모의면접 진행 시, 전체 및 질문별 진행시간을 유저에게 실시간으로 피드백|
|문제 상황| 브라우저 렌더링 및 부하, 함수 딜레이 등으로 실제 시간과 맞지 않는 오차가 발생하기 시작<br>ex) 실제 5초 경과 시, 2초만 흐른 것으로 보임 |
|해결 방안| 1안) setInterval()로 일정 시간마다 항상 정확한 시스템 시간을 Date.now() 메서드로 받아와 오차를 줄이는 방법(시간의 정확도는 문제가 없음)<br>2안) moment.js 등 라이브러리를 사용하여 해결|
|의견 조율| • 2안의 경우, 타이머 구현을 위해 라이브러리 사용이 불필요하다고 느끼며, 내부 로직이 setInterval()을 쓰는 것은 같음<br>setInterval()을 자주 사용하면 매번 렌더링이 일어나 성능이 저하될 가능성이 있음<br>• interval이 남아있을 때, 시간을 누르면 전 시각의 값을 가져와 계산하여 오차가 발생함 |
|의견 결정| • 불필요한 렌더를 줄이기 위해 컴포넌트 분리 및 커스텀 훅 제작 및 활용|

&nbsp;

### 2. 화면 녹화 기능

| 구분      | 설명                                                                                                                                                                                                                                                                                                                              |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 도입 이유 | 모의면접 시의 내용을 녹화하여 유저에게 제공(억양, 표정, 포즈 등 확인)                                                                                                                                                                                                                                                             |
| 문제 상황 | • react-media-recorder, react-record-webcam, react-video-recorder는 메모리를 상당히 많이 차지하여, 브라우저가 제대로 뜨지 않는 현상이 발생<br>• 브라우저의 전체 화면을 공유하는 식으로 녹화가 되고 있음<br>• 유저가 면접을 보고 난 후, 다운로드 방식을 서버에 저장해야 할 지, 로컬에 저장해야 할 지에 대한 문제                   |
| 해결 방안 | 1안) recordRTC를 변경하지 않고, 기존 코드에서 변경<br>2안) recordRTC에 추가적인 라이브러리를 사용                                                                                                                                                                                                                                 |
| 의견 조율 | • recordRTC를 사용하기로 결정, 기존 자바스크립트로 되어있는 코드를 타입스크립트로 변경<br>• 화면 녹화를 기존 전체 화면 녹화가 아닌 나의 웹캠을 통한 녹화로 하기로 결정<br>• 서버에 저장 시에 유저가 모의 면접을 본 자료들이 당사 서버에 저장이 되어있기 때문에 보안상의 문제와 유저들의 신뢰성 문제가 있어서 로컬에 저장하기로 함 |
| 의견 결정 | 모의면접 진행 시에 나의 화면이 보이게끔 한 후, 모의 면접이 종료되었을 때 녹화된 화면을 보여지게 함                                                                                                                                                                                                                                |

&nbsp;

### 3. TTS(Text-to-speech)

| 구분      | 설명                                                                                                                                                                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 도입 이유 | 모의면접을 위해 사용자가 모의면접 환경에 집중할 수 있도록 텍스트 질문을 음성으로 반환                                                                                                                                                                                                                                           |
| 문제 상황 | • 브라우저 자체 내장 api인 SpeechSynthesis는 브라우저마다, 사용자의 접속 환경(OS)마다 조금씩 다르게 음성을 합성함(peech, rate, lang 등)<br>• SpeechSynthesis는 기계음에 가까워 모의면접에 대한 집중도가 떨어짐                                                                                                                  |
| 해결 방안 | 1안) google cloud TTS Api를 이용하여 실시간 번역(90일 무료)<br>2안) clova voice Api를 이용하여 실시간 번역(월 9만원)<br>3안) clova dubbing Api를 이용하여 미리 셋팅된 질문을 음성으로 미리 변환하여 사용자에게 오디오 파일로 스트리밍(일부 유료)                                                                                |
| 의견 조율 | • SpeechSynthesis의 경우, FE만 코드 작성이 필요한 것에 반해, 외부 Api를 이용 시 BE에서 api를 호출할 세팅 및 base64로 음성파일을 FE에 전달하여 송출하여야 하는 형태임.<br>이미 입력된 값만을 음성으로 변환하는 것이 아닌 유저가 직접 입력한 input 값을 음성으로 변환하여 유저와 앱이 상호작용하고 있다는 것을 보여줄 필요가 있음 |
| 의견 결정 | • 초기 세팅을 SpeechSynthesis로 테스트해보고, clova voice api를 사용.<br>• 프리셋(이미 선정된 질문) 외 유저의 입력값도 변환할 수 있도록 변경함                                                                                                                                                                                  |

&nbsp;

## 🚩 맡은 역할

| 이름   | 역할                                                                            |
| ------ | ------------------------------------------------------------------------------- |
| 정재연 | TTS(Text-to-speech), 커스텀 질문, 질문 타이머, aws cloudfront 배포, 에러 핸들링 |
| 이성훈 | 로그인, 회원 가입, 회원정보 수정, 회원 탈퇴                                     |
| 이현하 | 모의 면접, 화면 녹화, css, 반응형(모바일), Lighthouse 테스트                    |
