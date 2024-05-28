import { Button, Form, Input, Popconfirm, Table } from "antd";
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
      key: 0,
      item: "Item 1",
      workId: "123",
      unit: "Unit 1",
      weight: "1",
      unitPrice: "100",
      amount: "100",
      costId: "123",
    },
    {
      key: 1,
      item: "Item 2",
      workId: "456",
      unit: "Unit 2",
      weight: "2",
      unitPrice: "200",
      amount: "400",
      costId: "456",
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Item",
      dataIndex: "item",
      editable: isEdit,
      fixed: "left",
    },
    {
      title: "WORK ID",
      dataIndex: "workId",
      editable: isEdit,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      editable: isEdit,
    },
    {
      title: "Completed Weight",
      dataIndex: "completedWeight",
      editable: isEdit,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      editable: isEdit,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      editable: isEdit,
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentAmount",
      editable: isEdit,
    },
    {
      title: "Invoice Amount",
      dataIndex: "invoiceAmount",
      editable: isEdit,
    },
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      editable: isEdit,
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      editable: isEdit,
    },
    {
      title: "Cost ID",
      dataIndex: "costID",
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
      key: count,
      item: "",
      workId: "",
      unit: "",
      weight: "",
      unitPrice: "",
      amount: "",
      costId: "",
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
          x: 1200,
        }}
      />
    </div>
  );
};

export default TableBottom;
