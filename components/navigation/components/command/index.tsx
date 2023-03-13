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
  useRef,
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
  const searchLogsRef = useRef<Record<string, ArticleSearch[]>>({});
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

  const handleSelect = useCallback(
    (url: string) => {
      void router.push(url);
      setIsOpened(false);
    },
    [router, setIsOpened]
  );

  useEffect(() => {
    if (deferredSearch.length < 1) return;

    if (searchLogsRef.current[deferredSearch]) {
      setSearchResult(searchLogsRef.current[deferredSearch]);
      return;
    }

    setLoading(true);
    const abort = new AbortController();

    void fetch(`/api/web/search?q=${deferredSearch}`, {
      signal: abort.signal
    })
      .then(res => res.json())
      .then(res => {
        const data = res as ArticleSearch[];
        setSearchResult(data);
        searchLogsRef.current[deferredSearch] = data;
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
            {searchResult.length ? (
              searchResult.map(({ title, url }) => (
                <Command.Item key={url} onSelect={() => handleSelect(url)}>
                  {title}
                </Command.Item>
              ))
            ) : (
              <Command.Empty>結果はありません！</Command.Empty>
            )}

            {isLoading && !searchResult.length && (
              <Command.Item disabled>読込中...</Command.Item>
            )}
          </Command.Group>
        ) : (
          <Fragment>
            <Command.Group heading="ナビゲーション">
              <Command.Item onSelect={() => handleSelect('/')}>
                About
              </Command.Item>
              <Command.Item onSelect={() => handleSelect('/blog')}>
                Blog
              </Command.Item>
              <Command.Item onSelect={() => handleSelect('/product')}>
                Products
              </Command.Item>
            </Command.Group>

            <Command.Group heading="ソーシャルリンク">
              <Command.Item
                onSelect={() => handleSelect('https://don.nzws.me/@nzws')}
              >
                Mastodon
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect('https://github.com/nzws')}
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
