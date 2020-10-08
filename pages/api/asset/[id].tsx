export default async function assetHandler(req, res) {
  const { method } = req

  const assetURL = process.env.DEMUX_URL + 'asset';

  switch (method) {
    case 'GET':
      try {
        const resp = await fetch(assetURL + '/' + req.query.id);
        const data = await resp.json();

        res.json({
          asset: {
            id: data['asset_id'],
            status: data['asset_status_code'],
            errors: data['asset_error'],
            stream_url: data['stream_url'],
            thumbnail: data['thumbnail'],
            ready: data['asset_ready'],
          },
        });
        if (data['asset_ready'] || data['asset_error']) {
          console.log('completed')
          res.end();
        }
      } catch (e) {
        res.statusCode = 500
        console.error('Request error', e)
        res.json({ error: 'Error getting upload/asset' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
