import React from 'react';
import styles from './StartContest.module.sass';
const StartContest = () => {
  return (
    <div className={styles.container}>
      <article  className={styles.gradient}>
        <p>Ready to get started? Launch a contest and start receiving submissions instantly.</p>
        <a href='/start-contest' className={styles.btn}><i class="far fa-lightbulb"></i> start a contest</a>
      </article>
    </div>
  );
}

export default StartContest;
