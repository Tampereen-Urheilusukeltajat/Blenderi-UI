# Tayttopaikka

Basic React app to provide UI for Tayttopaikka. Running at https://tayttopaikka.fi

## Tech

This project uses Vite and React. Bootstrap is used for some general styles,
but we mostly use CSS modules powered with `Sass`.

## Local development

Copy example .env file and tweak some variables if needed. **Please notice that every .env variable is public so do not store any real secrets there!**

```
cp .env.example .env
```

Run the application in local environment

```
npm install
npm start
```

## Deployment

When something is pushed to the `main` branch, it is automatically deployed
to production servers. See `fly-deploy.yml` for the deployment pipeline
and `fly.toml` for the container configuration.

The application is deployed as a container, which has been defined in
`Dockerfile`

### What really happens

When the container is being built, it runs `npm run build` and creates an application
bundle which is optimized for production use. The bundle is then copied for
`Nginx` that serves the application to the user.

## Contributing

Fork the application and do your thing. Make sure that you run the `enforce-style` script and fix possible errors before opening a PR. Contact @Akzuu or @ilesoft
if you need assistance.
