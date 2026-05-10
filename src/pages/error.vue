<template>
  <main class="page-error">
    <div class="container">
      <h1>Page not found</h1>
      <p>
        The page you are looking for does not exist.        
      </p>
      <router-link class="btn btn--secondary" :to="{ name: 'home'}">&#10094; {{ $t('show.back') }}</router-link> 
    </div>
  </main>
</template>

<script>
  export default {
    name: 'PageError',
  }
</script>

<style>
  .page-error {
    display: flex;
    padding-top: 10vh;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
</style>