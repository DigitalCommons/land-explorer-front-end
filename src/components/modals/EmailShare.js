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
  //   const [mapName, setMapName] = useState("");
  const myMaps = useSelector((state) => state.myMaps.maps);
  const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
  const mapName = useSelector((state) => state.map.name);

  const options = [
    { value: "read", label: "Read Only" },
    { value: "write", label: "Write" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleSelect = (option) => {
    setSelectedOption(option.value);
  };

  const dispatch = useDispatch();

  const populateEmails = (emails) => {
    setEmails(emails.map((email) => email.emailAddress));
  };

  const removeEmail = (i) => {
    const newEmails = emails.slice();
    newEmails.splice(i, 1);
    setEmails(newEmails);
  };

  const addEmail = () => {
    if (emailRegexp.test(input)) {
      const newEmails = emails.slice();
      newEmails.push(input);
      setEmails(newEmails);

      setSelectedOption(selectedOption);
      console.log("selected option", selectedOption);
      setInput("");
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "emailShare" });
    setInput("");
    setEmails([]);
  };

  // Does not work - hence no map name in email share modal
  //   useEffect(() => {
  //     myMaps.forEach((map) => {
  //       if (map.map.eid === currentMapId) {
  //         populateEmails(map.map.sharedWith);
  //         setMapName(map.map.name);
  //       }
  //     });
  //   }, []);

  const share = (id) => {
    const newEmails = emails.slice();
    if (input != "") {
      if (emailRegexp.test(input)) {
        newEmails.push(input);
        setInput("");
        setEmails(newEmails);
      }
    }
    if (newEmails.length === 0) return;
    const shareData = {
      eid: id,
      emailAddresses: newEmails,
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
          defaultLabel={"Permissions"}
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
      <div className="modal-content">
        <div className="email-share__user-badge__container">
          {emails.map((email, i) => {
            return (
              <PillBadge
                key={email + i}
                title={email}
                remove={() => removeEmail(i)}
                customClass={"pill-badge--email-share"}
              />
            );
          })}
        </div>
      </div>
      <div className="modal-buttons-float">
        <div
          className="button button-cancel rounded-button-full modal-button-cancel"
          onClick={closeModal}
        >
          Cancel
        </div>
        <div
          className={`button rounded-button-full modal-button-confirm`}
          onClick={() => {
            share(currentMapId);
          }}
        >
          Share
        </div>
      </div>
    </Modal>
  );
};

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default EmailShare;
