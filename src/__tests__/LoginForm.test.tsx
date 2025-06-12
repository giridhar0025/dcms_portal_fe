import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/forms/LoginForm';

test('renders login form and submits', async () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  await userEvent.type(emailInput, 'test@example.com');
  const passInput = screen.getByLabelText(/password/i);
  await userEvent.type(passInput, 'password');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(emailInput).toHaveValue('test@example.com');
});
