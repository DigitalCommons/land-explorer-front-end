import OpenMap from "./OpenMap";
import NewMap from "./NewMap";
import Location from "./Location";
import EmailShare from "./EmailShare";
import Download from "./Download";
import LinkShare from "./LinkShare";
import SaveCopy from "./SaveCopy";
import SaveSnapshot from "./SaveSnapshot";
import FeedbackForm from "./FeedbackForm";
import FeedbackPopUp from "./FeedbackPopUp";
import FeedbackSuccess from "./FeedbackSuccess";
import UserGuideModal from "./UserGuideModal";

const Modals = () => (
  <div>
    <EmailShare />
    <Download />
    <LinkShare />
    <SaveCopy />
    <SaveSnapshot />
    <OpenMap />
    <Location />
    <NewMap />
    <FeedbackForm />
    <FeedbackPopUp />
    <FeedbackSuccess />
    <UserGuideModal />
  </div>
);

export default Modals;
