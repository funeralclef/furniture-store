import * as React from 'react';
import { Box, VStack, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CartProvider } from './components/CartContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import "./index.css"
import { color } from 'framer-motion';

// Extend the theme to include custom colors, fonts, etc.
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  colors: {
    brand: {
      50: '#000000',
      100: '#1f1f1f',
      200: '#ffffff',
      300: '#999999',
      400: '#c71218',
      500: '#1c1c1c',
      600: '#c7c7c7',
      700: '#006ba1',
      800: '#005885',
      900: '#003f5e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <VStack spacing={10}>        
          <Box width="full" maxW="1050px" mx="auto" px={4} >
          <Header />
            <Home /> 
              <Footer/>
          </Box>
        </VStack>    
      </CartProvider>
    </ChakraProvider>
  );
};

export default App;