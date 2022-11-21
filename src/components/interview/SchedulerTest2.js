/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from "react";
// import { styled } from "@mui/material/styles";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import { FlexCol, FlexRow } from "../../elements/elements";

const url = "http://localhost:3000";
const appointments = [
  {
    title: "프론트엔드 시니어(3년차 이상)",
    startDate: new Date(2022, 10, 2, 10, 0),
    endDate: new Date(2022, 10, 2, 11, 0),
    id: 0,
    url: "http://localhost:3000/interview/0",
  },
  {
    title: "백엔드 시니어(3년차 이상)",
    startDate: new Date(2022, 10, 5, 10, 0),
    endDate: new Date(2022, 10, 5, 11, 0),
    id: 1,
    url: "http://localhost:3000/interview/1",
  },
  {
    title: "리액트 마스터(5년차 이상)",
    startDate: new Date(2022, 10, 11, 14, 0),
    endDate: new Date(2022, 10, 11, 14, 30),
    id: 2,
    url: "http://localhost:3000/interview/2",
  },
  {
    title: "next.js 기술 면접",
    startDate: new Date(2022, 10, 15, 11, 0),
    endDate: new Date(2022, 10, 15, 12, 0),
    id: 3,
    url: "http://localhost:3000/interview/3",
  },
  {
    title: "next.js 기술 면접4",
    startDate: new Date(2022, 10, 15, 13, 0),
    endDate: new Date(2022, 10, 15, 14, 0),
    id: 8,
    url: "http://localhost:3000/interview/8",
  },
  {
    title: "next.js 기술 면접2",
    startDate: new Date(2022, 10, 17, 12, 0),
    endDate: new Date(2022, 10, 17, 12, 30),
    id: 4,
    url: "http://localhost:3000/interview/4",
  },
  {
    title: "next.js 기술 면접3",
    startDate: new Date(2022, 11, 1, 11, 0),
    endDate: new Date(2022, 11, 1, 12, 0),
    id: 5,
    url: "http://localhost:3000/interview/5",
  },
];

// #FOLD_BLOCK
const StyledDiv = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CopyBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  border: none;
  background-color: ${(props) => props.theme.__grayMedium};
  padding: 10px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: small;

  transform: translateY(-50%);
`;
const StdCloseBtn = styled.div`
  float: right;
`;
const StdHeader = styled.div`
  overflow: hidden;
  padding-top: 5px;
`;

const StdIcon = styled.div`
  margin: 20px 0;
  margin-right: 20px;
`;
const StyledFab = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  background-color: teal;
  width: 40px;
  height: 40px;
  cursor: pointer;
  & > svg {
    fill: white;
  }
`;
class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment("added")
      : () => this.commitAppointment("changed");

    const textEditorProps = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
    });
    const urlProps = (field) => ({
      value: displayAppointmentData[field],
    });
    const pickerEditorProps = (field) => ({
      // keyboard: true,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field]),
        }),
      ampm: false,
      inputFormat: "YYYY-MM-DD HH:mm",
      onError: () => null,
    });
    const startDatePickerProps = pickerEditorProps("startDate");
    const endDatePickerProps = pickerEditorProps("endDate");
    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize={false}
        onHide={onHide}
      >
        <StyledDiv>
          <StdHeader>
            <StdCloseBtn>
              <IconButton onClick={cancelChanges}>
                <Close color="action" />
              </IconButton>
            </StdCloseBtn>
          </StdHeader>
          <FlexCol gap="10px">
            <FlexRow width="100%">
              <StdIcon>
                <Create color="action" />
              </StdIcon>
              <TextField
                style={{ width: "100%" }}
                {...textEditorProps("title")}
              />
            </FlexRow>
            {!isNewAppointment && (
              <FlexRow style={{ position: "relative" }} width="100%">
                <StdIcon>
                  <Create color="action" />
                </StdIcon>
                <TextField style={{ width: "100%" }} {...urlProps("url")} />
                <CopyBtn>링크 복사하기</CopyBtn>
              </FlexRow>
            )}
            <FlexRow width="100%">
              <StdIcon>
                <CalendarToday color="action" />
              </StdIcon>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <FlexRow gap="10px" justifyContent="space-between">
                  <DateTimePicker
                    label="startDate"
                    renderInput={(props) => (
                      <TextField style={{ width: "100%" }} {...props} />
                    )}
                    {...startDatePickerProps}
                  />
                  <DateTimePicker
                    label="endDate"
                    renderInput={(props) => (
                      <TextField style={{ width: "100%" }} {...props} />
                    )}
                    {...endDatePickerProps}
                  />
                </FlexRow>
              </LocalizationProvider>
            </FlexRow>
            <FlexRow width="100%">
              <StdIcon>
                <Notes color="action" />
              </StdIcon>
              <TextField
                style={{ width: "100%" }}
                {...textEditorProps("memo")}
                multiline
                rows="6"
              />
            </FlexRow>
          </FlexCol>
          <FlexRow justifyContent="flex-end" gap="10px">
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                // className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment("deleted");
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              // className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? "Create" : "Save"}
            </Button>
          </FlexRow>
        </StyledDiv>
      </AppointmentForm.Overlay>
    );
  }
}

/* eslint-disable-next-line react/no-multi-comp */
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      // currentDate: "2018-06-27",
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility =
      this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange =
      this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment) =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
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
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;

    return (
      <Ctn>
        <Paper>
          <Scheduler data={data}>
            <ViewState
              //  currentDate={currentDate}
              defaultCurrentDate={new Date()}
            />
            <EditingState
              onCommitChanges={this.commitChanges}
              onEditingAppointmentChange={this.onEditingAppointmentChange}
              onAddedAppointmentChange={this.onAddedAppointmentChange}
            />

            <MonthView />
            <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showCloseButton
              showDeleteButton
            />

            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />

            <AppointmentForm
              overlayComponent={this.appointmentForm}
              visible={editingFormVisible}
              onVisibilityChange={this.toggleEditingFormVisibility}
            />
            <DragDropProvider />
          </Scheduler>

          <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
            <DialogTitle>경고!!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                정말 면접 스케줄을 삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.toggleConfirmationVisible}
                color="primary"
                variant="outlined"
              >
                취소
              </Button>
              <Button
                onClick={this.commitDeletedAppointment}
                color="secondary"
                variant="outlined"
              >
                삭제
              </Button>
            </DialogActions>
          </Dialog>

          <StyledFab
            color="secondary"
            // className={classes.addButton}
            onClick={() => {
              this.setState({ editingFormVisible: true });
              this.onEditingAppointmentChange(undefined);
              this.onAddedAppointmentChange({
                startDate: new Date(currentDate).setHours(startDayHour),
                endDate: new Date(currentDate).setHours(startDayHour + 1),
              });
            }}
          >
            <AddIcon />
          </StyledFab>
        </Paper>
      </Ctn>
    );
  }
}
// const Ctn = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
// `;

const Ctn = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;
