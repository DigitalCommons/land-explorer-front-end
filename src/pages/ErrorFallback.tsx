import TopBar from "../components/top-bar/TopBar";
import Button from "../components/common/Button";

type Props = { error: Error };

const ErrorFallback = ({ error }: Props) => {
  console.log("Boundary Error", error);
  return (
    <>
      <TopBar limited={true} />
      <div className="error-page">
        <h1>Oops! Something went wrong...</h1>
        <Button
          buttonClass={"button-new blue"}
          type={"button"}
          buttonAction={() => {
            window.location.href = "/app";
          }}
        >
          Back to LandExplorer
        </Button>
      </div>
    </>
  );
};

export default ErrorFallback;
