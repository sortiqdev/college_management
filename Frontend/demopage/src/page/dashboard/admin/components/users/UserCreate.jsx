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
import { LockOutlined, UploadOutlined, SwapOutlined } from "@ant-design/icons";
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

  // Password Generator Function
  const generatePassword = () => {
    const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowercase = "abcdefghijkmnpqrstuvwxyz";
    const numbers = "23456789";
    const special = "!@#$%^&*()+{}|:<>?-=/";
    const allChars = uppercase + lowercase + numbers + special;

    let password = "";
    // Ensure at least one character from each category
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // Fill the rest with random characters
    const minLength = 8;
    while (password.length < minLength) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    form.setFieldsValue({
  password: password
});
    message.success("Password generated successfully!");
  };
// ================= AGE AUTO CALCULATION =================

const handleDOBChange = (date) => {
  if (!date) return;

  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 15) {
    message.error("Student must be at least 15 years old");
    form.setFieldsValue({ age: "" });
    return;
  }

  form.setFieldsValue({ age });
};


// ================= ID GENERATOR =================

const generateUserId = () => {
  const role = form.getFieldValue("role");
  const program = form.getFieldValue("program");
  const department = form.getFieldValue("department");
  const year = form.getFieldValue("academicStartYear");

  if (!role || !year) return;

  const random = Math.floor(100 + Math.random() * 900);

  let prefix = "";

  if (role === "student") prefix = "STU";
  if (role === "teacher") prefix = "EMP";
  if (role === "admin") prefix = "ADM";

  const id = `${prefix}-${department || "GEN"}-${program || "ADMIN"}-${year}-${random}`;

  if (role === "student") {
    form.setFieldsValue({ studentId: id });
  } else {
    form.setFieldsValue({ employeeId: id });
  }
};



const handleSubmit = async (values) => {
  setLoading(true);

  try {
    const formData = new FormData();

    for (let key of Object.keys(values)) {
      const value = values[key];

      if (!value) continue;

      // DatePicker
      if (value?._isAMomentObject) {
        formData.append(key, value.format("YYYY-MM-DD"));
      }

      // Documents upload
      else if (key === "documents" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file.originFileObj) {
            formData.append("document", file.originFileObj);
          }
        });
      }

      // Photo upload
      else if (key === "photo" && Array.isArray(value)) {
        if (value[0]?.originFileObj) {
          formData.append("photo", value[0].originFileObj);
        }
      }

      // Normal fields
      else {
        formData.append(key, value);
      }
    }

    console.log("==== FormData Sent To Backend ====");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    await API.post("register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
    <div classname="p-6 bg-gray-50 min-h-screen">
      <Card title="Create User" classname="rounded-2xl shadow-md">
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

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* COMMON FIELDS FOR ALL ROLES */}
          <h3>Additional Information</h3>

          <Row gutter={16}>
            <Col span={8}>
             <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true }]}>
                  <DatePicker size="large" onChange={handleDOBChange}/>
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
              <Form.Item
                    label="Registration Date"
                        name="registrationDate"
                       rules={[{ required: true }]}>
                        <DatePicker size="large"/>
                  </Form.Item>
            </Col>
          </Row>


            <Divider />
            <Row gutter={16}>
                 <Col span={12}>
                 <Form.Item label="City" name="city" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                 </Col>
                <Col span={12}>
                 <Form.Item label="State" name="state" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                 </Col>
            </Row>
<Divider />
     <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              size="large"
              options={[
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
                { label: "Admin", value: "admin" },
              ]} />
          </Form.Item>
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
                  <Form.Item label="10th School name" name="tenthSchool" rules={[{ required: true }]}>
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
                  <Form.Item label="12th School name" name="twelfthSchool" rules={[{ required: true }]}>
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
                  <Form.Item label="Father name" name="fatherName" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                  <Col span={12}>
                  <Form.Item label="Mother name" name="motherName" rules={[{ required: true }]}>
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
                  <Row gutter={16}>
  <Col span={8}>
    <Form.Item
      label="Registration Type"
      name="registrationType"
      rules={[{ required: true }]}
    >
      <Select
        size="large"
        options={[
          { label: "Regular", value: "regular" },
          { label: "Lateral Entry", value: "lateral_entry" },
          { label: "Transfer", value: "transfer" },
        ]}
      />
    </Form.Item>
  </Col>

  <Col span={8}>
    <Form.Item
      label="Program Duration (Years)"
      name="programDuration"
      rules={[{ required: true }]}
    >
      <Input size="large" type="number" placeholder="Example: 4" />
    </Form.Item>
  </Col>

  <Col span={8}>
    <Form.Item
      label="Academic Year Start"
      name="academicStartYear"
      rules={[{ required: true }]}
    >
      <Input size="large" type="number" placeholder="Example: 2026" />
    </Form.Item>
  </Col>
