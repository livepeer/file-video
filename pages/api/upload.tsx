export default async function uploadHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // TODO: Send POST request to assetURL from here
        // Currently the request is sent from /components/upload-form.tsx
      } catch (e) {
        res.statusCode = 500;
        console.error("Request error", e);
        res.json({ error: "Error creating upload" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
