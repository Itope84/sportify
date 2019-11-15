<template>
  <div class="matches">
    <!-- <div class="filters row">
      <div class="col-6 col-md-4">
        <div class="form-group">
          <label class="small">Select Season</label>
          <select v-model="season" class="form-control">
            <option :value="season" v-for="season in seasons" :key="season">{{
              season
            }}</option>
          </select>
        </div>
      </div> 
    </div> -->

    <h4 class="mb-2">Matchweek {{matchday}}</h4>
    <loading v-if="!matches.length"></loading>
    <div class="row">
      <div
        class="col-md-6 px-4 py-4 match"
        v-for="match in matches"
        :key="match.id"
      >
        <div class="match-details">
          <div class="home-row">
            <div class="emblem">
              <img src="../assets/home-team.png" alt="" class="img-fluid" />
            </div>
            <h4 class="h6 small mb-0">
              {{ match.homeTeam.name }}
            </h4>

            <div class="outcome">
              <strong
                class="small"
                :class="{
                  'text-success':
                    match.score.fullTime.homeTeam >
                    match.score.fullTime.awayTeam,
                  'text-danger':
                    match.score.fullTime.homeTeam <
                    match.score.fullTime.awayTeam
                }"
                >{{ match.score.fullTime.homeTeam }}</strong
              >
            </div>
          </div>

          <div class="away-row">
            <div class="emblem">
              <img src="../assets/visitor-team.png" alt="" class="img-fluid" />
            </div>
            <h4 class="h6 mb-0 small">
              {{ match.awayTeam.name }}
            </h4>

            <div class="outcome">
              <strong
                class="small"
                :class="{
                  'text-success':
                    match.score.fullTime.homeTeam <
                    match.score.fullTime.awayTeam,
                  'text-danger':
                    match.score.fullTime.homeTeam >
                    match.score.fullTime.awayTeam
                }"
                >{{ match.score.fullTime.awayTeam }}</strong
              >
            </div>
          </div>
        </div>

        <div class="status border-left pl-2 text-center">
          <h6 v-if="match.status === 'FINISHED'">FT</h6>
          <p class="small mb-1">{{ getDate(match.utcDate) }}</p>
          <p class="small mb-0">{{ getTime(match.utcDate) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/apiservice";
import Loading from "../components/Loading";
// const stages = ["REGULAR_SEASON"];
export default {
  data() {
    return {
      matches: [],
      competition: null,
      matchday: 1,
      loading: false,
      season: null
    };
  },

  components: {
      Loading
  },

  computed: {
    //   seasons will be used to filter
    seasons() {
      //   depending on where we're coming from, numberOfAvailableSeasons or seasons might not be available on the competition object. 1 is provided as a fallback
      if (!this.competition) {
        return [];
      }
      const length =
        this.competition.numberOfAvailableSeasons ||
        this.competition.seasons.length ||
        1;

      const current_year = this.competition.currentSeason
        ? new Date(this.competition.currentSeason.startDate).getFullYear()
        : new Date().getFullYear();

      const seasons = [];

      for (let i = 0; i < length; i++) {
        seasons.push(parseInt(current_year) - i);
      }

      return seasons;
    }
  },

  watch: {
    competition: {
      deep: true,
      immediate: true,
      handler: function() {
        this.fetchMatches();
      }
    },
    season: function() {
      this.fetchMatches();
    },
    seasons: {
      deep: true,
      handler: function(seasons) {
        if (!this.season) {
          this.season = seasons[0];
        }
      }
    }
  },

  methods: {
    fetchCompetition() {
      if (this.$route.params.competition) {
        this.competition = this.$route.params.competition;
        this.matchday = this.competition.currentSeason.currentMatchday;
        return;
      }

      ApiService.getCompetition(this.$route.params.competition_id).then(
        response => {
          this.competition = response;
          this.matchday = this.competition.currentSeason.currentMatchday;
        }
      );
    },

    fetchMatches() {
      // fetch matches for the current season
      ApiService.getMatches(
        this.$route.params.competition_id,
        this.season || this.seasons[0] || new Date().getFullYear(),
        this.matchday
      ).then(response => {
        this.matches = response.matches;
      });
    },

    getDate(utctime) {
      const date_arr = utctime.split("T")[0].split("-");
      return `${date_arr[1]}/${date_arr[2]}`;
    },

    getTime(utctime) {
      const date_arr = utctime.split("T")[1].split(":");
      return `${date_arr[0]}:${date_arr[1]}`;
    }
  },

  mounted() {
    this.fetchCompetition();
  }
};
</script>
