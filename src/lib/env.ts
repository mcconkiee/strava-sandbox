let isDev = false;
if (process.env.NODE_ENV) {
    isDev = process.env.NODE_ENV.toLowerCase() === "development"
}
export const IS_DEV = isDev;
