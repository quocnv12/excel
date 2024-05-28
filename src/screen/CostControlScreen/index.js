import { Switch } from "antd";
import FormTop from "components/CostControlScreenComponents/FormTop";
import TableBottom from "components/CostControlScreenComponents/TableBottom";
import React, { useState } from "react";

const CostControlScreen = () => {
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
      <div className="my-[40px]">
        <TableBottom isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>
    </div>
  );
};

export default CostControlScreen;
