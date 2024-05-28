import { Dropdown } from "antd";
import { TbDotsVertical } from "react-icons/tb";

const DropdownAction = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [getItem("Sửa", "1"), getItem("Xoá", "2")];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <div>
        <TbDotsVertical />
      </div>
    </Dropdown>
  );
};

export default DropdownAction;
