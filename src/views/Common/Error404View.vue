<template>
  <section class="error">
    <strong>404</strong>
    <h1>That game is off the board.</h1>
    <p>The page you were looking for does not exist.</p>
    <RouterLink :to="{ name: 'home' }" class="button is-primary">Back home</RouterLink>
  </section>
</template>

<style scoped>
.error {
  text-align: center;
}

strong {
  color: var(--accent-teal);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
}

h1 {
  margin: 1rem 0 0.6rem;
  color: white;
  font-size: clamp(2.3rem, 7vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

p {
  margin-bottom: 2rem;
  color: var(--text-secondary);
}
</style>
