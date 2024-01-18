import React from "react";

import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    try {
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          const Application = App as any;
          return <Application {...props} />;
        },
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: <>{initialProps.styles}</>,
      };
    } finally {
    }
  }

  render() {
    return (
      <Html lang="tr" dir="tr">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
