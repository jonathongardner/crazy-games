<template>
  <footer class="site-footer">
    <span>Built for curious minds.</span>
    <a href="https://github.com/jonathongardner/crazy-games" target="_blank" rel="noopener">
      <span class="icon" aria-hidden="true"><i class="fab fa-github"></i></span>
      Source
    </a>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 2rem, 74rem);
  margin: 0 auto;
  padding: 1rem 0 1.5rem;
  color: #7887a2;
  font-size: 0.78rem;
}

a {
  color: var(--text-secondary);
}

a:hover {
  color: var(--accent-teal);
}
</style>
