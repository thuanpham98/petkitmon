import Lotie from "lottie-react";
import loaderLogo from "./loties/loading-logo.json";

const Loader = ({
  width = 240,
  height = 240,
  data = loaderLogo,
}: {
  width?: number;
  height?: number;
  data?: unknown;
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Lotie
        width={`${width}px`}
        height={`${height}px`}
        animationData={data}
        loop={true}
      />
    </div>
  );
};

export default Loader;
