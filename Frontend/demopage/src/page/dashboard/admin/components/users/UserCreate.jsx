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



const handleSubmit = async (values) => {
  setLoading(true);

  try {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (!value) return;

      // DatePicker
      if (value?._isAMomentObject) {
        formData.append(key, value.format("YYYY-MM-DD"));
      }

      // Multiple documents
      else if (key === "documents" && Array.isArray(value)) {
        value.forEach((file) => {
          const realFile = file.originFileObj || file;
          formData.append("documents[]", realFile);
        });
      }

      // Single photo
      else if (key === "photo") {
        const realFile = value?.[0]?.originFileObj || value?.originFileObj;
        if (realFile) {
          formData.append("photo", realFile);
        }
      }

      // Normal fields
      else {
        formData.append(key, value);
      }
    });

    console.log("==== FormData Sent To Backend ====");

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    await API.post("roles", formData, {
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

  <Col span={6}>
    <Form.Item
      label="Date of Birth"
      name="dateOfBirth"
      rules={[{ required: true }]}
    >
      <DatePicker size="large" style={{ width: "100%" }} onChange={handleDOBChange}/>
    </Form.Item>
  </Col>

  <Col span={6}>
    <Form.Item
      label="Age"
      name="age"
      rules={[{ required: true }]}
    >
      <Input size="small" type="number" />
    </Form.Item>
  </Col>

  <Col span={6}>
    <Form.Item
      label="Registration Number"
      name="registrationNumber"
      rules={[{ required: true }]}
    >
      <Input size="small" />
    </Form.Item>
  </Col>

  <Col span={6}>
    <Form.Item
      label="Registration Date"
      name="registrationDate"
      rules={[{ required: true }]}
    >
      <DatePicker size="large" style={{ width: "100%" }} />
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
<Divider />
     <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              size="large"
               
              options={[
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
                { label: "Admin", value: "admin" },
                { label: "Staff" , value: "staff" }
              ]} />
          </Form.Item>
          {/* STUDENT SECTION */}
          {selectedRole === "student" && (
            <>
              <Divider />
              <h3>Student Details</h3>

            

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
  <Select
    size="large"
    options={[1,2,3,4,5].map((y) => ({
      label: `${y} Year`,
      value: y,
    }))}
  />
</Form.Item>
  </Col>

  <Col span={8}>
    <Form.Item
  label="Academic Year Start"
  name="academicStartYear"
  initialValue={new Date().getFullYear()}
  rules={[{ required: true }]}
>
  <Input
    size="large"
    type="number"
  />
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
                      options={[1, 2, 3, 4, 5].map((y) => ({
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
                      options={[1,2,3,4,5,6,7,8,9,10].map((s) => ({
                        label: `Sem ${s}`,
                        value: s,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
    label="Academic Start Year"
    name="academicStartYear"
    rules={[{ required: true }]}
  >
    <Input
      size="large"
      placeholder="Example: 2026"
     
    />
   
  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                  label="Upload documentss"
                  name="documentss"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}>
                  <Upload beforeUpload={() => false} multiple>
                   <Button icon={<UploadOutlined />}>Upload documentss</Button>
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
     <Row>
      <Col span={8}>
    <Form.Item
  label="Academic Year Start"
  name="academicStartYear"
  initialValue={new Date().getFullYear()}
  rules={[{ required: true }]}
>
  <Input
    size="large"
    type="number"
  />
</Form.Item>
  </Col></Row> 
  
  

    <Form.Item
      label="Upload documents"
      name="documents"
      valuePropName="fileList"
      getValueFromEvent={(e) => e.fileList}
    >
      <Upload beforeUpload={() => false} multiple>
        <Button icon={<UploadOutlined />}>Upload documents</Button>
      </Upload>
    </Form.Item>
  </>
)}


{selectedRole === "admin" && (
<>
  <h3>Admin Details</h3>

  <Form.Item
    label="Highest Qualification"
    name="qualification"
    rules={[{ required: true }]}
  >
    <Input size="large" />
  </Form.Item>

  <Form.Item
    label="Department"
    name="department"
    rules={[{ required: true, message: "Please select department" }]}
  >
    <Select
      size="large"
     
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
        { label: "Principal", value: "principal" },
        { label: "Dean", value: "dean" },
      ]}
    />
  </Form.Item>

 <Form.Item
  label="Academic Year Start"
  name="academicStartYear"
  initialValue={new Date().getFullYear()}
  rules={[{ required: true }]}
>
  <Input
    size="large"
    type="number"
  
  />
</Form.Item>


  {/* Admin Photo Upload */}
  <Form.Item
    label="Upload Photo"
    name="photo"
    valuePropName="fileList"
    getValueFromEvent={(e) => e.fileList}
  >
    <Upload beforeUpload={() => false} maxCount={1}>
      <Button icon={<UploadOutlined />}>Upload Photo</Button>
    </Upload>
  </Form.Item>

  <Form.Item
    label="Upload documents"
    name="documents"
    valuePropName="fileList"
    getValueFromEvent={(e) => e.fileList}
  >
    <Upload beforeUpload={() => false} multiple>
      <Button icon={<UploadOutlined />}>Upload documents</Button>
    </Upload>
  </Form.Item>
</>
)}  

 {selectedRole === "staff" && (
  <>
    <Divider />
    <h3>Staff Details</h3>

    {/* Designation */}
    <Form.Item
      label="Designation"
      name="designation"
      rules={[{ required: true }]}
    >
      <Select
        size="large"
        placeholder="Select Designation"
        options={[
          { label: "Warden", value: "warden" },
          { label: "Librarian", value: "librarian" },
          { label: "Assistant Librarian", value: "assistant_librarian" },
          { label: "Bus Coordinator", value: "bus_coordinator" },
          { label: "Accountant", value: "accountant" },
        ]}
      />
    </Form.Item>

    {/* Hostel Type (Only for Warden) */}
    <Form.Item shouldUpdate>
      {() =>
        form.getFieldValue("designation") === "warden" ? (
          <Form.Item
            label="Hostel Type"
            name="hostelType"
            rules={[{ required: true }]}
          >
            <Select
              size="large"
              options={[
                { label: "Boys Hostel", value: "boys" },
                { label: "Girls Hostel", value: "girls" },
              ]}
            />
          </Form.Item>
        ) : null
      }
    </Form.Item>

    {/* Joining Year */}
  
    <Form.Item
  label="Academic Year Start"
  name="academicStartYear"
  initialValue={new Date().getFullYear()}
  rules={[{ required: true }]}
>
  <Input
    size="large"
    type="number"
  />
</Form.Item>
  

 

    {/* Upload documents */}
    <Form.Item
      label="Upload documents"
      name="documents"
      valuePropName="fileList"
      getValueFromEvent={(e) => e.fileList}
    >
      <Upload beforeUpload={() => false} multiple>
        <Button icon={<UploadOutlined />}>Upload documents</Button>
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
          
          

            {(selectedRole === "student" ||
            selectedRole === "teacher" || selectedRole === "staff") && (
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
