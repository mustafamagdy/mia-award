export default function(/**@type {ApisauceInstance} */ api) {
  const getStartIndex = dirName => api.post("/large/start-index", `"${dirName}"`);
  // const uploadChunk = chunk => {
  //   const headers = { "Content-Type": "application/form-data" };
  //   const form = new FormData();
  //   Object.keys(data).map(key => {
  //     return form.append(key, data[key]);
  //   });
  //   return api.post("news", form, { headers });
  // };

  return { members: { getStartIndex } };
}
