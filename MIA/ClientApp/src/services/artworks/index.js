import bson from "bson";
export default function(/**@type {ApisauceInstance} */ api) {
  // const uploadChunk = data => {
  //    const headers = { "Content-Type": "application/form-data" };
  //   const form = new FormData();
  //   Object.keys(data).map(key => {
  //     return form.append(key, data[key]);
  //   });
  //   return api.post("/test/upload-chunk", form, { headers });
  // };
  const uploadChunk = data => {
    return api.post("/test/upload-chunk", data);
  };

  return {
    artworks: {
      uploadChunk
    }
  };
}
