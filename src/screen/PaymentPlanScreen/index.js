import { Switch } from "antd";
import FormTop from "components/PaymentPlanScreenComponents/FormTop";
import TableBottom from "components/PaymentPlanScreenComponents/TableBottom";
import React, { useState } from "react";

const PaymentPlanScreen = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onChange = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      <div className="flex justify-end mb-8 fixed right-10 z-10">
        <Switch
          checkedChildren="Xem"
          unCheckedChildren="Sửa"
          defaultChecked
          onChange={onChange}
        />
      </div>
      <FormTop isEdit={isEdit} />
      <div className="mt-[40px]">
        <TableBottom isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>
    </div>
  );
};

export default PaymentPlanScreen;
