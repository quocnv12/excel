import FormTop from "components/BudgetScreenComponents/FormTop";
import TableBottom from "components/BudgetScreenComponents/TableBottom";
import { useGetBudgetByIdQuery } from "features/budget/budgetSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BudgetScreen = () => {
  const [isEdit, setIsEdit] = useState(true);

  const [dataTable, setDataTable] = useState([]);
  const router = useLocation();

  const { data: budgetDetail } = useGetBudgetByIdQuery(
    router.pathname.split("/")[3]
  );

  useEffect(() => {
    if (budgetDetail) {
      setDataTable(budgetDetail?.data);
    }
  }, [budgetDetail]);

  return (
    <div>
      <div className="flex justify-end mb-8 fixed right-10 z-10"></div>
      <FormTop
        isEdit={isEdit}
        dataTable={dataTable}
        budgetDetail={budgetDetail}
      />
      <div className="my-[40px]">
        <TableBottom
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setDataTable={setDataTable}
          dataTable={dataTable}
        />
      </div>
    </div>
  );
};

export default BudgetScreen;
