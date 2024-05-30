import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box
} from '@chakra-ui/react';
import CategoryAdmin from '../../api/components/CategoryAdmin';
import OrderAdmin from '../../api/components/OrderAdmin';
import UserAdmin from '../../api/components/UserAdmin';


const AdminPanel = () => {
  return (
    <Box p={5}>
      <Tabs isFitted variant="enclosed" colorScheme="blue">
        <TabList mb="1em">
          <Tab>Користувачі</Tab>
          <Tab>Замовлення</Tab>
          <Tab>Категорії</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserAdmin />
          </TabPanel>
          <TabPanel>
            <OrderAdmin />
          </TabPanel>
          <TabPanel>
            <CategoryAdmin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPanel;