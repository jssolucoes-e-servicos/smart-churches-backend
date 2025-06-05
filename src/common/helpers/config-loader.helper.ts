export const configLoaderHelper = () => {
  return {
    application: {
      name: process.env.APP_NAME ?? "smartChurches", // Fornece uma string vazia como padrão
      version: process.env.VERSION ?? "1.0.1b",
      port: parseInt(process.env.PORT || "3110"), // Padrão '3000' para evitar NaN
      enviroment: process.env.NODE_ENV ?? "development",
    },
    database: {
      url:
        process.env.DATABASE_URL ??
        "mongodb+srv://smartchurchplatform:DEV1_jssolucoes@cluster0.nrzefzq.mongodb.net/smartChurches?retryWrites=true&w=majority",
    },
    jtw: {
      secret: process.env.JWT_SECRET ?? "5CB7jfXaDZGS2LV7bH64qVh0XYfnhLU6", // Cuidado com segredos padrão!
    },
    redis: {
      url: process.env.REDIS_URL ?? "wbuc2m.easypanel.host",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      username: process.env.REDIS_USERNAME ?? "default",
      password: process.env.REDIS_PASSWORD ?? "DEV1_jssolucoes",
      database: parseInt(process.env.REDIS_DATABASE || "0"),
    },
    mail: {
      host: process.env.EMAIL_HOST ?? "sandbox.smtp.mailtrap.io",
      port: parseInt(process.env.EMAIL_PORT || "2525"),
      mail: process.env.EMAIL_MAIL ?? "no-reply@smartchurches.com.br",
      user: process.env.EMAIL_USER ?? "37fd34dd1b8370",
      password: process.env.EMAIL_PASSWORD ?? "f587e4171b140f",
    },
    sentry: {
      dns: process.env.SENTRY_DNS ?? "",
      debug: process.env.NODE_ENV === "development", // Não precisa de padrão para boolean
    },
    supabase: {
      url: process.env.SUPABASE_URL ?? "",
      anon_key: process.env.SUPABASE_ANON_KEY ?? "",
      service_key: process.env.SUPABASE_SERVICE_KEY ?? "",
    },
    evolution: {
      url: process.env.EVOLUTION_API_URL ?? "https://server-evolution.wbuc2m.easypanel.host",
      token: process.env.EVOLUTION_API_TOKEN ?? "4b9cec800bfb253d4b94ff79ca3714e24a8825a6",
    },
    efipay: {
      mode: process.env.EFIPAY_MODE ?? "sandbox",
      debug: process.env.EFIPAY_DEBUG === "true", // Converte string para boolean
      pixKey: process.env.EFIPAY_DEFAULT_KEY_PIX ?? "",
      sandbox: {
        clientId: process.env.EFIPAY_SANDBOX_CLIENT_ID ?? "",
        clientSecret: process.env.EFIPAY_SANDBOX_SECRET ?? "",
        certificateName: process.env.EFIPAY_SANDBOX_CERTIFICATE_NAME ?? "",
      },
      production: {
        clientId: process.env.EFIPAY_PRODUCTION_CLIENT_ID ?? "",
        clientSecret: process.env.EFIPAY_PRODUCTION_SECRET ?? "",
        certificateName: process.env.EFIPAY_PRODUCTION_CERTIFICATE_NAME ?? "",
      },
    },
    minio: {
      endpoint: process.env.MINIO_ENDPOINT ?? "https://server-minio.wbuc2m.easypanel.host",
      port: process.env.MINIO_PORT ?? "9000",
      useSSL: process.env.MINIO_USE_SSL ?? "false",
      accessKey: process.env.MINIO_ACCESS_KEY ?? "3uFybM6VOkOtQwkRe0en",
      secretKey: process.env.MINIO_SECRET_KEY ?? "9gsLJyZQhjqGDQCURYOAZzkbWsfZSReMzAMCv8Pg",
      bucket: process.env.MINIO_BUCKET ?? "smart-churches",
    },
  };
};
