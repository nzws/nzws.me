'use client';

import './global.scss';
import { Command } from 'cmdk';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
};

export const CommandMenu: FC<Props> = ({ isOpened, setIsOpened }) => {
  return (
    <Command.Dialog
      open={isOpened}
      onOpenChange={setIsOpened}
      label="Global Command Menu"
      className={styles.cmdk}
    >
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Item>🚧 Work in progress 🚧</Command.Item>
      </Command.List>
    </Command.Dialog>
  );
};
