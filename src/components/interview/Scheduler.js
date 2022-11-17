import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  AppointmentTooltip,
  AppointmentForm,
  TodayButton,
  DateNavigator,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import styled from "styled-components";

const appointments = [
  {
    title: "프론트엔드 시니어(3년차 이상)",
    startDate: new Date(2022, 10, 2, 10, 0),
    endDate: new Date(2022, 10, 2, 11, 0),
    id: 0,
    location: "Room 1",
  },
  {
    title: "백엔드 시니어(3년차 이상)",
    startDate: new Date(2022, 10, 5, 10, 0),
    endDate: new Date(2022, 10, 5, 11, 0),
    id: 1,
    location: "Room 1",
  },
  {
    title: "리액트 마스터(5년차 이상)",
    startDate: new Date(2022, 10, 11, 14, 0),
    endDate: new Date(2022, 10, 11, 14, 30),
    id: 2,
    location: "Room 1",
  },
  {
    title: "next.js 기술 면접",
    startDate: new Date(2022, 10, 15, 11, 0),
    endDate: new Date(2022, 10, 15, 12, 0),
    id: 3,
    location: "Room 1",
  },
  {
    title: "next.js 기술 면접2",
    startDate: new Date(2022, 10, 17, 12, 0),
    endDate: new Date(2022, 10, 17, 12, 30),
    id: 4,
    location: "Room 1",
  },
  {
    title: "next.js 기술 면접3",
    startDate: new Date(2022, 11, 1, 11, 0),
    endDate: new Date(2022, 11, 1, 12, 0),
    id: 5,
    location: "Room 1",
  },
];

export default () => {
  const [currentViewName, setCurrentViewName] = useState("month");
  const [data, setData] = useState(appointments);

  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setData((curr) => {
      console.log(added);
      console.log(changed);
      console.log(deleted);
      console.log(curr);
      let data = curr;

      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }

      return data;
    });
  };

  return (
    <Ctn>
      {/* <Paper>
        <Scheduler data={appointments} height={"auto"}>
          <ViewState
            defaultCurrentDate={new Date()}
            currentDate={new Date()}
            currentViewName={currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />

          <MonthView name="month" displayName="월" />
          <WeekView
            name="week"
            displayName="주"
            startDayHour={10}
            endDayHour={19}
          />
          <DayView
            name="day"
            displayName="일"
            startDayHour={10}
            endDayHour={19}
          />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper> */}
      <Paper>
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={new Date()}
            // currentDate={new Date()}
            currentViewName={currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />

          <MonthView name="month" displayName="월" />
          <WeekView
            name="week"
            displayName="주"
            startDayHour={10}
            endDayHour={19}
          />
          <DayView
            name="day"
            displayName="일"
            startDayHour={10}
            endDayHour={19}
          />

          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </Ctn>
  );
};

const Ctn = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
