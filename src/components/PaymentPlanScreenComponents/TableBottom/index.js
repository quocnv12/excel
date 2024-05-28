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
      planPaymentMilestone: "1",
      planPaymentPercentage: "10%",
      planPaymentAmount: "1000",
      planPaymentDuration: "10",
      submittedDate: "2021-09-01",
      approvedPaymentDate: "2021-09-02",
      updatePaymentDate: "2021-09-03",
      key: 0,
    },
    {
      planPaymentMilestone: "2",
      planPaymentPercentage: "20%",
      planPaymentAmount: "2000",
      planPaymentDuration: "20",
      submittedDate: "2021-09-04",
      approvedPaymentDate: "2021-09-05",
      updatePaymentDate: "2021-09-06",
      key: 1,
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
      title: "Plan Payment Milestone",
      dataIndex: "planPaymentMilestone",
      editable: isEdit,
      fixed: "left",
    },
    {
      title: "Plan Payment %",
      dataIndex: "planPaymentPercentage",
      editable: isEdit,
    },
    {
      title: "Plan Payment Amount",
      dataIndex: "planPaymentAmount",
      editable: isEdit,
    },
    {
      title: "Playment Duration (Day)",
      dataIndex: "planPaymentDuration",
      editable: isEdit,
    },
    {
      title: "Submitted Date",
      dataIndex: "submittedDate",
      render: (text, record) => {
        return (
          <div>
            <DatePicker onChange={onChange} />
          </div>
        );
      },
    },
    {
      title: "Approved Payment Date",
      dataIndex: "approvedPaymentDate",
      render: (text, record) => {
        return (
          <div>
            <DatePicker onChange={onChange} />
          </div>
        );
      },
    },
    {
      title: "Update Payment Date",
      dataIndex: "updatePaymentDate",
      render: (text, record) => {
        return (
          <div>
            <DatePicker onChange={onChange} />
          </div>
        );
      },
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
      planPaymentDate: "",
      planPaymentPercentage: "",
      planPaymentAmount: "",
      planPaymentDuration: "",
      submittedDate: "",
      approvedPaymentDate: "",
      updatePaymentDate: "",
      key: count,
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
          x: 1600,
        }}
      />
    </div>
  );
};

export default TableBottom;
