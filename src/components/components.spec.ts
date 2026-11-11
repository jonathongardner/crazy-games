import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'

import type { TurnState } from '@/types/mastermind'

import MyInput from './form/MyInput.vue'
import GameTurn from './master-mind/game/GameTurn.vue'
import MyModal from './MyModal.vue'

describe('shared components', () => {
  it('emits numeric input model updates', async () => {
    const wrapper = mount(MyInput, { props: { value: 2, type: 'number' } })
    await wrapper.get('input').setValue('7')
    expect(wrapper.emitted('update:value')).toEqual([[7]])
  })

  it('emits both modal close contracts', async () => {
    const wrapper = mount(MyModal)
    await wrapper.get('button.delete').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('update:show')).toEqual([[false]])
  })

  it('only submits complete editable turns', async () => {
    const turn: TurnState = {
      correct: [0, 0],
      userPick: [
        { id: 0, codePeg: '#000000' },
        { id: 1, codePeg: '' },
      ],
    }
    const wrapper = mount(GameTurn, { props: { turn, editable: true } })
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()

    turn.userPick[1]!.codePeg = '#ffffff'
    await wrapper.setProps({ turn: { ...turn } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('completes and restarts a one-slot game', async () => {
    localStorage.setItem(
      'master-mind',
      JSON.stringify({ options: ['#000000', '#ffffff'], numberOfSlots: 1, numberOfRows: 1 }),
    )
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { default: MasterMindGame } = await import('./master-mind/MasterMindGame.vue')
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: { template: '<div />' } }],
    })
    await router.push('/')
    await router.isReady()
    const wrapper = mount(MasterMindGame, { global: { plugins: [router] } })
    const emptyPeg = wrapper.findAll('figure[draggable="true"]').at(-1)!
    await emptyPeg.trigger('drop', { dataTransfer: { getData: () => '#000000' } })
    await wrapper.get('button[aria-label="Submit guess"]').trigger('click')
    expect(wrapper.text()).toContain('You Broke the Code!')

    await wrapper.get('#restart').trigger('click')
    expect(wrapper.text()).not.toContain('You Broke the Code!')
  })
})
