import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { instance } from "../../recoil/instance";

const NaverTTS = () => {
  const [value, setValue] = useState("");

  const requestAudioFile = async () => {
    console.log("request Audio");

    try {
      const config = {
        // data: "테스트 글입니다.",
        question: value,
      };

      // const response = await axios.post(
      //   "https://dgbnb.shop/mockInterview/getQuestionsVoice",
      //   req
      const response = await instance.post(
        "mockInterview/getQuestionsVoice",
        config,
        {
          responseType: "arraybuffer",
        }
      );
      console.log("response : ", response);

      // let arr = toArrayBuffer(response.data);
      // makeAudio(arr);
      const audioContext = getAudioContext();

      // makeAudio(response)
      const audioBuffer = await audioContext.decodeAudioData(response.data);

      //create audio source

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      console.log("source : ", source);
      // setAudioSource(source);
    } catch (e) {
      console.log(e);
    }
  };

  const getAudioContext = () => {
    AudioContext = window.AudioContext; /* || window.webkitAudioContext */
    const audioContent = new AudioContext();
    return audioContent;
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onsubmit = (event) => {
    event.preventDefault();
    requestAudioFile();
  };

  return (
    <div>
      NaverTTS
      <br />
      <form onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="텍스트를 입력해주세요."
          value={value}
          onChange={onChange}
        />
        <br />
        <button>제출!</button>
      </form>
    </div>
  );
};

export default NaverTTS;
