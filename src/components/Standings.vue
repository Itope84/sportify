<template>
  <div class="standings">
    <loading v-if="!standings.length"></loading>
    <div
      class="standings--group"
      v-for="(group, index) in standings"
      :key="index"
    >
      <h5 class="mb-0 group-name">
        <strong>{{ group.group && group.group.split("_").join(" ") }}</strong>
      </h5>
      <div class="standings-table">
        <!-- standing header -->
        <div class="standing-row standing-header text-muted">
          <div class="position"></div>
          <div class="team-name">Team</div>
          <div class="mp">MP</div>
          <div class="win">W</div>
          <div class="draw">D</div>
          <div class="lose">L</div>
          <div class="gf">GF</div>
          <div class="ga">GA</div>
          <div class="points">Pts</div>
        </div>

        <div
          class="standing-row"
          v-for="team in group.table"
          :key="team.position"
        >
          <div class="position">{{ team.position }}</div>
          <div class="team-name">
            <div class="emblem">
              <img :src="team.team.crestUrl" alt="" class="img-fluid" />
            </div>
            {{ team.team.name }}
          </div>
          <div class="mp">{{ team.playedGames }}</div>
          <div class="win">{{ team.won }}</div>
          <div class="draw">{{ team.draw }}</div>
          <div class="lose">{{ team.lost }}</div>
          <div class="gf">{{ team.goalsFor }}</div>
          <div class="ga">{{ team.goalsAgainst }}</div>
          <div class="points">{{ team.points }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/apiservice";
import Loading from "../components/Loading";
export default {
  components: {
    Loading
  },
  data() {
    return {
      standings: []
    };
  },
  mounted() {
    ApiService.getStandings(this.$route.params.competition_id).then(
      response => {
        this.standings = response.standings;
      }
    );
  }
};
</script>
