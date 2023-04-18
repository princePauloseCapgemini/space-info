import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import TopBar from "./TopBar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <TopBar />
      {children}
    </Box>
  );
}

export default Layout;
