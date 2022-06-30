import styles from "./spinner-styles.scss";

type Props = React.HTMLAttributes<HTMLElement>

const Spinner = (props: Props) => {
  return ( 
    <div {...props} data-testid="spinner" className={[styles.spinner, props.className].join(" ")}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;