<template>
  <section class="about">
    <p>About the arcade</p>
    <h1>Small games.<br />Good thinking.</h1>
    <span>Crazy Games is a lightweight collection of browser games built for quick, thoughtful play.</span>
  </section>
</template>

<style scoped>
.about {
  width: min(100%, 42rem);
}

p {
  color: var(--accent-teal);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 1rem 0;
  color: white;
  font-size: clamp(3rem, 9vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.95;
}

span {
  display: block;
  max-width: 34rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
}
</style>
