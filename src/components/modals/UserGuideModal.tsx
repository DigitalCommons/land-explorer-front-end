import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import Modal from "./Modal";
import Button from "../common/Button";
import { closeModal, openModal } from "../../actions/ModalActions";
import { setUserGuideSeen } from "../../actions/UserActions";
import { trackEvent } from "../../analytics";
import constants from "@/constants";
import userGuidePreview from "../../assets/img/user-guide-preview.png";

const userGuideModalName = "userGuide";

const UserGuideModal = () => {
  const dispatch = useAppDispatch();
  const hasSeenUserGuide = useAppSelector((state) => state.user.hasSeenUserGuide);

  useEffect(() => {
    if (hasSeenUserGuide === false) {
      dispatch(openModal(userGuideModalName));
    }
  }, [hasSeenUserGuide]);

  const handleClose = () => {
    dispatch(setUserGuideSeen());
    dispatch(closeModal(userGuideModalName));
  };

  const handleViewUserGuide = () => {    
    window.open(constants.USER_GUIDE_URL, "_blank");
    handleClose();
  };

  return (
    <Modal id="userGuide" customClass="user-guide-modal__container" customClose={handleClose}>
      <div className="user-guide-modal">
        <h1 className="user-guide-modal__title">New to Land Explorer?</h1>
        <p className="user-guide-modal__copy">
          We've put together a simple <a className="user-guide-modal__link" href={constants.USER_GUIDE_URL} target="_blank" rel="noopener noreferrer">user guide</a> to help you get started. It walks through the basics of Land Explorer, so you can quickly find your way around.          
        </p>
        <div className="user-guide-modal__image-container">
        <img
          src={userGuidePreview}
          alt="Preview of the user guide"
          className="user-guide-modal__image"
        />
        </div>
         <p className="user-guide-modal__copy">
          Don't worry, you can always find the user guide in the user menu.
        </p>
        <div className="user-guide-modal__actions">          
          <Button
            buttonClass="button rounded-button-full"
            type="button"
            buttonAction={handleViewUserGuide}
          >
            Check out the user guide
          </Button>
          <Button
            buttonClass="button rounded-button-full"
            type="button"
            buttonAction={handleClose}
          >
            Start using Land Explorer
          </Button>
        </div>
       
      </div>
    </Modal>
  );
};

export default UserGuideModal;
