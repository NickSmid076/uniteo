import Document, { Html, Head, Main, NextScript } from "next/document";

class UniteoDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default UniteoDocument;
