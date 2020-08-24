<template>
    <b-container >
        <b-row >
            <b-col>
                <ul class="list-unstyled">
                    <b-media tag="li">
                        <template v-slot:aside>
                            <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
                        </template>
                        <h5 class="mt-0 mb-1">G17</h5>
                        <p class="mb-0">
                            owl <br>
                            Uses: <br>
                            <ul>
                                <li>Uniliteral m</li>
                                <li>Preposition XXX</li>
                            </ul>
                        </p>
                    </b-media>

                    <b-media tag="li" class="my-4">
                        <template v-slot:aside>
                        <b-img blank blank-color="#cba" width="64" alt="placeholder"></b-img>
                        </template>

                        <h5 class="mt-0 mb-1">G18</h5>
                        <p class="mb-0">
                            two owls <br>
                            Uses: <br>
                            <ul>
                                <li>Biiteral mm</li>
                            </ul>
                        </p>
                    </b-media>

                    <b-media tag="li">
                        <template v-slot:aside>
                            <b-img blank blank-color="#bac" width="64" alt="placeholder"></b-img>
                        </template>

                        <h5 class="mt-0 mb-1">List-based media object</h5>
                        <p class="mb-0">
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                            Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
                            ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </p>
                    </b-media>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "GardinerSelection"
}
</script>

<style scoped lang="scss">
    b-container {
        text-align: left 
    }
</style>