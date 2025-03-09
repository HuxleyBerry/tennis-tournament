import { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from "next/document";
import {DocumentHeadTags, documentGetInitialProps, DocumentHeadTagsProps} from '@mui/material-nextjs/v15-pagesRouter';

export default function Document(props:  DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head><DocumentHeadTags {...props} /></Head>
      <body className="antialiased bg-off-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
