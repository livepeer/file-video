import Head from "next/head";
import Link from "next/link";

export default function Layout({
  title,
  description,
  metaTitle,
  metaDescription,
  image,
  children,
  loadTwitterWidget,
}) {
  return (
    <div className="container">
      <Head>
        <title>Livepeer + Filecoin</title>
        <link rel="icon" href="/favicon.ico" />
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        {metaTitle && <meta property="twitter:title" content={metaTitle} />}
        {metaDescription && (
          <meta property="og:description" content={description} />
        )}
        {metaDescription && (
          <meta property="twitter:description" content={description} />
        )}
        {image && <meta property="og:image" content={image} />}
        {image && (
          <meta property="twitter:card" content="summary_large_image" />
        )}
        {image && <meta property="twitter:image" content={image} />}
        {loadTwitterWidget && (
          <script
            type="text/javascript"
            async
            src="https://platform.twitter.com/widgets.js"
          ></script>
        )}
      </Head>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 30,
          width: "100%",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 24 }}>file.video</div>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
      </header>
      <main>
        <div className="grid">{children}</div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          min-height: -webkit-fill-available;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 1rem 0 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
          width: 71px;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 1rem;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
          .title {
            font-size: 2.5rem;
          }
          footer {
            height: 60px;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        a {
          color: #ff2b61;
        }

        p {
          line-height: 1.4rem;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
