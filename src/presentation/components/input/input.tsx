import React, { useContext } from "react";
import styles from "./input-styles.scss";
import Context from "@/presentation/contexts/form/form-contentext";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`]
  
  const getStatus = (): string => {
    return error ? "🔴" : "🟢";
  }

  const getTitle = (): string => {
    return error || "Tudo certo!";
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input;