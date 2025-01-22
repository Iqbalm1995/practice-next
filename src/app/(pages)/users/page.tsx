"use client";

import {
  HeaderContent,
  HeaderContentProps,
} from "@/app/components/headerContent";
import SidebarWithHeader from "@/app/components/sidebar";
import { fakeDataUser, userData } from "@/app/types/userInterface";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { use, useEffect, useMemo, useState } from "react";

const HeaderDataContent: HeaderContentProps = {
  titleName: "User Data",
  breadCrumb: ["Home", "User", "Data"],
};

function SettingsPage() {
  const [dataUsers, setdataUsers] = useState<userData[]>([]);
  const [totalData, settotalData] = useState<number>(0);

  useEffect(() => {
    setdataUsers(fakeDataUser);
    settotalData(fakeDataUser.length);
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

  // setup tanstack react-table
  const table = useReactTable({
    // Data
    data: dataUsers,
    columns: columns,
    pageCount: totalData,
    state: {
      pagination,
    },
    // Pipeline
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // manual
    manualFiltering: true,
    manualPagination: true,
  });

  return (
    <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      <Card>
        <CardHeader>{HeaderDataContent.titleName}</CardHeader>
        <CardBody>
          <Flex w={"full"} justifyContent={"space-between"}>
            <TableContainer w={"full"}>
              <Table variant="simple">
                {/* HEAD TABLE CODE */}
                <Thead>
                  {table.getHeaderGroups().map((headerGroup: any, idx) => (
                    <Tr key={idx} bg={"primary.50"}>
                      {headerGroup.headers.map((header: any) => {
                        return (
                          <Th
                            key={header.id}
                            colSpan={header.colSpan}
                            color={"primary.800"}
                          >
                            <Heading as="h5" size="sm">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Heading>
                          </Th>
                        );
                      })}
                    </Tr>
                  ))}
                </Thead>
                {/* BODY TABLE CODE */}
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
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
