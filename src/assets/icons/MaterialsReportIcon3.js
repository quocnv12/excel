import variables from "globalStyles/variables.scss";

const MaterialsReportIcon3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke={variables.colorWarning}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-lucide="database"
      className="lucide lucide-database"
    >
      <ellipse cx={12} cy={5} rx={9} ry={3} />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
};

export default MaterialsReportIcon3;
