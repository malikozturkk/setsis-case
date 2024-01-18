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
        <Head>
          <style jsx global>
            {`
              html,
              body {
                font-family: "Open Sans", -apple-system, system-ui,
                  BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
                  Arial, sans-serif;
                margin: 0;
              }
            `}
          </style>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
