import { expect } from 'chai'

describe('login flow', () => {
  it('shows home page', async () => {
    await browser.url('/')
    const title = await browser.getTitle()
    expect(title).to.not.equal('')
  })
})
