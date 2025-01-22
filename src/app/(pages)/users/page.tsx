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
import {
  fakeDataUser,
  initValueUser,
  userData,
} from "@/app/types/userInterface";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";

const HeaderDataContent: HeaderContentProps = {
  titleName: "User Data",
  breadCrumb: ["Home", "User", "Data"],
};

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

function UsersPage() {
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

  // Configuration Formik
  const formikUser = useFormik({
    initialValues: initValueUser,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
    },
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

        <form onSubmit={formikUser.handleSubmit}>
          <ModalContent>
            <ModalHeader>Form User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box maxWidth="400px" mx="auto" mt={4}>
                <>
                  <FormControl
                    id="username"
                    isInvalid={formikUser.errors.username ? true : false}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.username}
                      placeholder="Isi username..."
                    />
                  </FormControl>
                  <FormErrorMessage>
                    {formikUser.errors.username}
                  </FormErrorMessage>
                </>

                <>
                  <FormControl
                    id="name"
                    isInvalid={formikUser.errors.name ? true : false}
                  >
                    <FormLabel>Nama</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.name}
                      placeholder="Isi nama..."
                    />
                  </FormControl>
                  <FormErrorMessage>{formikUser.errors.name}</FormErrorMessage>
                </>

                <>
                  <FormControl
                    id="email"
                    isInvalid={formikUser.errors.email ? true : false}
                  >
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.name}
                      placeholder="Isi email (ex : yourmail@mail.com)..."
                    />
                  </FormControl>
                  <FormErrorMessage>{formikUser.errors.email}</FormErrorMessage>
                </>

                <>
                  <FormControl
                    id="role"
                    isInvalid={formikUser.errors.role ? true : false}
                    mb={4}
                  >
                    <FormLabel>Role</FormLabel>
                    <Select
                      id="role"
                      name="role"
                      onChange={formikUser.handleChange}
                      value={formikUser.values.role}
                      placeholder="Select role"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="editor">Editor</option>
                    </Select>
                  </FormControl>
                </>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Kembali
              </Button>
              <Button colorScheme="primary" type="submit">
                Simpan Data
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </SidebarWithHeader>
  );
}

export default UsersPage;
