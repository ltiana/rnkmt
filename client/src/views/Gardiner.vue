<template>
  <div >
    <h1>Gardiner's List</h1>
    <b-container class="bv-example-row">
    <b-row>
      <b-col id="nav"> A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W| X | Y | Z | Aa</b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>G. Birds</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <GardinerSelection />

      </b-col>
    </b-row>
  </b-container>
    

  </div>
</template>

<script>
// @ is an alias to /src
import GardinerSelection from "@/components/GardinerSelection.vue";

export default {
  name: "Gardiner",
  components: {
    GardinerSelection
  }
};

</script>


