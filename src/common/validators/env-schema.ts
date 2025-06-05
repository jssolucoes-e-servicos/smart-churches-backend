import * as Joi from "joi";
export const envSchema = Joi.object({
  PORT: Joi.string().required(),
  VERSION: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  //NODE_ENV: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  REDIS_URL: Joi.string().required(),
  REDIS_PORT: Joi.string().default(17152),
  REDIS_USERNAME: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_DATABASE: Joi.string().required(),

  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.string().required(),
  EMAIL_MAIL: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),

  //SENTRY_DNS: Joi.string().required(),
  //SENTRY_ENABLED: Joi.string().required(),

  SUPABASE_URL: Joi.string().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_SERVICE_KEY: Joi.string().required(),

  EVOLUTION_API_URL: Joi.string().required(),
  EVOLUTION_API_TOKEN: Joi.string().required(),

  MINIO_ENDPOINT: Joi.string().required(),
  MINIO_PORT: Joi.string().required(),
  MINIO_USE_SSL: Joi.string().required(),
  MINIO_ACCESS_KEY: Joi.string().required(),
  MINIO_SECRET_KEY: Joi.string().required(),
  MINIO_BUCKET: Joi.string().required(),

  EFIPAY_MODE: Joi.string().required(),
  EFIPAY_DEBUG: Joi.string().required(),
  EFIPAY_DEFAULT_KEY_PIX: Joi.string().required(),
  EFIPAY_SANDBOX_CLIENT_ID: Joi.string().required(),
  EFIPAY_SANDBOX_SECRET: Joi.string().required(),
  EFIPAY_SANDBOX_CERTIFICATE_NAME: Joi.string().required(),
  EFIPAY_PRODUCTION_CLIENT_ID: Joi.string().required(),
  EFIPAY_PRODUCTION_SECRET: Joi.string().required(),
  EFIPAY_PRODUCTION_CERTIFICATE_NAME: Joi.string().required(),
});
