import { describe, expect, it } from 'vitest'

import router from './index'

describe('router', () => {
  it('defines the legacy route names and nested metadata', () => {
    const routes = router.getRoutes()
    expect(routes.map((route) => route.name)).toEqual(
      expect.arrayContaining([
        'home',
        'master-mind',
        'master-mind.settings',
        'master-mind.about',
        'about',
        '404',
      ]),
    )
    expect(routes.find((route) => route.name === 'master-mind')?.meta).toMatchObject({
      settings: true,
      about: true,
    })
  })

  it('resolves nested and catch-all locations', () => {
    expect(router.resolve({ name: 'master-mind.settings' }).path).toBe('/master-mind/settings')
    expect(router.resolve('/missing-page').name).toBe('404')
  })
})
