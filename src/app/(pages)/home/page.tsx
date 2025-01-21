"use client";

import SidebarWithHeader from "@/app/components/sidebar";
import { Box, Card, CardBody, CardHeader } from "@chakra-ui/react";

function HomePage() {
  return (
    <SidebarWithHeader>
      <Card>
        <CardHeader>Home</CardHeader>
        <CardBody>
          <Box>
            <p>Home page content</p>
          </Box>
        </CardBody>
      </Card>
    </SidebarWithHeader>
  );
}

export default HomePage;