</Row>
               <Form.Item
  label="Department"
  name="department"
  rules={[{ required: true }]}
>
  <Select
    size="large"
    onChange={generateUserId}
    options={[
      { label: "CSE", value: "CSE" },
      { label: "Mechanical", value: "Mechanical" },
      { label: "Civil", value: "Civil" },
      { label: "Electrical", value: "Electrical" },
      { label: "AI & DS", value: "AI_DS" },
      { label: "IT", value: "IT" },
      { label: "ECE", value: "ECE" }
    ]}
  />
</Form.Item>


              <Form.Item label="Select Program" name="program" rules={[{ required: true }]}>
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
                  const selectedCourse = form.getFieldValue("program");
                  const departments = courseDepartmentMap[selectedCourse] || [];
                  return (
                    <Form.Item
                      label="Field"
                      name="field"
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
                  <Form.Item label="Roll Number" name="rollNumber" rules={[{ required: true }]}>
                    <Input size="large" />
                  </Form.Item> </Col>
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
                  <Form.Item label="Student ID" name="studentId">
  <Input size="large" disabled />
</Form.Item>
                </Col>
              </Row>

              <Form.Item
                  label="Upload Documents"
                  name="documents"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}>
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
  <Upload
    beforeUpload={() => false}
    listType="picture"
    maxCount={1}
    accept=".jpg,.jpeg,.png"
  >
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

    <Form.Item
      label="Highest Qualification"
      name="qualification"
      rules={[{ required: true }]}
    >
      <Input size="large" />
    </Form.Item>

    <Form.Item
      label="Course Teaching"
      name="teachingCourse"
      rules={[{ required: true }]}
    >
      <Select
        size="large"
        onChange={generateUserId}
        options={Object.keys(courseDepartmentMap).map((course) => ({
          label: course.toUpperCase(),
          value: course,
        }))}
      />
    </Form.Item>

    {/* Department */}
    <Form.Item
      label="Department"
      name="department"
      rules={[{ required: true, message: "Please select department" }]}
    >
      <Select
        size="large"
        onChange={generateUserId}
        options={[
          { label: "Computer Science", value: "CSE" },
          { label: "Information Technology", value: "IT" },
          { label: "Electronics", value: "ECE" },
          { label: "Mechanical", value: "ME" },
          { label: "Civil", value: "CE" },
        ]}
      />
    </Form.Item>

    <Form.Item
      label="Designation"
      name="designation"
      rules={[{ required: true }]}
    >
      <Select
        size="large"
        options={[
          { label: "Assistant Professor", value: "assistant_professor" },
          { label: "Professor", value: "professor" },
          { label: "HOD", value: "hod" },
          { label: "Laboratory Assistant", value: "laboratory_incharge" },
        ]}
      />
    </Form.Item>

    {/* Employee ID */}
    <Form.Item
      label="Employee ID"
      name="employeeId"
      rules={[{ required: true, message: "Employee ID required" }]}
    >
      <Input size="large" placeholder="Auto Generated" disabled />
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
  <div className="flex gap-2">

    <Form.Item name="password" noStyle>
      <Input.Password
        size="large"
        prefix={<LockOutlined />}
        className="flex-1"
      />
    </Form.Item>

    <Button
      type="dashed"
      size="large"
      icon={<SwapOutlined />}
      onClick={generatePassword}
      className="bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100"
    >
      Generate
    </Button>

  </div>
</Form.Item>
          {/* REGISTER CODE - FOR TEACHER & ADMIN */}
          {(selectedRole === "teacher" || selectedRole === "admin") && (
            <>
              <Divider />
              <Form.Item
                label="Organization Code"
                name="orgnizationCode"
                rules={[{ required: true, message: "Organization code is required" }]}
              >
                <Input size="large" placeholder="Enter your organization code" />
              </Form.Item>
            </>
          )}

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
                    valuePropname="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Bus Service Required?"
                    name="busService"
                    valuePropname="checked"
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



// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Select,
//   Button,
//   Card,
//   Divider,
//   Row,
//   Col,
//   Switch,
//   Upload,
//   message,
//   DatePicker,
// } from "antd";
// import { LockOutlined, UploadOutlined, SwapOutlined } from "@ant-design/icons";
// import API from "../../../../../services/api";

