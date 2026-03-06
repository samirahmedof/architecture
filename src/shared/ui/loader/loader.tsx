import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <output className={styles.container}>
      <span className={styles.loader} />
    </output>
  );
};
