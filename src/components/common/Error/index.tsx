import React from 'react';
import styles from './styles.module.scss';

export const Error: React.FC<{ title: string; body: string }> = ({
  title,
  body,
}) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};
