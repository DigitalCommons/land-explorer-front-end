import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEqual } from "lodash";
import axios from "axios";
import constants from "../../constants";
import { getAuthHeader } from "../../utils/Auth";
import Modal from "./Modal";
import { getMyMaps } from "../../actions/MapActions";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import PillBadge from "../common/PillBadge";

const accessOptions = [
  {
    value: constants.MAP_ACCESS_READ_ONLY,
    label: "Read Only",
    iconClass: "email-share__read-icon",
  },
  {
    value: constants.MAP_ACCESS_READ_WRITE,
    label: "Write",
    iconClass: "email-share__write-icon",
  },
];

const EmailShare = () => {
  const dispatch = useDispatch();

  const mapName = useSelector((state) => state.map.name);
  const myMaps = useSelector((state) => state.myMaps.maps);
  const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
  const modalOpen = useSelector((state) => state.modal.emailShare.open);
  const usersSharedWith =
    myMaps.find((map) => map.map.eid === currentMapId)?.map.sharedWith ?? [];

  const [input, setInput] = useState("");
  const [usersToShareWith, setUsersToShareWith] = useState(usersSharedWith);

  const [selectedAccess, setSelectedAccess] = useState(accessOptions[0].value);
  const [selectedAccessLabel, setSelectedAccessLabel] = useState(
    accessOptions[0].label
  );
  const [selectedAccessIcon, setSelectedAccessIcon] = useState(
    accessOptions[0].iconClass
  );

  // when the modal is re-opened, reset to the current set of users that the map is shared with
  useEffect(() => {
    setUsersToShareWith(usersSharedWith);
  }, [modalOpen]);

  const handleSelectAccess = (option) => {
    setSelectedAccess(option.value);
    setSelectedAccessLabel(option.label);
    setSelectedAccessIcon(option.iconClass);
  };

  const removeEmail = (email) => {
    setUsersToShareWith(
      usersToShareWith.filter((user) => user.email !== email)
    );
  };

  /** Add email if user has typed a valid email in the input field */
  const maybeAddEmail = () => {
    if (emailRegexp.test(input)) {
      // Remove user if already shared, to avoid duplication
      const newUsers = usersToShareWith.filter(
        (user) => user.email.toLowerCase() !== input.toLowerCase()
      );
      newUsers.push({ email: input, access: selectedAccess });
      setUsersToShareWith(newUsers);

      // Reset selected access
      setSelectedAccess(accessOptions[0].value);
      setSelectedAccessLabel(accessOptions[0].label);
      setSelectedAccessIcon(accessOptions[0].iconClass);
      setInput("");
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "emailShare" });
    setInput("");
    setUsersToShareWith([]);
    setSelectedAccess(accessOptions[0].value);
  };

  /**
   * Sync with the server so that the map is shared with the set of users that are currently
   * selected in the UI
   */
  const sync = async () => {
    // first add an email if the user has typed one, since they may not realise that they might not
    // realise they should click the 'add email' button
    maybeAddEmail();

    if (isEqual(usersSharedWith, usersToShareWith)) {
      return;
    }

    const shareData = {
      eid: currentMapId,
      users: usersToShareWith,
    };

    try {
      await axios.post(
        `${constants.ROOT_URL}/api/user/map/share/sync`,
        shareData,
        getAuthHeader()
      );

      // closeModal();
      dispatch(getMyMaps());
    } catch (err) {
      console.error("share error", err);
    }
  };

  if (currentMapId === null)
    return (
      <Modal id="emailShare" customClass={"email-share__container"}>
        <div className="email-share__title">Share</div>
        <div className="modal-content">
          <div>Please save map first!</div>
        </div>
      </Modal>
    );

  return (
    <Modal id="emailShare" customClass={"email-share__container"}>
      <div className="email-share__title">Share - {mapName}</div>
      <div className="email-share__add-user">
        <input
          className="email-share__add-user__input"
          type="text"
          placeholder="Email address"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <Dropdown
          options={accessOptions}
          onSelect={handleSelectAccess}
          defaultLabel={selectedAccessLabel}
          defaultIcon={selectedAccessIcon}
        />

        <Button
          buttonClass={"email-share__add-user__button"}
          type={"button"}
          buttonAction={maybeAddEmail}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.75 27">
            <path
              d="M20.25 13.5a6.75 6.75 0 1 0-6.75-6.75 6.77 6.77 0 0 0 6.75 6.75Zm0 3.375c-4.472 0-13.5 2.278-13.5 6.75V27h27v-3.375c0-4.472-9.028-6.75-13.5-6.75Z"
              fill="#707070"
            />
            <path
              d="M6.75 11.25v-4.5H4.5v4.5H0v2.25h4.5V18h2.25v-4.5h4.5v-2.25Z"
              fill="#707070"
            />
          </svg>
        </Button>
      </div>

      <div className="modal-content">
        <div
          className={`email-share__user-badge__container ${
            usersToShareWith.length > 0 ? "populated" : ""
          }`}
        >
          {usersToShareWith.map((user, index) => {
            return (
              <PillBadge
                key={user.email + index}
                title={user.email}
                remove={() => removeEmail(user.email)}
                customClass={"pill-badge--email-share"}
                iconClass={
                  user.access === constants.MAP_ACCESS_READ_ONLY
                    ? "email-share__pill_read-icon"
                    : "email-share__pill_write-icon"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="email-share__share-button__container">
        <Button
          buttonClass={"email-share__cancel-button"}
          type={"button"}
          buttonAction={closeModal}
        >
          Cancel
        </Button>
        <Button
          buttonClass={"email-share__share-button"}
          type={"button"}
          buttonAction={sync}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default EmailShare;
