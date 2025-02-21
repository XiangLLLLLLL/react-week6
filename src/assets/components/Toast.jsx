import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { useDispatch } from "react-redux";
import { removeMessage } from "../slice/toastSlice";
export default function Toast() {
  const messages = useSelector((state) => state.toasts.messages);
  const toastRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    messages.forEach((message) => {
      const toastEl = toastRef.current[message.id];
      if (toastEl) {
        const toastInstanace = new BsToast(toastEl);
        toastInstanace.show();

        setTimeout(() => {
          dispatch(removeMessage(message.id));
        }, 3000);
      }
    });
  }, [messages]);

  const handleCloseMessage = (messageId) => {
    dispatch(removeMessage(messageId));
  };

  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
        {messages.map((message) => (
          <div className="toast" ref={(el) => (toastRef.current[message.id] = el)} key={message.id} role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${message.success ? "bg-success" : "bg-danger"} text-white`}>
              <strong className="me-auto">{message.success ? "成功" : "失敗"}</strong>
              <button onClick={() => handleCloseMessage(message.id)} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}
