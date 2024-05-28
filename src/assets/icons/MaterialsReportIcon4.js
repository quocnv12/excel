import variables from "globalStyles/variables.scss";

const MaterialsReportIcon4 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke={variables.colorSuccess}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-lucide="save"
      className="lucide lucide-save"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  );
};

export default MaterialsReportIcon4;
