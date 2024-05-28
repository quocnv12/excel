import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAddNewProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "../../../features/project/projectSlice";
import { useState } from "react";
import dayjs from "dayjs";

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

const { Option } = Select;

const suffixSelectorContractAmount = (
  <Form.Item name="suffix" noStyle>
    <Select
      style={{
        width: 100,
      }}
      defaultValue="VND"
    >
      <Option value="USD">USD</Option>
      <Option value="VND">VND</Option>
    </Select>
  </Form.Item>
);

const suffixSelectorTotalWeight = (
  <Form.Item name="suffixSelectorTotalWeight" noStyle>
    <Select
      style={{
        width: 100,
      }}
      defaultValue="Ton"
    >
      <Option value="Ton">Ton</Option>
      <Option value="Kg">Kg</Option>
    </Select>
  </Form.Item>
);

const FormTop = ({ isEdit, setIsEdit, data, setData }) => {
  const param = useParams();
  const { data: contract, isLoading } = useGetProjectByIdQuery(param.id);
  console.log("first contract", contract);
  const location = useLocation();
  const isCreateContractRoute = location.pathname.includes("create");
  const [contractDate, setContractDate] = useState(
    isCreateContractRoute ? null : contract?.contract_date
  );
  const [form] = Form.useForm();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setContractDate(dateString);
  };

  const navigate = useNavigate();
  const [addContract] = useAddNewProjectMutation();
  const [updateContract] = useUpdateProjectMutation();
  const onFinish = (value) => {
    setIsEdit(false);
    setIsEdit(true);

    if (isCreateContractRoute) {
      addContract({
        ...value,
        contract_date: contractDate,
        data: data?.map(({ key, ...rest }) => rest),
      }).then((res) => {
        console.log("res", res.data.data.id);
        navigate(`/dash/contract/${res.data.data.id}`);
      });
    } else {
      updateContract({
        ...value,
        id: param.id,
        data: data.map(({ key, ...rest }) => rest),
        contract_date: contractDate,
      });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        labelAlign="left"
        initialValues={{
          ...contract,
          contract_date: isCreateContractRoute
            ? null
            : dayjs(contractDate, "YYYY-MM-DD"),
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        disabled={!isEdit}
      >
        <div className="flex justify-end">
          <Form.Item className="flex mr-2">
            <Button htmlType="submit">Lưu</Button>
          </Form.Item>
          <Button onClick={() => form.resetFields()}>Huỷ</Button>
        </div>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="project_no" label="Project No">
              <Input />
            </Form.Item>
            <Form.Item name="project_name" label="Project Name">
              <Input />
            </Form.Item>

            <Form.Item name="client" label="Client">
              <Input />
            </Form.Item>

            <Form.Item name="amount" label="Contract Amount">
              <Input addonAfter={suffixSelectorContractAmount} />
            </Form.Item>

            <Form.Item name="weight" label="Total Weight">
              <Input addonAfter={suffixSelectorTotalWeight} />
            </Form.Item>
            <Form.Item name="unit_price" label="Unit Price">
              <Input addonAfter={suffixSelectorTotalWeight} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="delivery_term" label="Delivery term">
              <Input />
            </Form.Item>

            <Form.Item name="contract_date" label="Contract Date">
              <DatePicker onChange={onChange} />
            </Form.Item>

            <div className="mt-32">
              <Button
                onClick={() => navigate(`/dash/budget-list?project_no=${param.id}`)}
                className="mr-4"
              >
                Budget
              </Button>
              <Button
                onClick={() => navigate(`/dash/po-list?project_no=${param.id}`)}
                className="mr-4"
              >
                PO
              </Button>
              <Button onClick={() => navigate("/dash/cost-control-list")}>
                Cost Control
              </Button>
              <Button onClick={() => navigate("/dash/payment-plan")}>
                Payment Plan
              </Button>
              <Button onClick={() => navigate("/dash/payment-actual")}>
                Payment Actual
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormTop;
