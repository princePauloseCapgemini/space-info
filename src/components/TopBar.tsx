import { useCallback } from "react";

import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const variant = useCallback(
    (path: string) => (path === pathname ? "solid" : "link"),
    [pathname]
  );

  return (
    <Flex alignItems="center" boxShadow="sm">
      <Image src="./logo.png" w="240px" />
      <HStack spacing="4">
        <Button
          data-testid="home-nav"
          variant={variant("/")}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          data-testid="ships-nav"
          variant={variant("/ships")}
          onClick={() => navigate("/ships")}
        >
          Ships
        </Button>
        <Button
          data-testid="questions-nav"
          variant={variant("/questions")}
          onClick={() => navigate("/questions")}
        >
          Questions
        </Button>
      </HStack>
    </Flex>
  );
}

export default TopBar;
