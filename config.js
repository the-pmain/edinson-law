// Edison Law — simple switches. This is the file to edit.
// Local `npm run dev` stays in preview. Railway / production builds turn the banner off.

const hosted =
  process.env.NODE_ENV === "production" ||
  Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);

export const config = {
  develop: !hosted,
  search: true,
  analytics: false,
};
