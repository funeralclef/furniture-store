import * as React from 'react';
import { Box, VStack, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CartProvider } from './components/cart/CartContext';
import { Header } from './components/elements/Header';
import { Home } from './components/elements/Home';
import { Footer } from './components/elements/Footer';
import { AuthProvider } from './components/account/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./index.css";
import AdminPanel from './components/admin/AdminPanel';

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
      50: '#f7fafc',
      100: '#1f1f1f',
      200: '#2d3748',
      300: '#4a5568',
      400: '#718096',
      500: '#1a202c',
      600: '#2d3748',
      700: '#4a5568',
      800: '#2d3748',
      900: '#171923',
    },
  },
});

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <VStack spacing={10}>
              <Box width="full" maxW="1050px" mx="auto" px={4}>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  {/* Add other routes here */}
                </Routes>
                <Footer />
              </Box>
            </VStack>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;