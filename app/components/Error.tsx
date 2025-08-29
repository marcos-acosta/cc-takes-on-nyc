import styles from "./../page.module.css";

interface ErrorProps {
  message: string;
}

export default function Error(props: ErrorProps) {
  return <div className={styles.errorMessage}>{props.message}</div>;
}
