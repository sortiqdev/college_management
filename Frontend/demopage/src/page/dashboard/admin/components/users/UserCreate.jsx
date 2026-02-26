import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Divider,
  Row,
  Col,
  Switch,
  Upload,
  message,
  DatePicker,
} from "antd";
import { LockOutlined, UploadOutlined } from "@ant-design/icons";
import API from "../../../../../services/api";

const courseDepartmentMap = {
  btech: ["CSE", "Mechanical", "Civil", "Electrical", "AI & DS" , "IT", "ECE"],
  polytechnic: ["Mechanical", "Civil", "Electrical","instrumentation","CSE"],
  law: ["Corporate Law", "Criminal Law"],
  pharmacy: ["Pharmaceutics", "Pharmacology"],
  hotel: ["Hotel Operations", "Culinary Arts"],
  veterinary: ["Animal Science", "Surgery"],
  bca: ["Computer Applications"],
  bsc: ["Physics", "Chemistry", "Maths" , "Biology"   ],
  bed: ["Education", "Special Education", "Physical Education"],
  mba: ["Finance", "Marketing", "HR", "Operations"],
  phd: ["Research", "Teaching", "Industry", "Postdoc", "Fellowship"],
  mtech: ["Advanced Engineering", "Research", "Teaching"],
};

const UserCreate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const selectedRole = Form.useWatch("role", form);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const payload = {};

      // Helper function to convert file to base64
      const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // Process values
      for (let key of Object.keys(values)) {
        if (values[key]) {
          if (Array.isArray(values[key])) {
            // Handle file arrays
            payload[key] = [];
            for (let item of values[key]) {
              if (item.originFileObj) {
                const base64 = await fileToBase64(item.originFileObj);
                payload[key].push({
                  name: item.name,
                  size: item.size,
                  data: base64,
                });
              }
            }
          } else if (values[key]?._isAMomentObject) {
            // Handle DatePicker values
            payload[key] = values[key].format("YYYY-MM-DD");
          } else {
            payload[key] = values[key];
          }
        }
      }

      console.log("==== Payload Sent To Backend ====");
      console.log(JSON.stringify(payload, null, 2));

      await API.post("/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      message.success("User Registered Successfully");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card title="Create User" className="rounded-2xl shadow-md">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* BASIC INFO */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* ROLE */}
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              size="large"
              options={[
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
                { label: "Admin", value: "admin" },
              ]}
            />
          </Form.Item>

          <Divider />

          {/* COMMON FIELDS FOR ALL ROLES */}
          <h3>Additional Information</h3>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true }]}>
                <DatePicker size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Age" name="age" rules={[{ required: true }]}>
                <Input size="large" type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Registration Number" name="registrationNumber" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* STUDENT SECTION */}
          {selectedRole === "student" && (
            <>
              <Divider />
              <h3>Student Details</h3>

              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select
                  size="large"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="10th School Name" name="tenthSchool" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="10th Percentage" name="tenthPercentage" rules={[{ required: true }]}>
                    <Input size="large" type="number" step="0.01" max="100" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="12th School Name" name="twelfthSchool" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="12th Percentage" name="twelfthPercentage" rules={[{ required: true }]}>
                    <Input size="large" type="number" step="0.01" max="100" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="ITI / Polytechnic (If Any)" name="previousCourse">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Previous Course Percentage (If Any)" name="previousCoursePercentage">
                    <Input size="large" type="number" step="0.01" max="100" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <h3>Parent Information</h3>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Parent Name" name="parentName" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Parent Phone" name="parentPhone" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <h3>Course Enrollment</h3>

              <Form.Item label="Select Course" name="course" rules={[{ required: true }]}>
                <Select
                  size="large"
                  options={Object.keys(courseDepartmentMap).map((course) => ({
                    label: course.toUpperCase(),
                    value: course,
                  }))}
                />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => {
                  const selectedCourse = form.getFieldValue("course");
                  const departments = courseDepartmentMap[selectedCourse] || [];
                  return (
                    <Form.Item
                      label="Department"
                      name="department"
                      rules={[{ required: true }]}
                    >
                      <Select
                        size="large"
                        options={departments.map((dep) => ({
                          label: dep,
                          value: dep,
                        }))}
                      />
                    </Form.Item>
                  );
                }}
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Year" name="year" rules={[{ required: true }]}>
                    <Select
                      size="large"
                      options={[1, 2, 3, 4].map((y) => ({
                        label: `${y} Year`,
                        value: y,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Semester" name="semester" rules={[{ required: true }]}>
                    <Select
                      size="large"
                      options={[1,2,3,4,5,6,7,8].map((s) => ({
                        label: `Sem ${s}`,
                        value: s,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Upload Documents"
                name="documents"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload beforeUpload={() => false} multiple>
                  <Button icon={<UploadOutlined />}>Upload Documents</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Upload Photo"
                name="photo"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          {/* TEACHER SECTION */}
          {selectedRole === "teacher" && (
            <>
              <Divider />
              <h3>Teacher Details</h3>

              <Form.Item label="Highest Qualification" name="qualification" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>

              <Form.Item label="Course Teaching" name="teachingCourse" rules={[{ required: true }]}>
                <Select
                  size="large"
                  options={Object.keys(courseDepartmentMap).map((course) => ({
                    label: course.toUpperCase(),
                    value: course,
                  }))}
                />
              </Form.Item>

              <Form.Item label="Subjects Teaching" name="subjects" rules={[{ required: true }]}>
                <Input size="large" placeholder="Comma separated subjects" />
              </Form.Item>

              <Form.Item label="Designation" name="designation" rules={[{ required: true }]}>
                <Select
                  size="large"
                  options={[
                    { label: "Assistant Professor", value: "assistant_professor" },
                    { label: "Professor", value: "professor" },
                    { label: "HOD", value: "hod" },
                    {label: "laboratory_incharge", value: "laboratory_incharge"},
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Upload Certificates"
                name="certificates"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload beforeUpload={() => false} multiple>
                  <Button icon={<UploadOutlined />}>Upload Certificates</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          <Divider />

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 8 }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} />
          </Form.Item>

            {(selectedRole === "student" ||
            selectedRole === "teacher") && (
            <>
              <Divider />
              <h3>Additional Services</h3>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Hostel Required?"
                    name="hostel"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Bus Service Required?"
                    name="busService"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              {/* HOSTEL DETAILS - DYNAMIC */}
              <Form.Item shouldUpdate>
                {() =>
                  form.getFieldValue("hostel") ? (
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Room Number"
                          name="roomNumber"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Block"
                          name="block"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>

              {/* BUS DETAILS - DYNAMIC */}
              <Form.Item shouldUpdate>
                {() =>
                  form.getFieldValue("busService") ? (
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Route Number"
                          name="routeNumber"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Pickup Point"
                          name="pickupPoint"
                          rules={[{ required: true }]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>
            </>
          )}

          <Divider />

          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            Create User
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UserCreate;