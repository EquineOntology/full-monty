import { Anchor, Center, Footer as MantineFooter, Text } from "@mantine/core";

export default function Footer() {
  return (
    <MantineFooter
      height="50px"
      fixed={true}
      sx={{
        alignItems: "center",
        borderTop: "1px solid #eaeaea",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Center>
        <Text mr={6}>
          Powered by the 🧠, ❤️, and &lt;insert spleen emoji&gt; of
        </Text>
        <Anchor href="https://fratta.dev">Christian Fratta.</Anchor>
      </Center>
    </MantineFooter>
  );
}
