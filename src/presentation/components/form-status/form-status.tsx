import { useContext } from "react"
import styles from "./form-status-styles.scss";
import Spinner from "../spinner/spinner";
import Context from "@/presentation/contexts/form/form-contentext";

export const FormStatus = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} /> }
      {mainError && <span className={styles.error}>{ mainError }</span> }
    </div>
  );
}

export default FormStatus;