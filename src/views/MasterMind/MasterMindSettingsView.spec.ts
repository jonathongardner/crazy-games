import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'

import MasterMindSettingsView from './MasterMindSettingsView.vue'

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/master-mind', name: 'master-mind', component: { template: '<div />' } },
      {
        path: '/master-mind/settings',
        name: 'master-mind.settings',
        component: MasterMindSettingsView,
      },
    ],
  })
}

describe('MasterMindSettingsView', () => {
  beforeEach(() => localStorage.clear())

  it('saves changes and navigates with a reload signal', async () => {
    const router = makeRouter()
    await router.push({ name: 'master-mind.settings' })
    await router.isReady()
    const wrapper = mount(MasterMindSettingsView, { global: { plugins: [router] } })

    await wrapper.get('input[name="numberOfRows"]').setValue('10')
    await wrapper.get('button.is-success').trigger('click')
    await flushPromises()

    expect(JSON.parse(localStorage.getItem('master-mind') ?? '{}')).toMatchObject({ numberOfRows: 10 })
    expect(router.currentRoute.value.name).toBe('master-mind')
    expect(router.currentRoute.value.query.reload).toBeTruthy()
  })

  it('restores changed values on the first cancel', async () => {
    const router = makeRouter()
    await router.push({ name: 'master-mind.settings' })
    await router.isReady()
    const wrapper = mount(MasterMindSettingsView, { global: { plugins: [router] } })

    const rows = wrapper.get('input[name="numberOfRows"]')
    await rows.setValue('10')
    await wrapper.get('button.is-danger').trigger('click')

    expect((rows.element as HTMLInputElement).value).toBe('8')
    expect(router.currentRoute.value.name).toBe('master-mind.settings')
  })
})
