import { Button, Table } from "antd";
import { useGetBudgetsQuery } from "features/budget/budgetSlice";
import { useLocation, useNavigate } from "react-router-dom";

const BudgetListScreen = () => {
  const { data } = useGetBudgetsQuery();
  const param = useLocation();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Work ID",
      dataIndex: "work_id",
      key: "work_id",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Cost ID",
      dataIndex: "cost_id",
      key: "cost_id",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            style={{ marginRight: 16 }}
            onClick={() =>
              navigate(
                `/dash/budget-list/${record.id}?project_no/${param.search.slice(
                  12,
                  param.search.length
                )}`
              )
            }
          >
            Xem
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() =>
            navigate(
              `/dash/budget/create?project_no=${param.search.slice(
                12,
                param.search.length
              )}`
            )
          }
        >
          Thêm Budget
        </Button>
      </div>
      <Table
        bordered
        dataSource={data?.data}
        columns={columns}
        scroll={{
          x: 1200,
        }}
      />
    </div>
  );
};

export default BudgetListScreen;
