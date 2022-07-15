import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { ComplexFormImpl } from '@implementations';

describe('Complex Form implementation', () => {
  it('submit button is enabled after fill form', async () => {
    render(() => <ComplexFormImpl />);
    fireEvent.click(screen.getByTestId('fill'));
    await waitFor(() => {
      expect((screen.getByTestId('submit') as HTMLButtonElement).disabled).toBe(false);
      expect(screen.getByTestId('form-status').innerHTML).toBe('Valid');
    });
  });

  it('submit button is disabled after submitting form', async () => {
    render(() => <ComplexFormImpl />);
    fireEvent.click(screen.getByTestId('fill'));
    fireEvent.click(screen.getByTestId('submit'));
    await waitFor(() => {
      expect((screen.getByTestId('submit') as HTMLButtonElement).disabled).toBe(true);
      expect(screen.getByTestId('form-status').innerHTML).toBe('Invalid');
    });
  });

  it('nested contact field is invalid', async () => {
    render(() => <ComplexFormImpl />);
    fireEvent.click(screen.getByTestId('fill'));
    fireEvent.input(screen.getByTestId('contact.email'), { target: { value: '' } });
    fireEvent.input(screen.getByTestId('contact.phone'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByTestId('contact-status').innerHTML).toBe('Invalid');
    });
  });
});
