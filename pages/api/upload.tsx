import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function uploadHandler(req, res) {
  await runMiddleware(req, res, cors);
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
