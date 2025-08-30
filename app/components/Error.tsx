import styles from "./../page.module.css";

interface ErrorProps {
  message: string;
}

export default function Error(props: ErrorProps) {
  return (
    <div className={styles.errorMessage}>
      <p>YIKES</p>
      <p>{props.message.toLocaleLowerCase()}</p>
    </div>
  );
}
