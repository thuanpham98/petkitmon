import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflow: "auto",
        backgroundColor: "#fafafa",
      }}
    >
      <Outlet />
    </div>
  );
}

export default App;
