import { Button, Form, Input, Modal } from "antd"
import { useState } from "react"

const CollectionCreateForm = ({open, onCreate, onCancel}) => {
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='Tạo mới người dùng'
      okText='Tạo'
      cancelText='Đóng'
      onCancel={onCancel}
      centered
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log("Validate Failed:", info)
          })
      }}>
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: "public",
        }}>
        <Form.Item
          name='name'
          label='Tên hiển thị'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Số điện thoại'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='address'
          label='Địa chỉ'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='username'
          label='Username'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Mật khẩu'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const AddUserModal = () => {
  const [open, setOpen] = useState(false)
  const onCreate = (values) => {
    console.log("Received values of form: ", values)
    setOpen(false)
  }

  return (
    <div>
      <Button
        type='primary'
        style={{marginBottom: "1rem"}}
        onClick={() => {
          setOpen(true)
        }}>
        Thêm mới người dùng
      </Button>

      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}

export default AddUserModal
