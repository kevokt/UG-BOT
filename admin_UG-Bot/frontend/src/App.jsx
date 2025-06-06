import { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

const DemoToggle = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  );
};
const Demo = () => {
  return (
    <HStack>
      <Button colorPalette="teal" variant="outline">
        Click me
      </Button>
      <Button>Click me</Button>
    </HStack>
  );
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box>
        <Demo />
        <DemoToggle />
      </Box>
    </>
  );
}

export default App;
