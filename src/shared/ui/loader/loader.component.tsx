import styles from './loader.module.scss';

export const LoaderComponent = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
    </div>
  );
};
