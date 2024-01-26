import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Modal = ({ style, customClass, padding, id, customClose, children }) => {
  const dispatch = useDispatch();
  const { open, canToggle } = useSelector((state) => state.modal[id]);
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState("-100%");

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpacity(1);
        setTranslateY("-50%");
      }, 100);
    }
  }, [open]);

  const closeModal = () => {
    setOpacity(0);
    setTranslateY("-100%");
    setTimeout(() => {
      dispatch({ type: "CLOSE_MODAL", payload: id });
      if (customClose) {
        customClose();
      }
    }, 300);
  };

  return (
    <div
      id={id}
      className="Modal modal"
      style={Object.assign(
        {},
        style,
        open === false ? { display: "none" } : { opacity: opacity }
      )}
    >
      <div
        className="ModalBackground"
        onClick={() => {
          if (canToggle === true) {
            closeModal();
          }
        }}
      />
      <div
        className={`ModalContent modal ${customClass ? customClass : ""} ${
          padding ? " modal-padding" : ""
        } `}
        style={{ transform: `translateX(-50%) translateY(${translateY})` }}
      >
        {canToggle === true && (
          <div className="modal-close" onClick={closeModal} />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
