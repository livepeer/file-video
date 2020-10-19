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

  const uploadStatusURL = process.env.DEMUX_URL + "upload";

  switch (method) {
    case "GET":
      try {
        const resp = await fetch(uploadStatusURL + "/" + req.query.id);
        const data = await resp.json();

        res.json({
          upload: {
            status: data["status"],
            url: data["url"],
            asset_id: data["asset_id"],
            errors: data["error"],
          },
        });
        if (data["status"] || data["error"]) {
          console.log("completed");
          res.end();
        }
      } catch (e) {
        res.statusCode = 500;
        console.error("Request error", e);
        res.json({ error: "Error getting upload/asset" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
