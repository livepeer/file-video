import Layout from "./layout";

export default function UploadPage({ children }) {
  return (
    <Layout>
      <div className="wrapper">
        <div className="children">{children}</div>
        <div className="about">
          <p>Copy explaining livepeer + filecoin integration goes here...</p>
        </div>
      </div>
      <style jsx>{`
        .about {
          text-align: center;
          padding: 0 1rem 1.5rem 1rem;
          max-width: 600px;
          margin: 100px auto 0 auto;
        }
        .about {
          line-height: 1.4rem;
        }
        .children {
          text-align: center;
          min-height: 230px;
        }
      `}</style>
    </Layout>
  );
}
