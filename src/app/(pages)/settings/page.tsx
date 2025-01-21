"use client";

import SidebarWithHeader from "@/app/components/sidebar";
import { Box, Card, CardBody, CardHeader } from "@chakra-ui/react";

function SettingsPage() {
  return (
    <SidebarWithHeader>
      <Card>
        <CardHeader>Setting</CardHeader>
        <CardBody>
          <Box>
            <p>Setting page content</p>
          </Box>
        </CardBody>
      </Card>
    </SidebarWithHeader>
  );
}

export default SettingsPage;
