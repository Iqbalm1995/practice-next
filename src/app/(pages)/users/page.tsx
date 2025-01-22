"use client";

import {
  HeaderContent,
  HeaderContentProps,
} from "@/app/components/headerContent";
import SidebarWithHeader from "@/app/components/sidebar";
import { fakeDataUser, userData } from "@/app/types/userInterface";
import { Box, Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { use, useEffect, useMemo, useState } from "react";

const HeaderDataContent: HeaderContentProps = {
  titleName: "User Data",
  breadCrumb: ["Home", "User", "Data"],
};

function SettingsPage() {
  const [dataUsers, setdataUsers] = useState<userData[]>([]);

  useEffect(() => {
    setdataUsers(fakeDataUser);
  }, [dataUsers]);

  // Setup Pagination Tabel
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // Setup Column Tabel
  const columns = useMemo<ColumnDef<userData>[]>(
    () => [
      {
        accessorFn: (row) => row.username,
        id: "username",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Username</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Nama</Text>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      <Card>
        <CardHeader>{HeaderDataContent.titleName}</CardHeader>
        <CardBody>
          <Box>
            {/* Code buat cek data json */}
            <pre>{JSON.stringify(dataUsers, null, 2)}</pre>
          </Box>
        </CardBody>
      </Card>
    </SidebarWithHeader>
  );
}

export default SettingsPage;
