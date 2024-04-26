import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import materialTheme from "../material-theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="theme-color"
            content={materialTheme.palette.primary.main}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
            rel="stylesheet"
          ></link>
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Jersey+25&family=Outfit:wght@100..900&display=swap"
            rel="stylesheet"
          ></link> */}
          <title>CEKI - Check The Distance</title>
          <link rel="icon" href="/Cekdist.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
