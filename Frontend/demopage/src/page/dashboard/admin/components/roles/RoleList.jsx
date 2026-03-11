import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import API from "../../../../../services/api";
import RoleForm from "./RoleForm";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ==========================
  // FETCH ROLES
  // ==========================

  const fetchRoles = async () => {
    setLoading(true);

    try {
      const res = await API.get("/roles");

      console.log("Roles API:", res);

      // handle pagination response
      const roleArray =
        res?.data?.data?.data ||
        res?.data?.data ||
        res?.data ||
        [];

      setRoles(Array.isArray(roleArray) ? roleArray : []);
    } catch (err) {
      console.warn("Roles API failed", err);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ==========================
  // CREATE
  // ==========================

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  // ==========================
  // EDIT
  // ==========================

  const handleEdit = (record) => {
    setEditing(record);
    setModalOpen(true);
  };

  // ==========================
  // DELETE
  // ==========================

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Designation",
      content: "Are you sure you want to delete this designation?",
      okType: "danger",

      async onOk() {
        try {
          await API.delete(`/roles/${id}`);

          message.success("Designation deleted");

          fetchRoles();
        } catch (error) {
          console.error(error);
          message.error("Delete failed");
        }
      },
    });
  };

  // ==========================
  // CREATE / UPDATE
  // ==========================

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      if (editing && (editing._id || editing.id)) {
        const id = editing._id || editing.id;

        await API.put(`/roles/${id}`, values);

        message.success("Designation updated");
      } else {
        await API.post("/roles", values);

        message.success("Designation created");
      }

      setModalOpen(false);

      fetchRoles();
    } catch (err) {
      console.error(err);
      message.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================
  // TABLE COLUMNS
  // ==========================

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (c) => c || "—",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (d) => d || "—",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (t) => <Tag color="blue">{t || "General"}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              handleDelete(record._id || record.id)
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* HEADER */}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Designations</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          New Designation
        </Button>
      </div>

      {/* TABLE */}

      <Table
        dataSource={roles}
        columns={columns}
        rowKey={(r) => r._id || r.id || r.name}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* MODAL */}

      <Modal
        title={editing ? "Edit Designation" : "New Designation"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <RoleForm
          initialValues={editing || {}}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
};

export default RoleList;