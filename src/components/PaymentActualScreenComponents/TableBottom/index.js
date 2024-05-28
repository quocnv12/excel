import { Button, DatePicker, Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
      console.log("ooooo", values);
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const TableBottom = ({ isEdit, setIsEdit }) => {
  const [dataSource, setDataSource] = useState([
    {
      actualPaymentMilestone: "Milestone 1",
      actualPaymentPercentage: "10%",
      actualPaymentAmount: "1000",
      paymentDuration: "10",
      actualPaymentDate: "2021-10-10",
      actualWeight: "100",
      actualRevenue: "1000",
      key: "0",
    },
    {
      actualPaymentMilestone: "Milestone 2",
      actualPaymentPercentage: "20%",
      actualPaymentAmount: "2000",
      paymentDuration: "20",
      actualPaymentDate: "2021-10-20",
      actualWeight: "200",
      actualRevenue: "2000",
      key: "1",
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const defaultColumns = [
    {
      title: "Actual Payment Milestone",
      dataIndex: "actualPaymentMilestone",
      editable: isEdit,
      fixed: "left",
    },
    {
      title: "Actual Payment %",
      dataIndex: "actualPaymentPercentage",
      editable: isEdit,
    },
    {
      title: "Actual Payment Amount",
      dataIndex: "actualPaymentAmount",
      editable: isEdit,
    },
    {
      title: "Payment Duration (Day)",
      dataIndex: "paymentDuration",
      editable: isEdit,
    },
    {
      title: "Actual Payment Date",
      dataIndex: "actualPaymentDate",
      render: (text, record) => {
        return (
          <div>
            <DatePicker onChange={onChange} />
          </div>
        );
      },
    },
    {
      title: "Actual Weight",
      dataIndex: "actualWeight",
      editable: isEdit,
    },
    {
      title: "Actual Revenue",
      dataIndex: "actualRevenue",
      editable: isEdit,
    },

    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
      fixed: "right",
    },
  ];
  const handleAdd = () => {
    const newData = {
      actualPaymentMilestone: "",
      actualPaymentPercentage: "",
      actualPaymentAmount: "",
      paymentDuration: "",
      actualPaymentDate: "",
      actualWeight: "",
      actualRevenue: "",
      key: count.toString(),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  console.log("dataSource", dataSource);

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        scroll={{
          x: 1400,
        }}
      />
    </div>
  );
};

export default TableBottom;
