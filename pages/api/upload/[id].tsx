export default async function uploadHandler(req, res) {
  const { method } = req;

  const uploadStatusURL = process.env.DEMUX_URL + 'upload';

  switch (method) {
    case 'GET':
      try {
        const resp = await fetch(uploadStatusURL + '/' + req.query.id);
        const data = await resp.json();

        res.json({
          upload: {
            status: data['status'],
            url: data['url'],
            asset_id: data['asset_id'],
          }
        });
        // TODO: handle upload failure case
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
