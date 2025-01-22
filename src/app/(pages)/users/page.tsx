"use client";

import {
  HeaderContent,
  HeaderContentProps,
} from "@/app/components/headerContent";
import SidebarWithHeader from "@/app/components/sidebar";
import {
  TableContent,
  TableControlContent,
} from "@/app/components/tableContent";
import { fakeDataUser, userData } from "@/app/types/userInterface";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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
  useDisclosure,
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
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const HeaderDataContent: HeaderContentProps = {
  titleName: "User Data",
  breadCrumb: ["Home", "User", "Data"],
};

function SettingsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      {
        accessorFn: (row) => row.email,
        id: "email",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>E-Mail</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.role,
        id: "role",
        cell: (info) => info.getValue(),
        header: () => <Text fontWeight={600}>Role</Text>,
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
    // pageCount: totalData,
    state: {
      pagination,
    },
    // Pipeline
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // manual
    manualFiltering: false,
    manualPagination: false,
  });

  return (
    <SidebarWithHeader>
      <HeaderContent {...HeaderDataContent} />
      <Card>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text>{HeaderDataContent.titleName}</Text>
            <Button colorScheme="primary" onClick={onOpen}>
              Add User
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          {/* Table Component */}
          <TableContent table={table} />
          {/* Table Controll Components */}
          <TableControlContent table={table} />
          <Box>{/* <pre>{JSON.stringify(table, null, 2)}</pre> */}</Box>
        </CardBody>
      </Card>
      {/* MODAL FORM USER */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box maxWidth="400px" mx="auto" mt={4}>
              <FormControl mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  // value={formData.username}
                  // onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  // value={formData.name}
                  // onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  // value={formData.email}
                  // onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  // value={formData.role}
                  // onChange={handleInputChange}
                  placeholder="Select role"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                </Select>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Kembali
            </Button>
            <Button colorScheme="primary">Simpan Data</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SidebarWithHeader>
  );
}

export default SettingsPage;
