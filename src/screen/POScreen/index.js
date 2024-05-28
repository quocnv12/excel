import { Switch } from "antd";
import FormTop from "components/POScreenComponents/FormTop";
import TableBottom from "components/POScreenComponents/TableBottom";
import React, { useEffect, useState } from "react";
import { useGetPoByIdQuery } from "features/po/poSlice";
import {useParams} from 'react-router-dom'
const POScreen = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onChange = () => {
    setIsEdit(!isEdit);
  };
  const param = useParams();
  const {data: po} = useGetPoByIdQuery(param.id);

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    setDataSource(po?.order_detail)
  }, [po])

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
      <FormTop isEdit={isEdit} data={po} dataSource={dataSource} setDataSource={setDataSource} />
      <div className="my-[40px]">
        <TableBottom 
          isEdit={isEdit} 
          setIsEdit={setIsEdit} 
          dataSourceParent={dataSource} 
          setDataSourceParent={setDataSource}
        />
      </div>
    </div>
  );
};

export default POScreen;
