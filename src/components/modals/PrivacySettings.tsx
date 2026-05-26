import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import Modal from "./Modal";
import Button from "../common/Button";
import { closeModal } from "../../actions/ModalActions";


const privacySettingsModalName = "privacySettings";

const PrivacySettingsModal = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleClose = () => {    
    dispatch(closeModal(privacySettingsModalName));
  };

    return (
    <Modal
      id="privacySettings"
      customClass="privacy-settings-modal__container"
      customClose={handleClose}
    >
      <div className="privacy-settings-modal">
        <h1 className="privacy-settings-modal__title">Privacy Settings</h1>
        <p className="privacy-settings-modal__copy">
          Manage your privacy preferences and control how your data is used.
        </p>
        <div className="privacy-settings-modal__actions">
          <Button
            buttonClass="rounded-button"
            type="button"
            buttonAction={handleClose}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PrivacySettingsModal;

          