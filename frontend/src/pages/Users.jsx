import { Box, Center, HStack } from "@chakra-ui/layout";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "@chakra-ui/image";
import { Spinner } from "@chakra-ui/spinner";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import found from "./found.png";
import { Link } from "react-router-dom";

const Users = () => {
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [array, setArray] = useState([]);

  // Fetching data from api
  async function fetchData(page, country, gender, age) {
    let apiUrl = `https://cointab-c0o9.onrender.com/users?page=${page}`;
    if (country) {
      apiUrl += "&country=" + country;
    }
    if (gender) {
      apiUrl += "&gender=" + gender;
    }
    if (age) {
      apiUrl += "&age=" + age;
    }
    try {
      let users = await axios.get(apiUrl);
      if (users.data.total === 0) {
        setArray([]);
        setData(users.data.data);
        setLoading(false);
      } else {
        setTotal(Math.ceil(users.data.total / 10));
        setData(users.data.data);
        setLoading(false);
        let arr = [];
        for (let i = 1; i <= Math.ceil(users.data.total / 10); i++) {
          arr.push(i);
          setArray(arr);
        }
      }
    } catch (e) {
      setArray([]);
      setLoading(false);
    }
  }

  // Reset all filters
  const handleReset = () => {
    setGender("");
    setCountry("");
    setAge("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value)
    setPage(1)
  };

  const handleAge = (e) => {
    setAge(e.target.value)
  };

  const handleGender = (e) => {
    setGender(e.target.value)
    setPage(1)
  };

  // Displaying the data
  useEffect(() => {
    setLoading(true);
    fetchData(page, country, gender, age);
  }, [page, age, country, gender]);

  return (
    <>
      <Box>
        <HStack mt={"30px"} justifyContent="center">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Select
            w={"300px"}
            onChange={handleGender}
            value={gender}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>

          <Select
            w={"300px"}
            onChange={handleCountry}
            value={country}
          >
            <option value="">Country</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="United States">United States</option>
            <option value="Denmark">Denmark</option>
            <option value="China">China</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
          </Select>

          <Select
            onChange={handleAge}
            w={"300px"}
            value={age}
          >
            <option value="">Age</option>
            <option value="10">10+</option>
            <option value="20">20+</option>
            <option value="30">30+</option>
            <option value="50">50+</option>
          </Select>

          <Button
            onClick={handleReset}
            p="20px 30px 20px 30px"
            fontSize="20px"
            bgColor="red"
            color={"white"}
          >
            Reset Filter
          </Button>
        </HStack>
        {loading ? (
          <>
            <Center h={"100vh"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                width="100px"
                height="100px"
              />
            </Center>
          </>
        ) : data.length > 0 ? (
          <TableContainer border="1px" w={"90%"} m="auto" mt={"30px"}>
            <Table size="sm" border="1px">
              <Thead>
                <Tr>
                  <Th border="1px" p="20px 30px 20px 30px" fontSize="20px">
                    <Center>Profile</Center>
                  </Th>
                  <Th border="1px" p="20px 30px 20px 30px" fontSize="20px">
                    <Center>Name</Center>
                  </Th>
                  <Th border="1px" p="20px 30px 20px 30px" fontSize="20px">
                    <Center>Country</Center>
                  </Th>
                  <Th border="1px" p="20px 30px 20px 30px" fontSize="20px">
                    <Center>Gender</Center>
                  </Th>
                  <Th border="1px" p="20px 30px 20px 30px" fontSize="20px">
                    <Center>Age</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((el) => {
                  return (
                    <Tr>
                      <Td border="1px">
                        <Center>
                          <Image src={el.large}></Image>
                        </Center>
                      </Td>
                      <Td border="1px">
                        <Center>
                          {el.name.title} {el.name.first} {el.name.last}
                        </Center>
                      </Td>
                      <Td border="1px">
                        <Center>{el.country}</Center>
                      </Td>
                      <Td border="1px" textTransform={"capitalize"}>
                        <Center>{el.gender}</Center>
                      </Td>
                      <Td border="1px">
                        <Center>{el.age}</Center>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Center>
            <Image src={found} w="300px" h="300px"></Image>
          </Center>
        )}
        {data.length > 0 ? (
          <HStack justifyContent={"center"} mt="20px">
            <Button
              onClick={() => setPage((page) => page - 1)}
              isDisabled={page === 1}
            >
              Prev
            </Button>
            {array.map((el) => {
              return (
                <Button
                  onClick={() => setPage(el)}
                  bg={page === el ? "blue" : "black"}
                  color="white"
                >
                  {el}
                </Button>
              );
            })}
            <Button
              onClick={() => setPage((page) => page + 1)}
              isDisabled={page === total}
            >
              Next
            </Button>
          </HStack>
        ) : null}
      </Box>
    </>
  );
};

export default Users;
