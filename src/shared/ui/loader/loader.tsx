import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.loader} />
    </div>
  );
};
