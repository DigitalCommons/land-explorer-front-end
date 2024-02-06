import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import constants from "../../constants";
import { getAuthHeader } from "../../utils/Auth";
import Modal from "./Modal";
import { getMyMaps } from "../../actions/MapActions";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import PillBadge from "../common/PillBadge";

const EmailShare = () => {
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState([]);
  const myMaps = useSelector((state) => state.myMaps.maps);
  const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
  const mapName = useSelector((state) => state.map.name);
  const readOnly = 1;
  const readWrite = 2;

  const options = [
    {
      value: readOnly,
      label: "Read Only",
      iconClass: "email-share__read-icon",
    },
    { value: readWrite, label: "Write", iconClass: "email-share__write-icon" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [selectedOptionLabel, setSelectedOptionLabel] = useState(options[0].label);

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    setSelectedOptionLabel(option.label);
  };

  const dispatch = useDispatch();

  const populateEmails = (emails) => {
    setEmails(
      emails.map((email) => ({
        emailAddress: email.emailAddress,
        access: email.access,
      }))
    );
  };

  const removeEmail = (i) => {
    const newEmails = emails.slice();
    newEmails.splice(i, 1);
    setEmails(newEmails);
  };

  const addEmail = () => {
    if (emailRegexp.test(input)) {
      const newEmails = emails.slice();
      newEmails.push({ emailAddress: input, access: selectedOption });
      setEmails(newEmails);

      setSelectedOption(options[0].value); // Reset selected option
      setSelectedOptionLabel(options[0].label); // Reset selected option label
      setInput("");
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "emailShare" });
    setInput("");
    setEmails([]);
    setSelectedOption(options[0].value);
  };

  useEffect(() => {
    myMaps.forEach((map) => {
      if (map.map.eid === currentMapId) {
        populateEmails(map.map.sharedWith);
        // setMapName(map.map.name);
      }
    });
  }, []);

  const share = (id) => {
    const newEmails = emails.map((email) => ({
      emailAddress: email.emailAddress,
      access: email.access,
    }));
    if (input !== "") {
      if (emailRegexp.test(input)) {
        newEmails.push({ emailAddress: input, access: selectedOption });
      }
    }
    if (newEmails.length === 0) return;

    const shareData = {
      eid: id,
      emailAddresses: newEmails.map((email) => email.emailAddress),
      access: newEmails.reduce((acc, email) => {
        acc[email.emailAddress] = email.access;
        return acc;
      }, {}),
    };

    axios
      .post(
        `${constants.ROOT_URL}/api/user/map/share/sync`,
        shareData,
        getAuthHeader()
      )
      .then(() => {
        closeModal();
        dispatch(getMyMaps());
      })
      .catch((err) => console.log("share error", err));
    console.log("shareData", shareData);
    console.log("Frontend payload.access:", shareData.access);
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

  console.log("myMaps", myMaps);
  console.log("currentMapId", currentMapId);

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
          options={options}
          onSelect={handleSelect}
          defaultLabel={selectedOptionLabel}
        />

        <Button
          buttonClass={"email-share__add-user__button"}
          type={"button"}
          buttonAction={addEmail}
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

      {selectedOption && <p>Selected Value: {selectedOption}</p>}
      {selectedOptionLabel && <p>Selected Label: {selectedOptionLabel}</p>}
      <div className="modal-content">
        <div
          className={`email-share__user-badge__container ${
            emails.length > 0 ? "populated" : ""
          }`}
        >
          {emails.map((emailObj, i) => {
            return (
              <PillBadge
                key={emailObj.emailAddress + i}
                title={emailObj.emailAddress}
                remove={() => removeEmail(i)}
                customClass={"pill-badge--email-share"}
                iconClass={
                  emailObj.access === readOnly
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
          buttonAction={() => {
            share(currentMapId);
          }}
        >
          Share
        </Button>
      </div>
    </Modal>
  );
};

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default EmailShare;
