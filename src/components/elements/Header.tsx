import React from 'react';
import { Box, Flex, Text, Link, Image, Button, VStack, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useCart } from '../cart/CartContext';
import { CartModal } from '../cart/CartModal';
import logo from './logo.png';

export const Header: React.FC = () => {
  const { items } = useCart();

  return (
    <Box bg="gray.50" px={{ base: 2, md: 4 }} py={5}>
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
        {/* Logo and Store Name */}
        <Flex align="center">
          <Image src={logo} alt="My Furniture Store Logo" boxSize={{ base: "30px", md: "40px" }} />
          <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" ml={3}>
            My Furniture Store
          </Text>
        </Flex>

        {/* Menu for Mobile and Desktop */}
        <Flex justify="center" flexGrow={1} display={{ base: 'none', md: 'flex' }} mx={4}>
          <Link href="/" px={3} fontWeight="semibold">
            Головна
          </Link>
          <Link href="/info" px={3} fontWeight="semibold">
            Інформація
          </Link>
          <Link href="/furniture" px={3} fontWeight="semibold">
            Меблі
          </Link>
          <Link href="/builder" px={3} fontWeight="semibold">
            Конструктор
          </Link>
        </Flex>

        {/* Hamburger Menu for Mobile */}
        <Box display={{ base: 'block', md: 'none' }} zIndex="dropdown">
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" />
            <MenuList>
              <MenuItem as={Link} href="/">
                Головна
              </MenuItem>
              <MenuItem as={Link} href="/info">
                Інформація
              </MenuItem>
              <MenuItem as={Link} href="/furniture">
                Меблі
              </MenuItem>
              <MenuItem as={Link} href="/builder">
                Конструктор
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* Cart */}
        <CartModal />
      </Flex>
    </Box>
  );
};