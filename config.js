// Edison Law — simple switches. This is the file to edit.
// Local `npm run dev` stays in preview. Railway / production builds turn the banner off.

const nodeEnv = typeof process !== "undefined" ? process.env : undefined;
const hosted = Boolean(
  nodeEnv?.NODE_ENV === "production" ||
    nodeEnv?.RAILWAY_ENVIRONMENT ||
    nodeEnv?.RAILWAY_PROJECT_ID ||
    import.meta.env?.PROD,
);

export const config = {
  develop: !hosted,
  search: true,
  analytics: false,
};
