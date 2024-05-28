import { Col, DatePicker, Form, Input, Row, Button, Select } from "antd";
import { useAddNewPoMutation, useGetPoByIdQuery, useUpdatePoMutation } from "features/po/poSlice";
import { random } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom';
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

const FormTop = ({ isEdit, idProject, dataSource }) => {
  const param = useParams();
  const location = useLocation();
  const isCreatePoRoute = location.pathname.includes("po-list");

  const navigate = useNavigate();
  const [addNewPo] = useAddNewPoMutation();
  const [updatePo] = useUpdatePoMutation();

  const { data: po, isLoading } = useGetPoByIdQuery(param?.id ?? 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999);
  
  const onFinish = (values) => {
    values.project_id = idProject;
    values.date = moment(values.date).format("YYYY-MM-DD")
    values.data = [];
   
    if (isCreatePoRoute) {
      addNewPo(values).then(res => {
        if(res?.data.status) {
          navigate(`/dash/po/${res.data.data.id}?project_no=${idProject}`)
        }
      })
    } else {
      values.data = dataSource;
      values.id = po.id;
      updatePo(values).then(res => {
        if(res?.data.status) {
          navigate(`/dash/po/${res.data.data.id}?project_no=${idProject}`)
        }
      })
    }

  };

  const [datePo, setDate] = useState(
    isCreatePoRoute ? null : po?.date
  );

  const onChange = (date, dateString) => {
    setDate(dateString)
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form
        {...layout}
        name="nest-messages"
        labelAlign="left"
        onFinish={onFinish}
        validateMessages={validateMessages}
        disabled={!isEdit}
        initialValues={{
          ...po,
          date: isCreatePoRoute
          ? null
          : dayjs(datePo, "YYYY-MM-DD"),
          project_no: po?.project.project_no
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="project_no" label="Project No">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="po_no" label="PO No">
              <Input />
            </Form.Item>

            <Form.Item
              name="poAmountExlTax"
              label="PO Amount (Excl TAX)"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="poAmountInclTax"
              label="PO Amount (Incl TAX)"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="supplier" label="Supplier/Subcon">
              <Input />
            </Form.Item>

            <Form.Item name="incharge" label="Div Incharge">
              <Input />
            </Form.Item>

            <Form.Item name="date" label="PO Date">
              <DatePicker onChange={onChange} />
            </Form.Item>

            <Form.Item name="rev" label="Rev">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center mt-2">
          <Button type="primary" htmlType="submit">
            {isCreatePoRoute ? 'Add Po' : 'Update Po'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormTop;
