import styles from './UserLayout.css';
function UserLayout(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.content}>
        <div className={styles.main}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
