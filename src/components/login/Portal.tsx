import React from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.getElementById("modal-login") as HTMLDivElement;
  return ReactDOM.createPortal(children, modalRoot);
};

export default Portal;
