import TopBar from "../components/top-bar/TopBar";

const FourOhFour = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <TopBar limited={true} />
      <div
        style={{
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          position: "absolute",
          textAlign: "center",
        }}
      >
        <h1>Error</h1>
        <p>This page doesn't exist!</p>
        <div
          className="button button-large"
          onClick={() => {
            window.location.href = "/app";
          }}
        >
          Return to site
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
