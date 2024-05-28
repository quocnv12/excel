import { Button, DatePicker, Form, Input, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useDeleteContractQuery } from "features/project/projectSlice";
import { debounce } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const [inputValue, setInputValue] = useState(children); // Track input value
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    setInputValue(children); // Update input value when children change
  }, [children]);

  const debounceSave = useRef(debounce((values) => handleSave(values), 500))
    .current; // Debounced save function

  const toggleEdit = () => {
    setEditing(!editing);
    if (!editing) {
      setInputValue(children); // Reset input value if editing is stopped
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value); 
    debounceSave();
    // Update input value on change
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
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
        initialValue={inputValue}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} onChange={handleChange} />
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


const ProjectReport = ({ isEdit, setIsEdit, project, data, setData }) => {
  const location = useLocation();
  const isCreateContractRoute = location.pathname.includes("create");
  const [id, setId] = useState();
  const { isLoading, refetch } = useDeleteContractQuery(id);
  const [currentPage, setCurrentPage] = useState(0);
  const handleChangePage = (page, pageSize) => {
    console.log("handleChangePage", page, pageSize);
    setCurrentPage(page - 1);
  };

  useEffect(() => {
    refetch(id);
  }, [id]);

  const [dataSource, setDataSource] = useState(
    isCreateContractRoute
      ? [
          {
            shipment_no: "1",
            delivery_date: "",
            weight: "",
            planned_revenue: "",
            payment_milestone: "",
            payment_percent: "",
            payment_amount: "",
            payment_duration: "",
            payment_date: "",
            payment_method: "",
          },
        ]
      : project?.data?.data?.map((data) => ({ key: data?.id, ...data }))
  );
  console.log("project?.data?.data?.length", project?.data?.data?.map((data) => ({ key: data?.id, ...data })));
  const [count, setCount] = useState(dataSource?.length + 1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const [paymentDate, setPaymentDate] = useState(dataSource?.payment_date);
  const onChange = (date, dateString, recordKey) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === recordKey);
    if (index > -1) {
      newData[index].delivery_date = dateString;
      setDataSource(newData);
      // Update data state with modified dataSource
      setData(newData);
    }
    console.log("====newData", newData, recordKey, dateString);
  };
  const defaultColumns = [
    {
      title: "Shipment No",
      // dataIndex: "shipment_no",
      editable: isEdit,
      fixed: "left",
      render: (text, record, index) => (index + 1) + ((currentPage)* 10),
    },
    {
      title: "Delivery Date",
      dataIndex: "delivery_date",
      render: (text, record) => {
        console.log("dayjs(record?.delivery_date, ", dayjs(record?.delivery_date, "YYYY-MM-DD"))
        return (
          <div>
            <DatePicker
              onChange={(date, dateString) => {
                const newData = [...dataSource];
                const index = newData.findIndex(
                  (item) => item.id === record.id
                );
                if (index > -1) {
                  newData[index].delivery_date =
                    dayjs(dateString).format("YYYY-MM-DD");
                  setDataSource(newData);
                  setData(newData);
                  console.log("ddd", dateString);
                }
              }}
              defaultValue={
                !isCreateContractRoute && record?.delivery_date
                  ? dayjs(record?.delivery_date, "YYYY-MM-DD")
                  : null
              }
              disabled={!isEdit}
            />
          </div>
        );
      },
    },
    {
      title: "Weight",
      dataIndex: "weight",
      editable: isEdit,
    },
    {
      title: "Planned Revenue",
      dataIndex: "planned_revenue",
      editable: isEdit,
    },
    {
      title: "Payment Milestone",
      dataIndex: "payment_milestone",
      editable: isEdit,
    },
    {
      title: "Payment (%)",
      dataIndex: "payment_percent",
      editable: isEdit,
    },
    {
      title: "Payment Amount",
      dataIndex: "payment_amount",
      editable: isEdit,
    },

    {
      title: "Payment Duration",
      dataIndex: "payment_duration",
      editable: isEdit,
    },

    {
      title: "Payment Date",
      render: (text, record) => {
        console.log("moment(record.payment_date)", moment(record.payment_date))
        return (
          <div>
            <DatePicker
              onChange={(date, dateString) => {
                const newData = [...dataSource];
                const index = newData.findIndex(
                  (item) => item.id === record.id
                );
                if (index > -1) {
                  newData[index].payment_date =
                    dayjs(dateString).format("YYYY-MM-DD");
                  setDataSource(newData);
                  setData(newData);
                  console.log("ddd", dateString);
                }
              }}
              defaultValue={(!isCreateContractRoute && record?.payment_date) ? dayjs(record?.payment_date, "YYYY-MM-DD") : null}
              disabled={!isEdit}
            />
          </div>
        );
      },
      // editable: isEdit,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      editable: isEdit,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              handleDelete(record.key);
              setId(record.key);
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
      fixed: "right",
    },
  ];
  const handleAdd = () => {
    const newData = {
      shipment_no: currentPage * 10 + dataSource.length + 1,
      delivery_date: "",
      weight: "",
      planned_revenue: "",
      payment_milestone: "",
      payment_percent: "",
      payment_amount: "",
      payment_duration: "",
      payment_date: "",
      payment_method: "",
      key: currentPage * 10 + dataSource.length + 1,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  console.log("count", count);

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

  useEffect(() => {
    if (project?.data?.data) {
      setDataSource(
        project?.data?.data?.map((data) => ({ key: data?.id, ...data }))
      );
    }
  }, [project?.data?.data, setData]);

  function filterKeys(data) {
    return data?.map((item) => ({
      id: item.id,
      shipment_no: item.shipment_no,
      delivery_date: item.delivery_date,
      weight: item.weight,
      planned_revenue: item.planned_revenue,
      payment_milestone: item.payment_milestone,
      payment_percent: item.payment_percent,
      payment_amount: item.payment_amount,
      payment_duration: item.payment_duration,
      payment_date: item.payment_date,
      payment_method: item.payment_method,
    }));
  }

  useEffect(() => {
    setData(
      filterKeys(dataSource?.map((data) => ({ key: data?.id, ...data })))
    );
  }, [dataSource, setData]);

  console.log(
    "pppp",
    dataSource,
  );

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
        pagination={{
          defaultPageSize: 10,
          total: filterKeys(
            dataSource?.map((data) => ({ key: data?.id, ...data }))
          )?.length,
          current: currentPage + 1,
          onChange: handleChangePage,
        }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        scroll={{
          x: 1800,
        }}
      />
    </div>
  );
};

export default ProjectReport;
