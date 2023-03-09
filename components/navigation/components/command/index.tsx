'use client';

import './global.scss';
import { Command } from 'cmdk';
import {
  FC,
  Fragment,
  KeyboardEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useState
} from 'react';
import styles from './styles.module.scss';
import { ArticleSearch } from '~/utils/type';
import { useRouter } from 'next/navigation';

type Props = {
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
};

export const CommandMenu: FC<Props> = ({ isOpened, setIsOpened }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [isLoading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<ArticleSearch[]>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    // IME 環境でエンターキーがそのまま CMDK の onSelect を発火してしまうので、
    // 全角入力中は弾く
    if (e.key === 'Enter' && e.nativeEvent.isComposing) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (deferredSearch.length < 1) return;

    setLoading(true);
    const abort = new AbortController();

    void fetch(`/api/web/search?q=${deferredSearch}`, {
      signal: abort.signal
    })
      .then(res => res.json())
      .then(res => {
        setSearchResult(res as ArticleSearch[]);
        setLoading(false);
      });

    return () => {
      abort.abort();
      setLoading(false);
    };
  }, [deferredSearch]);

  return (
    <Command.Dialog
      open={isOpened}
      onOpenChange={setIsOpened}
      label="Global Command Menu"
      className={styles.cmdk}
      shouldFilter={false}
      onKeyDown={handleKeyDown}
    >
      <Command.Input
        placeholder="nzws.me 内を検索..."
        value={search}
        onValueChange={setSearch}
      />
      <Command.List>
        {search ? (
          <Command.Group heading="検索結果">
            {isLoading ? (
              <Command.Item disabled>読込中...</Command.Item>
            ) : searchResult.length ? (
              searchResult.map(({ title, url }) => (
                <Command.Item key={url} onSelect={() => void router.push(url)}>
                  {title}
                </Command.Item>
              ))
            ) : (
              <Command.Empty>結果はありません！</Command.Empty>
            )}
          </Command.Group>
        ) : (
          <Fragment>
            <Command.Group heading="ナビゲーション">
              <Command.Item onSelect={() => void router.push('/')}>
                About
              </Command.Item>
              <Command.Item onSelect={() => void router.push('/blog')}>
                Blog
              </Command.Item>
              <Command.Item onSelect={() => void router.push('/product')}>
                Products
              </Command.Item>
            </Command.Group>

            <Command.Group heading="ソーシャルリンク">
              <Command.Item
                onSelect={() => void router.push('https://don.nzws.me/@nzws')}
              >
                Mastodon
              </Command.Item>
              <Command.Item
                onSelect={() => void router.push('https://github.com/nzws')}
              >
                GitHub
              </Command.Item>
            </Command.Group>
          </Fragment>
        )}
      </Command.List>
    </Command.Dialog>
  );
};
