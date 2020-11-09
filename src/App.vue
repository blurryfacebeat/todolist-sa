<template>
  <div class="container">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header';

export default {
  components: {
    appHeader: Header
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    color: #333333;
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;

    background-color: #fff;

    @media screen and (max-width: 767px) {
        font-size: calc(10px + 13 * (100vw - 320px) / 447);
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        font-size: calc(10px + 4 * (100vw - 768px) / 255);
    }

    @media (min-width: 1024px) and (max-width: 1360px) {
        font-size: calc(8px + 2 * (100vw - 1024px) / 336);
    }
  }

  .container {
    max-width: 124rem;
    width: 95%;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 5rem;

    background-color: rgb(214, 249, 255);
    border-radius: 2rem;
    box-shadow: 0 0 5rem 0.1rem rgba(131, 112, 112, 0.2);

    h1 {
      margin-bottom: 3rem;

      text-align: center;
      font-size: 4rem;
      color: rgb(68, 68, 68);
    }
  }
</style>