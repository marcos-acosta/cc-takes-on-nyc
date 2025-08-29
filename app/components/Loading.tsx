import styles from "./../page.module.css";

interface LoadingProps {
  message: string;
}

export default function Loading(props: LoadingProps) {
  return <div className={styles.loadingMessage}>{props.message}</div>;
}
