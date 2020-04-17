import React, { useState, useEffect } from "react";
import { axiosInstance } from "utils/api";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});
  
  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      const data = { username, password }; 
      try {
        await axiosInstance.post("/accounts/signup/", data);
        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });
        history.push("login");
      }
      catch(error) {
        if(error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: ["m1", "m2", password: [] }
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
              acc[fieldName] = {
                validateStatus: "error",
                help: errors.join(" ")
              };
              return acc;
            }, {})
          )
        }          
      }
    }
    fn();
  };
  return (
    <Form
      {...layout}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
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
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default Signup;
