// This cpould've been done inline but is simply an example of abstracting requests... I could create then have one single method to handle errors, store tokens etc
const ApiService = {
  getCompetitions: async function() {
    try {
      const response = await window.axios.get(
        "competitions?areas=2077&plan=TIER_ONE"
      );

      return response.data;
    } catch (error) {
      // handle error here, alert or somthing
    }
  },

  getCompetition: async function(competition_id) {
    try {
      const response = await window.axios.get(`competitions/${competition_id}`);

      return response.data;
    } catch (error) {
      // handle error here, alert or somthing
    }
  },

  getMatches: async function(competition_id, year, matchday) {
    try {
      const response = await window.axios.get(
        `competitions/${competition_id}/matches?season=${year}&matchday=${matchday}`
      );

      return response.data;
    } catch (error) {
      // handle error here, alert or somthing
    }
  },

  getStandings: async function(competition_id) {
    try {
      const response = await window.axios.get(
        `competitions/${competition_id}/standings?standingType=TOTAL`
      );

      return response.data;
    } catch (error) {
      // handle error here, alert or somthing
    }
  }
};

export default ApiService;
