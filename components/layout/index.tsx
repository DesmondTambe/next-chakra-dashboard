import { Box, Stack } from "@chakra-ui/layout";
import React, { createContext } from "react";
import Navbar from "./navbar";
import Page from "./page";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import Scroll from "./scroll";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import MobileSidebar from "./sidebar/mobile";
import { useMediaQuery } from "@chakra-ui/media-query";
import Login from "pages/login";

export const NavContext = createContext<UseDisclosureReturn>(null);

const SiteLayout = ({ children }: any) => {
  const sidebarState = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  let allowed = Cookies.get("access_token") ? true : false;

  return (
    <Scroll>
      {/* {allowed ? ( */}
        <NavContext.Provider value={sidebarState}>
          <Box textStyle="light">
            <Navbar />
            <Box pos="relative" h="max-content" m={[2, , 5]}>
              <Stack direction="row" spacing={{ md: 5 }}>
                <Sidebar />
                {isSmallScreen && <MobileSidebar />}
                <Page>{children}</Page>
              </Stack>
            </Box>
          </Box>
        </NavContext.Provider>
      {/* // ) : (
      //   <Login />
      // )} */}
    </Scroll>
  );
};

export default SiteLayout;
