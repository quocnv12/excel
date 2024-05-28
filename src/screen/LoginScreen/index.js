import { Button, Form, Input } from "antd";
import { useLoginMutation } from "features/auth/authApiSlice";
import { setCredentials } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginScreenWrapper } from "./styles";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    login(values).then((res) => {
      if (res.data) {
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.authorisation.token,
          })
        );

        localStorage.setItem("accessToken", res.data.authorisation.token);
      }
    });
    localStorage.setItem("currentScreen", "/dash/contract/list");
    navigate("/dash/contract/list");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginScreenWrapper>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginScreenWrapper>
  );
};

export default LoginScreen;
