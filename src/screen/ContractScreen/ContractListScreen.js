import { Button, Table } from "antd";
import {
  useDeleteProjectQuery,
  useGetProjectsQuery,
} from "features/project/projectSlice";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledAction } from "./styles";
import Loader from "components/common/Loader";

const ContractListScreen = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const location = useLocation();
  const isCreateContractRoute = location.pathname.includes("create");

  const { isLoading, refetch } = useDeleteProjectQuery(id, {
    onSuccess: () => {
      console.log("Deleting success");
      refetchList();
    },
    skip: !id || isCreateContractRoute,
  });
  const { data: contractList, refetch: refetchList } = useGetProjectsQuery();

  const handleDeleteContract = useCallback(
    async (contractId) => {
      try {
        await refetch();
        // After successfully deleting the contract, refetch the contract list
        refetchList(id);
      } catch (error) {
        console.error("Error deleting contract:", error);
      }
    },
    [id, refetch, refetchList]
  );

  useEffect(() => {
    if (id) {
      console.log("Deleting contract with id:", id);
      handleDeleteContract();
    }
  }, [id, handleDeleteContract]);

  const columns = [
    {
      title: "Project No.",
      dataIndex: "project_no",
      key: "project_no",
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Contract Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Total Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
    },
    {
      title: "Delivery Term",
      dataIndex: "delivery_term",
      key: "delivery_term",
    },
    {
      title: "Contract Date",
      dataIndex: "contract_date",
      key: "contract_date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <StyledAction>
          <Button onClick={() => navigate(`/dash/contract/${record.id}`)}>
            Xem
          </Button>
          <Button onClick={() => setId(record.id)}>Xoá</Button>
        </StyledAction>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/dash/contract/create")}>
          Thêm hợp đồng
        </Button>
      </div>

      <Table columns={columns} dataSource={contractList?.data} />
    </>
  );
};

export default ContractListScreen;
