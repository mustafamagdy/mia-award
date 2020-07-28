export default function appApi(/**@type {ApisauceInstance} */ api) {
  const ping = () => api.get("/system/ping");

  return { app: { ping } };
}
