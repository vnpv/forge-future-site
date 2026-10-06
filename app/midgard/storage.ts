/** Чи підключене сховище записів: класичний токен або OIDC-підключення Vercel (BLOB_STORE_ID). */
export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
