import { Box, Heading } from "@chakra-ui/react";
import "./App.css";
import StepOneForm from "./features/step-one-form";
import { Steps } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Heading as="h1" size="lg" mb={2} textTransform={"uppercase"}>
        welcome!
      </Heading>
      <Heading as="h2" size="md" mb={10}>
        Please fill out the form to join our community!
      </Heading>
      <Steps.Root defaultStep={0} count={2}>
        <Steps.List width={"30%"} display={"flex"} alignSelf={"center"}>
          <Steps.Item key={0} index={0} title={"Step 1"}>
            <Steps.Trigger>
              <Steps.Indicator
                backgroundColor={"#822659"}
                borderColor={"#F487B6"}
              />
              <Steps.Title>Step 1</Steps.Title>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item key={1} index={1} title={"Step 2"}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Steps.Title>Step 2</Steps.Title>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
        <Steps.Content key={0} index={0}>
          <Box as={"div"} justifyContent={"center"} display={"flex"}>
            <StepOneForm />
          </Box>
        </Steps.Content>
        <Steps.Content key={1} index={1}>
          <Box as={"div"} justifyContent={"center"} display={"flex"}>
            <StepOneForm />
          </Box>
        </Steps.Content>

        <Steps.CompletedContent>Thanks for joining us!</Steps.CompletedContent>
      </Steps.Root>
    </>
  );
}

export default App;
