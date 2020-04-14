import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
// import useLocalStorage from "utils/useLocalStorage";
import { useAppContext, setToken } from "store";
import { parseErrorMessages } from "utils/forms";

function Login() {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" }};

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      const data = { username, password }; 
      try {
        const response = await axios.post("http://localhost:8000/accounts/token/", data);
        const { data: { token: jwtToken } } = response;

        dispatch(setToken(jwtToken));

        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });

        history.push(loginRedirectUrl);
      }
      catch(error) {
        if(error.response) {
          notification.open({
            message: "로그인  실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: ["m1", "m2", password: [] }
          
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }          
      }
    }
    fn();
  };

  return (
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 3, message: "3글자 이상 입력해주세요."}
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default Login;