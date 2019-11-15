<template>
  <div class="home">
    <div class="header-section">
      <div class="container">
        <div class="d-flex flex-column align-items-center">
          <div class="logo">
            <img src="../assets/logo.png" alt="" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>

    <div class="container px-0">
      <div class="page-body border-none card py-4">
        <h4><strong>All Competitions</strong></h4>

        <div class="row">
          <loading v-if="!competitions.length"></loading>
          <div
            class="col-sm-6 mb-4"
            v-for="competition in competitions"
            :key="competition.id"
            @click="openCompetition(competition)"
          >
            <div class="px-4 py-4 shadow-lg rounded-sm competition">
              <div class="competition--emblem">
                <img
                  :src="
                    competition.emblemUrl ||
                      emblems[competition.code] ||
                      emblems['default']
                  "
                  alt=""
                  class="img-fluid"
                />
              </div>
              <div class="competition--details">
                <h4 class="h5 mb-1">
                  <strong>{{ competition.name }}</strong>
                </h4>
                <span class="small h6">{{ competition.area.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "../services/apiservice";
import emblems from "../utils/emblems";
import Loading from "../components/Loading";

// const c_response = {
//   count: 10,
//   filters: { areas: [2077], plan: "TIER_ONE" }
// };

export default {
  name: "home",
  components: {
    Loading
  },

  data() {
    return {
      competitions: [],
      emblems: emblems
    };
  },

  methods: {
    openCompetition(competition) {
      this.$router.push({
        name: "competition",
        params: {
          competition_id: competition.id,
          name: competition.name,
          competition: competition
        }
      });
    }
  },

  mounted() {
    ApiService.getCompetitions().then(response => {
      this.competitions = response.competitions || [];
    });
  }
};
</script>
