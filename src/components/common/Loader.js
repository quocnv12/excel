import { Spin } from "antd";
import { SpinContainer } from "./styles";

const Loader = () => {
  return (
    <SpinContainer>
      <Spin size="large" />
    </SpinContainer>
  );
};

export default Loader;
