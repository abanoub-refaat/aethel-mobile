import { useState } from "react";
import React from "react";
import Toast from "../components/Toast";

export default function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const hideToast = () => setVisible(false);

  const ToastComponent = <Toast message={message} visible={visible} />;

  return { showToast, hideToast, ToastComponent };
}
