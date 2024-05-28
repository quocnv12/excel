import variables from "globalStyles/variables.scss";

const MaterialsReportIcon2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke={variables.colorPending}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-lucide="shopping-cart"
      className="lucide lucide-shopping-cart"
    >
      <circle cx={9} cy={21} r={1} />
      <circle cx={20} cy={21} r={1} />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
};

export default MaterialsReportIcon2;
