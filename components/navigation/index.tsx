"use client";

import NextLink from "next/link";
import { FC, Fragment, useCallback, useState } from "react";
import { Command } from "react-feather";

import { HStack } from "~/components/stack";
import { PageNumber } from "~/utils/constants";

import { CommandMenu } from "./components/command";
import { Link } from "./components/link";
import { useCmdk } from "./hooks/use-cmdk";
import styles from "./styles.module.scss";

type Props = {
  currentPage?: PageNumber;
};

export const Navigation: FC<Props> = ({ currentPage }) => {
  const [focusing, setFocusing] = useState(currentPage);
  const [isCmdOpened, setIsCmdOpened] = useState(false);
  useCmdk(setIsCmdOpened);

  const handleUnHover = useCallback(() => {
    setFocusing(currentPage);
  }, [currentPage]);

  return (
    <Fragment>
      <div className={styles.container}>
        <div>
          <NextLink href="/" className={styles.brand}>
            nzws.me
          </NextLink>
        </div>

        <HStack
          justifyContent="center"
          alignItems="center"
          className={styles.links}
        >
          <div
            className={styles.bar}
            style={{
              transform:
                focusing === undefined
                  ? "scaleX(0)"
                  : `scaleX(1) translateX(${120 * focusing}px)`,
            }}
          />

          <Link
            href="/"
            onHover={() => setFocusing(PageNumber.About)}
            onUnHover={handleUnHover}
            active={
              currentPage === PageNumber.About || focusing === PageNumber.About
            }
          >
            About
          </Link>

          <Link
            href="/blog"
            onHover={() => setFocusing(PageNumber.Blog)}
            onUnHover={handleUnHover}
            active={
              currentPage === PageNumber.Blog || focusing === PageNumber.Blog
            }
          >
            Blog
          </Link>

          <Link
            href="/product"
            onHover={() => setFocusing(PageNumber.Products)}
            onUnHover={handleUnHover}
            active={
              currentPage === PageNumber.Products ||
              focusing === PageNumber.Products
            }
          >
            Products
          </Link>
        </HStack>

        <div className={styles.right}>
          <button
            className={styles.command_button}
            onClick={() => setIsCmdOpened((prev) => !prev)}
            aria-label="Command"
          >
            <Command size={22} />
          </button>
        </div>
      </div>

      <CommandMenu isOpened={isCmdOpened} setIsOpened={setIsCmdOpened} />
    </Fragment>
  );
};
