import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect, vi, beforeAll } from "vitest";
import { FormProvider, useForm } from "react-hook-form";
import StepTwoForm from "../features/step-two-form";
import userEvent from "@testing-library/user-event";
import { Steps } from "@chakra-ui/react";
import { Provider } from "../components/ui/provider";

beforeAll(() => {
  globalThis.URL.createObjectURL = vi.fn(() => "mocked-url");
});

const Wrapper = ({ onFormSubmit }: { onFormSubmit: () => void }) => {
  const methods = useForm({
    defaultValues: {
      avatar: undefined,
    },
  });

  return (
    <Provider>
      <FormProvider {...methods}>
        <Steps.Root count={2}>
          <StepTwoForm onFormSubmit={onFormSubmit} />
        </Steps.Root>
      </FormProvider>
    </Provider>
  );
};

test("renders upload area and submit button", () => {
  render(<Wrapper onFormSubmit={() => {}} />);

  expect(screen.getByText(/upload your avatar here/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("shows validation error if submitted without file", async () => {
  render(<Wrapper onFormSubmit={() => {}} />);

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(
    await screen.findByText(/file must be an image|avatar/i)
  ).toBeInTheDocument();
});

test("accepts valid image file, shows preview and allows submit", async () => {
  const onFormSubmit = vi.fn();
  render(<Wrapper onFormSubmit={onFormSubmit} />);

  const file = new File(["avatar"], "avatar.png", { type: "image/png" });
  const input =
    screen.getByTestId("file-input") ||
    document.querySelector('input[type="file"]');
  expect(input).toBeInTheDocument();

  await fireEvent.change(input!, { target: { files: [file] } });

  await waitFor(() => {
    expect(screen.getByAltText(/avatar preview/i)).toBeInTheDocument();
  });

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => {
    expect(onFormSubmit).toHaveBeenCalled();
  });
});

test("change photo button clears preview", async () => {
  render(<Wrapper onFormSubmit={() => {}} />);

  const file = new File(["avatar"], "avatar.png", { type: "image/png" });
  const input =
    screen.getByTestId("file-input") ||
    document.querySelector('input[type="file"]');
  fireEvent.change(input!, { target: { files: [file] } });

  await waitFor(() => {
    expect(screen.getByAltText(/avatar preview/i)).toBeInTheDocument();
  });

  userEvent.click(screen.getByRole("button", { name: /change photo/i }));

  await waitFor(() => {
    expect(screen.queryByAltText(/avatar preview/i)).not.toBeInTheDocument();
  });
});
