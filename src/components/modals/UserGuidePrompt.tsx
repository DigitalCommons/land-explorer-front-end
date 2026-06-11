import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import Modal from "./Modal";
import Button from "../common/Button";
import { closeModal, openModal } from "../../actions/ModalActions";
import { setUserGuidePromptSeen } from "../../actions/UserActions";
import constants from "@/constants";
import userGuidePreview from "../../assets/img/user-guide-preview.png";
import { UserGuideStatusData } from "@/types/user";

const userGuideModalName = "userGuidePrompt";

const UserGuidePrompt = () => {
  const dispatch = useAppDispatch();
  const { userGuidePromptSeen } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userGuidePromptSeen === false) {
      dispatch(openModal(userGuideModalName));
    }
  }, [userGuidePromptSeen]);

  const handleClose = (data: UserGuideStatusData) => {
    dispatch(setUserGuidePromptSeen(data));
    dispatch(closeModal(userGuideModalName));
  };

  const handleDismiss = () => {
    handleClose({
      userGuidePromptSeen: true,
      viewedUserGuide: false,
    });
  };

  const handleViewUserGuide = (source: string) => {
    const data = {
      userGuidePromptSeen: true,
      viewedUserGuide: true,
      viewedSource: source,
    };
    window.open(constants.USER_GUIDE_URL, "_blank");
    handleClose(data);
  };

  return (
    <Modal
      id="userGuidePrompt"
      customClass="user-guide-prompt-modal__container"
      customClose={handleDismiss}
    >
      <div className="user-guide-prompt-modal">
        <h1 className="user-guide-prompt-modal__title">
          New to Land Explorer?
        </h1>
        <p className="user-guide-prompt-modal__copy">
          We've put together a simple{" "}
          <a
            className="user-guide-prompt-modal__link"
            href={constants.USER_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleViewUserGuide("user-guide-prompt-modal-link")}
          >
            user guide
          </a>{" "}
          to help you get started. It walks through the basics of Land Explorer,
          so you can quickly find your way around.
        </p>
        <div className="user-guide-prompt-modal__image-container">
          <img
            src={userGuidePreview}
            alt="Preview of the user guide"
            className="user-guide-prompt-modal__image"
          />
        </div>
        <p className="user-guide-prompt-modal__copy">
          Don't worry, you can always find the user guide in the user menu.
        </p>
        <div className="user-guide-prompt-modal__actions">
          <Button
            buttonClass="rounded-button"
            type="button"
            buttonAction={() =>
              handleViewUserGuide("user-guide-prompt-modal-button")
            }
          >
            Check out the user guide
          </Button>
          <Button
            buttonClass="rounded-button-outline-lg"
            type="button"
            buttonAction={handleDismiss}
          >
            Start using Land Explorer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserGuidePrompt;
