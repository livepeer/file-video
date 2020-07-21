import UploadForm from "../components/upload-form";
import Layout from "../components/layout";

export default () => {
  return (
    <Layout>
      <h1 className="title">Decentralized Video hosting for everyone.</h1>
      <p className="description">Powered by Livepeer & Filecoin</p>
      <UploadForm />
      <div style={{ marginTop: 80 }}>
        <p>Copy explaining livepeer + filecoin integration goes here...</p>
      </div>
      <style jsx>{`
        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>
    </Layout>
  );
};