// const courseDepartmentMap = {
//   btech: ["CSE", "Mechanical", "Civil", "Electrical", "AI & DS", "IT", "ECE"],
//   polytechnic: ["Mechanical", "Civil", "Electrical", "instrumentation", "CSE"],
//   law: ["Corporate Law", "Criminal Law"],
//   pharmacy: ["Pharmaceutics", "Pharmacology"],
//   hotel: ["Hotel Operations", "Culinary Arts"],
//   veterinary: ["Animal Science", "Surgery"],
//   bca: ["Computer Applications"],
//   bsc: ["Physics", "Chemistry", "Maths", "Biology"],
//   bed: ["Education", "Special Education", "Physical Education"],
//   mba: ["Finance", "Marketing", "HR", "Operations"],
//   phd: ["Research", "Teaching", "Industry", "Postdoc", "Fellowship"],
//   mtech: ["Advanced Engineering", "Research", "Teaching"],
// };

// const UserCreate = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const selectedRole = Form.useWatch("role", form);

//   // PASSWORD GENERATOR
//   const generatePassword = () => {
//     const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
//     const lowercase = "abcdefghijkmnpqrstuvwxyz";
//     const numbers = "23456789";
//     const special = "!@#$%^&*()+{}|:<>?-=/";
//     const allChars = uppercase + lowercase + numbers + special;

//     let password = "";
//     password += uppercase[Math.floor(Math.random() * uppercase.length)];
//     password += lowercase[Math.floor(Math.random() * lowercase.length)];
//     password += numbers[Math.floor(Math.random() * numbers.length)];
//     password += special[Math.floor(Math.random() * special.length)];

//     while (password.length < 8) {
//       password += allChars[Math.floor(Math.random() * allChars.length)];
//     }

//     password = password
//       .split("")
//       .sort(() => Math.random() - 0.5)
//       .join("");

//     form.setFieldsValue({ password });
//     message.success("Password generated successfully!");
//   };

//   // AGE AUTO CALCULATION
//   const handleDOBChange = (date) => {
//     if (!date) return;

//     const today = new Date();
//     const birthDate = date.toDate();

//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();

//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

//     if (age < 15) {
//       message.error("User must be at least 15 years old");
//       form.setFieldsValue({ age: "" });
//       return;
//     }

//     form.setFieldsValue({ age });
//   };

//   // ID GENERATOR
//   const generateUserId = () => {
//     const role = form.getFieldValue("role");
//     const program = form.getFieldValue("program");
//     const department = form.getFieldValue("department");
//     const year = form.getFieldValue("academicStartYear");

//     if (!role || !year) return;

//     const random = Math.floor(100 + Math.random() * 900);

//     let prefix = "";
//     if (role === "student") prefix = "STU";
//     if (role === "teacher") prefix = "EMP";
//     if (role === "admin") prefix = "ADM";

//     const id = `${prefix}-${department || "GEN"}-${program || "ADMIN"}-${year}-${random}`;

//     if (role === "student") form.setFieldsValue({ studentId: id });
//     else form.setFieldsValue({ employeeId: id });
//   };

//   useEffect(() => {
//     generateUserId();
//   }, [selectedRole]);

