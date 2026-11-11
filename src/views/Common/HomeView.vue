<template>
  <section class="home-hero">
    <div class="hero-copy">
      <p class="eyebrow"><span></span> A tiny arcade for big brains</p>
      <h1>Take a break.<br /><em>Crack the code.</em></h1>
      <p class="intro">
        A growing collection of thoughtful browser games. No accounts, no distractions—just one
        more round.
      </p>
      <RouterLink :to="{ name: 'master-mind' }" class="play-button">
        <span class="play-icon" aria-hidden="true"><i class="fas fa-play"></i></span>
        Play Mastermind
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </RouterLink>
    </div>
    <div class="game-card" aria-hidden="true">
      <div class="card-glow"></div>
      <p class="card-label">Featured game</p>
      <i class="fas fa-brain card-icon"></i>
      <strong>Mastermind</strong>
      <span>Logic · Strategy · Color</span>
      <div class="mini-pegs">
        <i></i><i></i><i></i><i></i>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(17rem, 0.75fr);
  gap: clamp(3rem, 8vw, 8rem);
  align-items: center;
  width: min(100%, 64rem);
}

.eyebrow {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  margin-bottom: 1.4rem;
  color: var(--accent-teal);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.eyebrow span {
  width: 1.7rem;
  height: 2px;
  background: currentColor;
}

h1 {
  max-width: 45rem;
  margin: 0;
  color: white;
  font-size: clamp(3.2rem, 8vw, 6.7rem);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 0.93;
}

h1 em {
  color: transparent;
  background: linear-gradient(100deg, #a5b4fc, #5eead4);
  background-clip: text;
  font-style: normal;
}

.intro {
  max-width: 35rem;
  margin: 1.8rem 0 2.2rem;
  color: var(--text-secondary);
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.8;
}

.play-button {
  display: inline-flex;
  gap: 0.85rem;
  align-items: center;
  padding: 0.7rem 1.1rem 0.7rem 0.7rem;
  border-radius: 1rem;
  color: #07121f;
  background: linear-gradient(135deg, #5eead4, #22d3ee);
  box-shadow: 0 1rem 2.5rem rgb(45 212 191 / 22%);
  font-weight: 800;
  transition: 180ms ease;
}

.play-button:hover {
  color: #07121f;
  box-shadow: 0 1.2rem 3rem rgb(45 212 191 / 32%);
  transform: translateY(-2px);
}

.play-icon {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 0.7rem;
  color: white;
  background: #0f2940;
}

.game-card {
  position: relative;
  display: flex;
  min-height: 25rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 2rem;
  background: linear-gradient(145deg, rgb(35 45 78 / 92%), rgb(16 23 44 / 92%));
  box-shadow: 0 2rem 6rem rgb(0 0 0 / 35%);
  transform: rotate(2.5deg);
}

.card-glow {
  position: absolute;
  top: -7rem;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background: rgb(129 140 248 / 24%);
  filter: blur(10px);
}

.card-label {
  position: absolute;
  top: 1.5rem;
  left: 1.6rem;
  color: #8f9db6;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.card-icon {
  position: relative;
  margin-bottom: 1.3rem;
  color: #a5b4fc;
  font-size: 5.2rem;
  filter: drop-shadow(0 1rem 1.5rem rgb(129 140 248 / 28%));
}

.game-card strong {
  color: white;
  font-size: 1.55rem;
}

.game-card > span {
  margin-top: 0.3rem;
  color: #8f9db6;
  font-size: 0.78rem;
}

.mini-pegs {
  display: flex;
  gap: 0.6rem;
  margin-top: 2rem;
}

.mini-pegs i {
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid rgb(255 255 255 / 20%);
  border-radius: 50%;
  background: #f472b6;
  box-shadow: 0 0.25rem 0.6rem rgb(0 0 0 / 30%);
}

.mini-pegs i:nth-child(2) { background: #fbbf24; }
.mini-pegs i:nth-child(3) { background: #34d399; }
.mini-pegs i:nth-child(4) { background: #818cf8; }

@media (max-width: 760px) {
  .home-hero {
    grid-template-columns: 1fr;
  }

  .game-card {
    display: none;
  }
}
</style>
