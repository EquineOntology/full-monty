import {
  Box,
  Image,
  Title,
  Center,
  Navbar,
  Header as MantineHeader,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useHover } from "@mantine/hooks";
import PageLinks from "./PageLinks";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const { hovered, ref } = useHover();

  return (
    <Navbar
      sx={{
        border: "none",
        backgroundColor: "transparent",
        height: "auto",
      }}
    >
      <MantineHeader
        height={80}
        p="md"
        fixed
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          whiteSpace: "nowrap",
        }}
      >
        <Center>
          <NextLink href="/">
            <Box
              ref={ref}
              sx={{ display: "flex", cursor: hovered ? "pointer" : "auto" }}
            >
              <Image
                src="/brand.png"
                alt="Brand"
                height="50px"
                width="auto"
                mr="xs"
              />
              <Title order={1} mr="10vmin">
                {title}
              </Title>
            </Box>
          </NextLink>
          <PageLinks />
        </Center>
      </MantineHeader>
    </Navbar>
  );
}
