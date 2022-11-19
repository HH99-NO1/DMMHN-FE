import { useState } from "react";

interface IInterview {
  interviewId: string;
  createdAt: string;
  updatedAt: string;
  __interviewManager: string;
  __interviewTime: {
    start: string;
    end: string;
  };
  __interviewTopic: string;
  __interviewOption: {
    onMuted: boolean;
  };
  interviewDone: boolean;
  interviewUrl: {
    isDone: boolean;
    url: string;
  };
  interviewCancelMessage: string;
  interviewMembers: {
    interviewer: [string];
    common: [string];
  };
}

const ViewPort = () => {
  const [interview, setInterview] = useState<IInterview>();
  return (
    <div>
      ViewPort
      {interview?.__interviewTime.start}
    </div>
  );
};

export default ViewPort;

const 기업별_면접일정 = [
  {
    기업ID: 14123,
    기업명: "팀스파르타",
    면접: [
      {
        // 자동 생성
        interviewId: "12123saqw123",
        createdAt: "2022-11-11 00:00:00 GMP",
        updatedAt: "2022-11-11 00:00:00 GMP",

        // 면접 예약: req: "__"로 표기
        __interviewManager: "김르탄",
        __interviewTime: {
          start: "2022-11-11 00:00:00 GMP",
          end: "2022-11-11 00:00:00 GMP",
        },
        __interviewTopic:
          "2022년 웹개발 프론트엔드 주니어 (1~2년차) 3차 공개채용 면접(1차)",
        __interviewOption: {
          onMuted: true,
        },

        // 신규 면접 생성 시, default 값
        interviewDone: false, // 진행 예정 면접과 이미 진행된 면접을 구분하기 위함
        interviewUrl: {
          isDone: false, // isDone이 true가 되면 링크가 활성화(접속 가능)되게 한다.
          url: "${url}", // 활성화되지 않았으나 접속할 경우, 에러메세지 송출
        },
        interviewCancelMessage: "", // "면접 취소에 대한 상세한 사유 작성"
        // 면접취소: "면접자의 개인 사정으로 인해 해당 면접이 취소됨",
        interviewMembers: {
          interviewer: [],
          common: [],
        }, // 처음에 null 값이나, 면접 진행 간 참석한 사람(id값 비교)을 객체로 넣어준다.
        // 참석자: {
        //   면접관: [김르탄, 김파탄], // 만일 여러면의 면접관이 들어올 경우, 면접관 배열에 push()
        //   면접자: [홍길동1234, 김철수1324, 박혜리2222], // 면접자의 이름+핸드폰 번호 뒷자리 4개로 작성
        // }
      },
    ],
  },
];
