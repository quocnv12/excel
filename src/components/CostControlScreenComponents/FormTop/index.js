import { Col, Form, Input, Row } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const FormTop = ({ isEdit }) => {
  return (
    <Form
      {...layout}
      name="nest-messages"
      labelAlign="left"
      onFinish={onFinish}
      validateMessages={validateMessages}
      disabled={!isEdit}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={["user", "projectNo"]}
            label="Project No"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "poNo"]} label="PO No">
            <Input />
          </Form.Item>

          <Form.Item name={["user", "supplier"]} label="Supplier/Subcon">
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name={["user", "divIncharge"]} label="Div Incharge">
            <Input />
          </Form.Item>

          <Form.Item name={["user", "submitDate"]} label="Submit Date">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormTop;
