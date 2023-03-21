import Image from 'next/image';
import image from './assets/header.jpg';
import styles from './styles.module.scss';
import { Fragment } from 'react';

export function Background() {
  return (
    <Fragment>
      <Image src={image} alt="background image" className={styles.background} />
      <div className={styles.mask} />
    </Fragment>
  );
}
