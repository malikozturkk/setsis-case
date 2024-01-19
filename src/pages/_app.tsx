import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dayjs from "dayjs";
import "dayjs/locale/tr";

function MyApp({ Component, pageProps }: AppProps) {
  dayjs.locale("tr");
  const queryClient = new QueryClient();
  console.log(pageProps, "pageProps geldi");
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=0, maximum-scale=1, minimum-scale=1, user-scalable=0"
        />
        <link rel="icon" type="image/x-icon" href="/setsis-icon.png" />
        <link rel="apple-touch-icon" href="/setsis-icon.png" />
        <link rel="shortcut icon" href="/setsis-icon.png" type="image/x-icon" />
        <title>Setsis Bilişim</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Setsis Bilişim" />
        <meta property="og:site_name" content="Setsis.com" />
        <meta property="og:url" content="https://www.setsis.com" />
        <meta property="og:image" content="setsis.com/logo.png" />
        <meta property="og:locale" content="tr" />
        <meta name="description" content="Setsis Bilişim Hizmetleri" />
        <meta name="application-name" content="Setsis Bilişim" />
        <meta name="creator" content="Setsis" />
        <meta name="publisher" content="Setsis" />
        <meta name="category" content="IT" />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
