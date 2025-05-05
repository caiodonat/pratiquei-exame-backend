export default () => ({
  node_env: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT,
    upload_path: process.env.UPLOAD_PATH,
    frontend_url: process.env.APP_FRONTEND_URL,
    basename: process.env.APP_BASENAME,
    cookie_expires: process.env.APP_COOKIE_EXPIRES,
    cookie_key: process.env.APP_COOKIE_KEY,
    jwt_secret: process.env.APP_JWT_SHA256,
  },
  database: {
    drive: process.env.DATABASE_DRIVE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    logger: process.env.DATABASE_LOGGER,
  },
  mail: {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});