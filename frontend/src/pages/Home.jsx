import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";

const Home = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // fetch and add users data to database
  const handleFetch = async () => {
    setFetchLoading(true);
    try {
      let data = await axios.post("https://cointab-c0o9.onrender.com/users");
      console.log(data);
      setFetchLoading(false);
      toast({
        title: "Successful",
        description: "Data saved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (e) {
      setFetchLoading(false);
      toast({
        title: "Try Again...",
        description: "Sorry...",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Redirect to the Users Page
  const handleUsers = () => {
    navigate("/users");
  };

  // Delete users data from Database
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete("https://cointab-c0o9.onrender.com/users");
      setDeleteLoading(false);
      toast({
        title: "Successful",
        description: "Data deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (e) {
      setDeleteLoading(false);
      toast({
        title: "Try Again...",
        description: "Sorry...",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  
  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        display={"flex"}
        alignItems="center"
        backgroundColor=""
      >
        <VStack m="auto" gap="3">
          <Button
            w="200px"
            onClick={handleFetch}
            isLoading={fetchLoading}
            loadingText="Fetching"
            bgColor={"green"}
            colorScheme="green"
            color="white"
            p="20px 30px 20px 30px"
            fontSize={"25px"}
          >
            Fetch
          </Button>
          <Button
            w="200px"
            onClick={handleUsers}
            bgColor={"blue"}
            color="white"
            p="20px 30px 20px 30px"
            colorScheme="blue"
            fontSize={"25px"}
          >
            Users
          </Button>
          <Button
            w="200px"
            onClick={handleDelete}
            isLoading={deleteLoading}
            loadingText="Deleting"
            bgColor={"red"}
            colorScheme="red"
            color="white"
            p="20px 30px 20px 30px"
            fontSize={"25px"}
          >
            Delete
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Home;
