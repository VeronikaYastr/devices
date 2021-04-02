import {FC} from "react";
import {Spinner} from "./Spinner";

interface ResultsNotFoundOrLoadingProps {
  listEmpty: boolean;
  isLoading: boolean;
}

export const ResultsNotFoundOrLoading: FC<ResultsNotFoundOrLoadingProps> = ((props) => {
  return (
    <>
      {props.isLoading ? (
        <Spinner inline={true}/>
      ) : props.listEmpty ? (
        <div className={"mt-3 alert alert-warning"} role="alert">
          No data was found for selected filter criteria
        </div>
      ) : (
        props.children
      )}
    </>
  );
});