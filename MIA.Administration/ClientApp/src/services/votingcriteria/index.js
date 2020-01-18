export default function (/**@type {ApisauceInstance} */ api) {
  const fetchVotingCriterias = query => api.post("/votingCriterias/search", query);

  const saveVotingCriteria = data => api.post("votingCriterias", data);

  const updateVotingCriteria = data => api.put("votingCriterias", data);

  const deleteVotingCriteria = id => api.delete(`/votingCriterias/${id}`);

  return { votingCriteria: { fetchVotingCriterias, saveVotingCriteria, updateVotingCriteria, deleteVotingCriteria } };
}