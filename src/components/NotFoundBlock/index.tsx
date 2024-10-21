import React from "react";
import styles from "./NotFoundBlock.module.scss";
const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Страница не найдена</h1>
      <p>К сожелению данная страница не существует на нашем сайте</p>
    </div>
  );
};

export default NotFoundBlock;
