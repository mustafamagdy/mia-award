export default function(/**@type {ApisauceInstance} */ api) {
  const fetchBooth = query => api.post("/booths/search", query);
  const saveBooth = data => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(data).map(key => {
      return form.append(key, data[key]);
    });
    return api.post("booths", form, { headers });
  };
  const updateBooth = data => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(data).map(key => {
      return form.append(key, data[key]);
    });
    return api.put("booths", form, { headers });
  };
  const deleteBooth = id => api.delete(`/booths/${id}`);

  return { booths: { fetchBooth, saveBooth, updateBooth, deleteBooth } };
}