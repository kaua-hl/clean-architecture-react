import { useContext } from "react";
import styles from "./input-styles.scss";
import Context from "@/presentation/contexts/form/form-contentext";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: Props) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name]
  
  const getStatus = (): string => {
    return "🔴";
  }

  const getTitle = (): string => {
    return error;
  }

  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input;