//   const handleSubmit = async (values) => {
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       for (let key of Object.keys(values)) {
//         const value = values[key];
//         if (!value) continue;

//         if (value?._isAMomentObject) {
//           formData.append(key, value.format("YYYY-MM-DD"));
//         } else if (key === "documents" && Array.isArray(value)) {
//           value.forEach((file) => {
//             if (file.originFileObj) {
//               formData.append("document", file.originFileObj);
//             }
//           });
//         } else if (key === "photo" && Array.isArray(value)) {
//           if (value[0]?.originFileObj) {
//             formData.append("photo", value[0].originFileObj);
//           }
//         } else {
//           formData.append(key, value);
//         }
//       }

//       await API.post("register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       message.success("User Registered Successfully");
//       form.resetFields();
//     } catch (error) {
//       console.error(error);
//       message.error("Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div classname="p-6 bg-gray-50 min-h-screen">
//       <Card title="Create User" classname="rounded-2xl shadow-md">
//         <Form layout="vertical" form={form} onFinish={handleSubmit}>
          
//           {/* BASIC INFO */}
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={24}>
//               <Form.Item label="Address" name="address" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider />

//           <h3>Additional Information</h3>

//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true }]}>
//                 <DatePicker size="large" onChange={handleDOBChange} />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item label="Age" name="age" rules={[{ required: true }]}>
//                 <Input size="large" type="number" />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item label="Registration Number" name="registrationNumber" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>

//               <Form.Item label="Registration Date" name="registrationDate" rules={[{ required: true }]}>
//                 <DatePicker size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider />

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="City" name="city" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="State" name="state" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider />

//           <Form.Item label="Role" name="role" rules={[{ required: true }]}>
//             <Select
//               size="large"
//               options={[
//                 { label: "Student", value: "student" },
//                 { label: "Teacher", value: "teacher" },
//                 { label: "Admin", value: "admin" },
//               ]}
//             />
//           </Form.Item>

//           {/* STUDENT SECTION */}
//           {selectedRole === "student" && (
//             <>
//               <Divider />
//               <h3>Student Details</h3>

//               <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
//                 <Select
//                   size="large"
//                   options={[
//                     { label: "Male", value: "male" },
//                     { label: "Female", value: "female" },
//                     { label: "Other", value: "other" },
//                   ]}
//                 />
//               </Form.Item>

//               {/* COURSE ENROLLMENT */}
//               <Divider />
//               <h3>Course Enrollment</h3>

//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item label="Program Duration (Years)" name="programDuration" rules={[{ required: true }]}>
//                     <Input size="large" type="number" />
//                   </Form.Item>
//                 </Col>

//                 <Col span={8}>
//                   <Form.Item label="Academic Year Start" name="academicStartYear" rules={[{ required: true }]}>
//                     <Input size="large" type="number" onChange={generateUserId} />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Form.Item label="Department" name="department" rules={[{ required: true }]}>
//                 <Select
//                   size="large"
//                   onChange={generateUserId}
//                   options={[
//                     { label: "CSE", value: "CSE" },
//                     { label: "Mechanical", value: "Mechanical" },
//                     { label: "Civil", value: "Civil" },
//                     { label: "Electrical", value: "Electrical" },
//                     { label: "AI & DS", value: "AI_DS" },
//                     { label: "IT", value: "IT" },
//                     { label: "ECE", value: "ECE" },
//                   ]}
//                 />
//               </Form.Item>

//               <Form.Item label="Select Program" name="program" rules={[{ required: true }]}>
//                 <Select
//                   size="large"
//                   onChange={generateUserId}
//                   options={Object.keys(courseDepartmentMap).map((course) => ({
//                     label: course.toUpperCase(),
//                     value: course,
//                   }))}
//                 />
//               </Form.Item>

//               <Form.Item label="Student ID" name="studentId">
//                 <Input size="large" disabled />
//               </Form.Item>
//             </>
//           )}

//           {/* TEACHER SECTION */}
//           {selectedRole === "teacher" && (
//             <>
//               <Divider />
//               <h3>Teacher Details</h3>

//               <Form.Item label="Highest Qualification" name="qualification" rules={[{ required: true }]}>
//                 <Input size="large" />
//               </Form.Item>

//               <Form.Item label="Course Teaching" name="teachingCourse" rules={[{ required: true }]}>
//                 <Select
//                   size="large"
//                   options={Object.keys(courseDepartmentMap).map((course) => ({
//                     label: course.toUpperCase(),
//                     value: course,
//                   }))}
//                 />
//               </Form.Item>

//               <Form.Item label="Designation" name="designation" rules={[{ required: true }]}>
//                 <Select
//                   size="large"
//                   options={[
//                     { label: "Assistant Professor", value: "assistant_professor" },
//                     { label: "Professor", value: "professor" },
//                     { label: "HOD", value: "hod" },
//                     { label: "Laboratory Assistant", value: "laboratory_incharge" },
//                   ]}
//                 />
//               </Form.Item>

//               <Form.Item label="Employee ID" name="employeeId">
//                 <Input size="large" disabled />
//               </Form.Item>
//             </>
//           )}

//           <Divider />

//           <Form.Item label="Password" name="password" rules={[{ required: true, min: 8 }]}>
//             <div className="flex gap-2">
//               <Form.Item name="password" noStyle>
//                 <Input.Password size="large" prefix={<LockOutlined />} className="flex-1" />
//               </Form.Item>

//               <Button type="dashed" size="large" icon={<SwapOutlined />} onClick={generatePassword}>
//                 Generate
//               </Button>
//             </div>
//           </Form.Item>

//           <Divider />

//           <Button type="primary" htmlType="submit" size="large" loading={loading}>
//             Create User
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default UserCreate;