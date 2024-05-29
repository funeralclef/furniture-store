import React from 'react';
import { Box, Flex, Link, Text, Image, Stack, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from './logo.png';

export const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.50" p={4} px={{ base: 2, md: 0 }}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
        {/* Logo and Name */}
        <Box textAlign="center" mb={{ base: 4, md: 0 }}>
          <Image src={logo} alt="My Furniture Store Logo" boxSize={{ base: "150px", md: "220px" }} />
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">My Furniture Store</Text>
        </Box>

        {/* Menu Links */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} textAlign="center" mb={{ base: 4, md: 0 }}>
          <Link href="/" fontWeight="semibold">Головна</Link>
          <Link href="/info" fontWeight="semibold">Інформація</Link>
          <Link href="/furniture" fontWeight="semibold">Меблі</Link>
          <Link href="/builder" fontWeight="semibold">Конструктор</Link>
        </Stack>

        {/* Contact Info and Social Media */}
        <Box textAlign="center">
          <Text fontWeight="semibold">Контакти:</Text>
          <Text fontSize="sm">+380 123 456 789</Text>
          <Text fontSize="sm">info@myfurniturestore.com</Text>
          <Text fontSize="sm" mb={2}>Україна, Київ, вул. Головна, 1</Text>
          <Flex justify="center" gap={2}>
            <Link href="https://facebook.com" isExternal>
              <Icon as={FaFacebookF} boxSize="20px" />
            </Link>
            <Link href="https://twitter.com" isExternal>
              <Icon as={FaTwitter} boxSize="20px" />
            </Link>
            <Link href="https://instagram.com" isExternal>
              <Icon as={FaInstagram} boxSize="20px" />
            </Link>
          </Flex>
        </Box>
      </Flex>

      {/* Copyright */}
      <Text textAlign="center" mt={4} fontSize="sm">
        © 2024 My Furniture Store. Усі права захищені.
      </Text>
    </Box>
  );
};