import {
  Box,
  Center,
  Header as MantineHeader,
  Image,
  Navbar,
  Title,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
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
        top: 0,
        height: "var(--mantine-header-height)",
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
                src="/full-monty-brand.png"
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
