import { Button, Table, Tag } from "antd";
import AddUserModal from "components/RoleScreenComponents/AddUserModal";
import { StyledAction } from "./styles";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số diện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Active",
    key: "active",
    dataIndex: "active",
    render: (_, { active }) => (
      <>
        {active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="volcano">Inactive</Tag>
        )}
      </>
    ),
  },
  {
    title: "Vai trò",
    key: "role_id",
    dataIndex: "role_id",
  },
  {
    title: "Ngày tạo",
    key: "created_at",
    dataIndex: "created_at",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Ngày cập nhật",
    key: "created_at",
    dataIndex: "created_at",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    width: "15%",
    render: (_, record) => (
      <StyledAction>
        <Button>View</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </StyledAction>
    ),
  },
];

const userList = [
  {
    id: 4,
    name: "ee",
    phone: null,
    avatar: null,
    username: "ee",
    email: null,
    active: 1,
    role_id: 19,
    created_at: "2023-10-31T15:19:29.000000Z",
    updated_at: "2023-10-31T15:19:29.000000Z",
  },
  {
    id: 2,
    name: "tttt",
    phone: null,
    avatar: null,
    username: "test",
    email: null,
    active: 1,
    role_id: 19,
    created_at: "2023-10-31T14:50:28.000000Z",
    updated_at: "2023-10-31T15:16:00.000000Z",
  },
  {
    id: 1,
    name: "Supper Admin",
    phone: null,
    avatar: null,
    username: "developer",
    email: null,
    active: 1,
    role_id: 1,
    created_at: "2023-10-31T14:50:28.000000Z",
    updated_at: "2023-10-31T15:16:00.000000Z",
  },
];

const RoleScreen = () => {
  return (
    <>
      <AddUserModal />
      <Table columns={columns} dataSource={userList} />
    </>
  );
};

export default RoleScreen;
