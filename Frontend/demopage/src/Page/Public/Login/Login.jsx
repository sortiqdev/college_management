import { Tabs, Tab } from "@mui/material";
import { School, Person } from "@mui/icons-material";
import { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import video from "../../../assets/Video/video.mp4";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState("student");
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!captchaValue) {
      message.warning("Please verify that you are not a robot.");
      return;
    }

    const payload = {
      role,
      email: values.email,
      password: values.password,
      ...(role === "teacher" && {
        organizationCode: values.organizationCode,
      }),
    };

    console.log("LOGIN PAYLOAD 👉", payload);

    recaptchaRef.current?.reset();
    setCaptchaValue(null);
    form.resetFields();
  };

  return (
    <div className="login-root">

      {/* BACKGROUND VIDEO */}
      <video autoPlay muted loop playsInline className="login-video">
        <source src={video} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="login-overlay" />

      {/* CONTENT */}
      <div className="login-container">

        <div className="login-grid">

          {/* LEFT INFO */}
          <div className="login-left">
            <h1>Sortiq Management Software</h1>
            <p className="tagline">
              Integrate Technology With Modern Education
            </p>
            <p className="desc">
              Integrated School, College & Institute Management System that
              streamlines academics, administration, and operations using
              modern technology.
            </p>
            <span className="divider" />
          </div>

          {/* LOGIN CARD */}
          <div className="login-right">
            <div className="login-card">

              <h2>Login Portal</h2>
              <p className="role-text">
                Login as {role === "student" ? "Student" : "Teacher"}
              </p>

              <Tabs value={role} onChange={(_, v) => setRole(v)} centered>
                <Tab icon={<School />} label="Student" value="student" />
                <Tab icon={<Person />} label="Teacher" value="teacher" />
              </Tabs>

              <Form layout="vertical" form={form} onFinish={onFinish}>

                {role === "teacher" && (
                  <Form.Item
                    label="Org Code"
                    name="organizationCode"
                    rules={[{ required: true, message: "Organization code is required" }]}
                    className="animate-slide"
                  >
                    <Input className="input"  styles={{ input: { height: 30 } }} />
                  </Form.Item>
                )}

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input className="input" styles={{ input: { height: 30 } }} />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password className="input" styles={{ input: { height: 30 } }} />
                </Form.Item>

                {/* CAPTCHA */}
                <div className="captcha-wrap">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="YOUR_SITE_KEY_HERE"
                    onChange={setCaptchaValue}
                  />
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-btn"
                  styles={{ input: { height: 30 } }}
                >
                  Login as {role}
                </Button>

              </Form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
