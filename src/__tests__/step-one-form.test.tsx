import { render, screen, waitFor } from "@testing-library/react";
import { test, expect, beforeEach, vi } from "vitest";
import { FormProvider, useForm } from "react-hook-form";
import StepOneForm from "../features/step-one-form";
import { Steps } from "@chakra-ui/react";
import { Provider } from "../components/ui/provider";
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ['Sports', 'Music', 'Dancing', 'Games'],
  }) as unknown as typeof fetch;
});

const Wrapper = () => {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
      interests: [],
    },
  });

  return (
    <Provider>
      <FormProvider {...methods}>
        <Steps.Root count={2}>
          <StepOneForm />
        </Steps.Root>
      </FormProvider>
    </Provider>
  );
};

test("renders all fields", () => {
  render(<Wrapper />);
  expect(screen.getByLabelText(/^full name$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
  expect(screen.getByText(/interests/i)).toBeInTheDocument();
});

test('shows validation errors on empty submit', async () => {
  render(<Wrapper />);

  const button = screen.getByRole('button', { name: /next step/i });
  await userEvent.click(button);

  expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
  expect(await screen.findByText(/the password must be at least 6 characters long/i)).toBeInTheDocument();
  expect(await screen.findByText(/the confirm password must be at least 6 characters long/i)).toBeInTheDocument();
  expect(await screen.findByText(/please choose at least 1 interest/i)).toBeInTheDocument();
});

test('submits valid step one and proceeds to step two', async () => {
  render(<Wrapper />);

  await userEvent.type(screen.getByLabelText(/^full name$/i), 'Йоанна Ценкова');
  await userEvent.type(screen.getByLabelText(/^password$/i), 'Blackdeep123!');
  await userEvent.type(screen.getByLabelText(/^confirm password$/i), 'Blackdeep123!');

  await waitFor(() => expect(screen.getByRole('combobox')).toBeInTheDocument());

  const select = screen.getByRole('combobox');
  await userEvent.type(select, 'Music');
  await userEvent.keyboard('{Enter}');
  await userEvent.type(select, 'Dancing');
  await userEvent.keyboard('{Enter}');

  const submitBtn = screen.getByRole('button', { name: /next step/i });
  await userEvent.click(submitBtn);

  await waitFor(() =>
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
);
});
