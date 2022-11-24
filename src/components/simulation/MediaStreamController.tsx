import { useRef } from "react";
export class MediaStreamController {
  private canvas!: HTMLCanvasElement;
  private mediaRecorder: MediaRecorder | null = null;
  private dataAvailableEvent = (e: BlobEvent) => this.handleDataAvaliable(e);

  public init(): void {
    this.canvas = document.getElementById(
      "local_video_area"
    ) as HTMLCanvasElement;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const localVideo = document.getElementById(
          "local_video"
        ) as HTMLVideoElement;
        localVideo.srcObject = stream;
        localVideo.play();

        setInterval(() => {
          this.canvas.width = localVideo.videoWidth;
          this.canvas.height = localVideo.videoHeight;
        });
      })
      .catch((err) => console.error(`An error occured: ${err}`));
  }
  public startRecording(): void {
    if (this.mediaRecorder != null) {
      this.mediaRecorder.removeEventListener(
        "dataavailable",
        this.dataAvailableEvent
      );
      this.mediaRecorder = null;
    }
    const stream = this.canvas.captureStream(60);
    const options = { mimeType: "video/webm; codecs=vp9" };
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = this.dataAvailableEvent;
    this.mediaRecorder.start();
  }
  public stopRecording(): void {
    if (this.mediaRecorder == null) {
      return;
    }
    this.mediaRecorder.stop();
  }
  private handleDataAvaliable(e: BlobEvent) {
    if (e.data.size <= 0) {
      return;
    }
    this.download(e.data);
  }
  private download(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const a = document.getElementById("download_link") as HTMLAnchorElement;
    a.style.display = "none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
