import React from 'react';
import {
  Box, Flex, Text, Link, Image, Button, VStack, IconButton, Menu,
  MenuButton, MenuList, MenuItem, useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useCart } from '../cart/CartContext';
import { useAuth } from '../account/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

import logo from './logo.png';
import { CartModal } from '../cart/CartModal';
import { LoginModal } from '../account/LoginModal';

export const Header: React.FC = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userProfileMenu = (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="brand.100" color="white" _hover={{ bg: 'brand.200' }} ml={1}>
        Кабінет
      </MenuButton>
      <MenuList>
        <MenuItem as={RouterLink} to="/profile">Профіль</MenuItem>
        {user.role === 'user' && <MenuItem as={RouterLink} to="/orders">Замовлення</MenuItem>}
        {user.role === 'admin' && <MenuItem as={RouterLink} to="/admin">Панель адміністратора</MenuItem>}
        <MenuItem onClick={() => { logout(); onClose(); }}>Вихід</MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Box bg="gray.50" px={{ base: 2, md: 4 }} py={5}>
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
        <Flex align="center">
          <Image src={logo} alt="My Furniture Store Logo" boxSize={{ base: "30px", md: "40px" }} />
          <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" ml={3}>
            My Furniture Store
          </Text>
        </Flex>

        <Flex justify="center" flexGrow={1} display={{ base: 'none', md: 'flex' }} mx={4}>
          <Link as={RouterLink} to="/" px={3} fontWeight="semibold">
            Головна
          </Link>
          <Link as={RouterLink} to="/info" px={3} fontWeight="semibold">
            Інформація
          </Link>
          <Link as={RouterLink} to="/furniture" px={3} fontWeight="semibold">
            Меблі
          </Link>
          <Link as={RouterLink} to="/builder" px={3} fontWeight="semibold">
            Конструктор
          </Link>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} zIndex="dropdown">
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" />
            <MenuList>
              <MenuItem as={RouterLink} to="/">Головна</MenuItem>
              <MenuItem as={RouterLink} to="/info">Інформація</MenuItem>
              <MenuItem as={RouterLink} to="/furniture">Меблі</MenuItem>
              <MenuItem as={RouterLink} to="/builder">Конструктор</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <CartModal />
        {user.username ? userProfileMenu : <LoginModal onOpenProfile={() => onOpen()} />}
      </Flex>
    </Box>
  );
};