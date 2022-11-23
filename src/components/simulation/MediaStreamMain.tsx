import { MediaStreamController } from "./MediaStreamController";

let controller: MediaStreamController;
let recording = false;

export function init(): void {
  controller = new MediaStreamController();
  controller.init();
}

export function record(): void {
  if (recording === true) {
    controller.stopRecording();
    recording = false;
  } else {
    controller.startRecording();
    recording = true;
  }
}
