import { expect } from 'chai';

describe('login flow', () => {
  it('can navigate to login page', async () => {
    await browser.url('/');
    await browser.url('/login');
    const input = await $('input');
    expect(await input.isExisting()).to.be.true;
  });
});
