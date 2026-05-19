import { useState, useEffect, CSSProperties, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";

type Props = {
  style?: CSSProperties;
  customClass?: string;
  padding?: boolean;
  id: string;
  customClose?: () => void;
  children?: ReactNode;
  slideDirection?: string;
};

const Modal = ({
  style,
  customClass,
  padding,
  id,
  customClose,
  children,
  slideDirection,
}: Props) => {
  const dispatch = useAppDispatch();
  const { open, canToggle } = useAppSelector((state) => state.modal[id]);
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(
    slideDirection === "right" ? "-50%" : "-100%"
  );
  const [translateX, setTranslateX] = useState(
    slideDirection === "right" ? "100%" : "-50%"
  );

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpacity(1);
        setTranslateY("-50%");
        setTranslateX("-50%");
      }, 100);
    }
  }, [open]);

  const closeModal = () => {
    setOpacity(0);
    setTranslateY(slideDirection === "right" ? "-50%" : "-100%");
    setTranslateX(slideDirection === "right" ? "100%" : "-50%");
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
        style={{
          transform: `translateX(${translateX}) translateY(${translateY})`,
        }}
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
