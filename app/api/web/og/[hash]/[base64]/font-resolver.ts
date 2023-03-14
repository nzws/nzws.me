import type { SatoriOptions } from 'satori';

type Font = {
  name: string;
  url: string;
  style: 'normal' | 'italic';
};

type Return = SatoriOptions['fonts'] | undefined;

export async function fontResolver(fonts: Font[]): Promise<Return> {
  const cache = await caches.open('fonts');

  const fontRequestCaches = await Promise.all(
    fonts.map(async font => {
      const fontRequest = new Request(font.url);
      const fontResponse = await cache.match(fontRequest);

      if (fontResponse) {
        return fontResponse.arrayBuffer();
      } else {
        const fontResponse = await fetch(fontRequest);

        if (fontResponse.ok) {
          console.log('font cache miss', fontRequest.url);
          await cache.put(fontRequest, fontResponse.clone());
        }

        return fontResponse.arrayBuffer();
      }
    })
  );

  return fonts.map((font, index) => {
    const fontResponse = fontRequestCaches[index];

    return {
      name: font.name,
      style: font.style,
      data: fontResponse
    };
  });

  /*
  } else {
    const cacheMissFonts = fonts.filter(
      (_, index) => !fontRequestCaches[index]
    );

    nextEvent.waitUntil(
      Promise.all(
        cacheMissFonts.map(async font => {
          const fontRequest = new Request(font.url);
          const fontResponse = await fetch(fontRequest);

          if (fontResponse.ok) {
            await cache.put(fontRequest, fontResponse.clone());
          }
        })
      )
    );

    return undefined;
  }
  */
}
