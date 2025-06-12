describe('login flow', () => {
  it('should show login page and submit', async () => {
    await browser.url('/login');
    await $('#email').setValue('test@example.com');
    await $('#password').setValue('password');
    await $('button[type=submit]').click();
    await browser.pause(500);
    await expect(browser).toHaveUrlContaining('/dashboard');
  });
});
