import Layout from "./layout";

export default ({ children }) => {
  return (
    <Layout
      title="Decentralized Video hosting for everyone."
      description="Powered by Livepeer & Filecoin"
    >
      <div className="wrapper">
        <div className="children">{children}</div>
        <div>
          <p>Copy explaining livepeer + filecoin integration goes here...</p>
        </div>
      </div>
    </Layout>
  );
};
