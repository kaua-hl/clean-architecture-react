import { memo } from "react";
import styles from "./login-header-styles.scss";
import Logo from "@/presentation/components/logo/logo";

const LoginHeader = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(LoginHeader);