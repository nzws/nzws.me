import Image from 'next/image';
import { Fragment } from 'react';

import image from './assets/header.jpg';
import styles from './styles.module.scss';

export function Background() {
  return (
    <Fragment>
      <Image src={image} alt="background image" className={styles.background} />
      <div className={styles.mask} />
    </Fragment>
  );
}
