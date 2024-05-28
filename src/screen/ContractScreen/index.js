import FormTop from "components/ContractScreenComponents/FormTop";
import ProjectReport from "components/ContractScreenComponents/ProjectReport";
import {
  useGetContractListQuery,
  useGetProjectByIdQuery,
} from "features/project/projectSlice";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ContractScreenWrapper } from "./styles";

const ContractScreen = () => {
  const location = useLocation();
  const isCreateContractRoute = location.pathname.includes("create");
  const [isEdit, setIsEdit] = useState(true);

  const param = useParams();

  const { data: project, isLoading } = useGetProjectByIdQuery(param.id, {
    skip: isCreateContractRoute,
  });

  const { data: contract, isLoadingContract } = useGetContractListQuery(
    param.id,
    {
      skip: isCreateContractRoute,
    }
  );

  const [data, setData] = useState([]);

  if (isLoading || isLoadingContract) {
    return <div>Loading...</div>;
  }

  return (
    <ContractScreenWrapper>
      <FormTop
        isEdit={isEdit}
        project={project}
        data={data}
        setData={setData}
        setIsEdit={setIsEdit}
      />

      {!isLoadingContract && (
        <div className="mt-[40px]">
          <ProjectReport
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            project={contract}
            data={data}
            setData={setData}
          />
        </div>
      )}
    </ContractScreenWrapper>
  );
};
export default ContractScreen;
