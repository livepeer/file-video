# [file.video](https://file.video)

Note: this frontend interface relies on an [open source API gateway](https://github.com/buidl-labs/Demux) currently hosted at https://demux.onrender.com. For authentication credentials, please reach out to [saumay@buidllabs.io](saumay@buidllabs.io).

## Deploy your own
Once you have access to the environment variables you'll need, you can deploy the example using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/livepeer/file-video&project-name=file-video&repository-name=file-video&env=DEMUX_URL,TOKEN_ID,TOKEN_SECRET&envDescription=Required%20to%20connect%20the%20app%20with%20The%20Demux%20Gateway&envLink=https://vercel.link/cms-sanity-env)

## Development

### Install dependencies

```bash
yarn
```

### Update env vars

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git).

```bash
cp .env.local.example .env.local
```

### Run localhost

```bash
yarn dev
```
