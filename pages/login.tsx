import { NextSeo } from "next-seo";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { Field, Form, Formik } from "formik";

interface SignInFormValues {
  email: string;
  password: string;
}

// login schema validate with yup
const LogInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().required("Password is required!").min(8).max(200),
});

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  return (
    <>
      <NextSeo title="Login" description="Login Dashboard" />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          width={{ base: "100%", sm: "100%" }}
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>E-commerce</Heading>
            {/* <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text> */}
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (values: SignInFormValues) => {
                setFormSubmitting(true);
                try {
                  await login(values.email, values.password);
                  // redirect to admin dashboard
                  window.location.href = "/";
                } catch (error: unknown) {
                  let errorMessage = "error.unknown";
                  if (typeof error === "string") {
                    errorMessage = error.toUpperCase();
                  } else if (error instanceof Error) {
                    errorMessage = error.message;
                  }
                  setFormError(errorMessage);
                  setFormSubmitting(false);
                }
              }}
              validationSchema={LogInSchema}
            >
              {(props) => (
                <Form>
                  <Stack spacing={4}>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                          id="email"
                        >
                          <FormLabel>Email address</FormLabel>
                          <Input type="email" {...field} />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          id="password"
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel>Password</FormLabel>
                          <Input type="password" value={password} {...field} />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Stack spacing={10}>
                      <Stack
                        width={{ base: "100%", sm: "100%" }}
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Text></Text>
                        {/* <Link color={"blue.400"}>Forgot password?</Link> */}
                      </Stack>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        type="submit"
                        isLoading={formSubmitting}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
