import { Box, Heading } from '@chakra-ui/react'
import './App.css'
import StepOneForm from './features/step-one-form'

function App() {
  return (
    <>
    <Heading as="h1" size="lg" mb={4} textTransform={'uppercase'}>welcome!</Heading>
    <Heading as="h2" size="md" mb={4}>Please fill out the form to join our community!</Heading>
    <Box as={'div'} justifyContent={'center'} display={'flex'}>
     <StepOneForm />
    </Box>
    </>
  )
}

export default App
