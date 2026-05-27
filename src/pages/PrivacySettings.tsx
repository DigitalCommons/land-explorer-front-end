import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import Modal from "../components/modals/Modal";
import Button from "../components/common/Button";
import { closeModal } from "../actions/ModalActions";

const PrivacySettings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleClose = () => {    
    
  };

    return (
    <Modal
      id="privacySettings"
      customClass="privacy-settings__container"
      customClose={handleClose}
    >
      <div className="privacy-settings">
        <h1 className="privacy-settings__title">Privacy Settings</h1>
        <p className="privacy-settings__copy">
          Manage your privacy preferences and control how your data is used.
        </p>
        <div className="privacy-settings__actions">
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

export default PrivacySettings;

          