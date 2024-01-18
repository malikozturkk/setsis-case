import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import "@/styles/globals.css";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  console.log(pageProps, "pageProps geldi");
  const metaText = pageProps?.pageData?.props?.data || "";
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=0, maximum-scale=1, minimum-scale=1, user-scalable=0"
        />
        <link rel="icon" type="image/x-icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
        <title>{metaText.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaText.title} />
        <meta property="og:site_name" content="Sorgulat.com" />
        <meta property="og:url" content={metaText.creator} />
        <meta property="og:image" content="sorgulat.com/logo.png" />
        <meta property="og:locale" content="tr" />
        <meta name="description" content={metaText.description} />
        <meta name="application-name" content={metaText.applicationName} />
        <meta name="creator" content={metaText.creator} />
        <meta name="publisher" content={metaText.publisher} />
        <meta name="category" content={metaText.category} />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
        <div>footer</div>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
