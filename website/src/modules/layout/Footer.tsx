import { Anchor, Box, Center, Text } from "@mantine/core";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        alignItems: "center",
        borderTop: "1px solid #eaeaea",
        display: "flex",
        height: "50px",
        justifyContent: "center",
      }}
    >
      <Center>
        <Text mr={6}>
          Powered by the 🧠, ❤️, and &lt;insert spleen emoji&gt; of
        </Text>
        <Anchor href="https://fratta.dev">Christian Fratta.</Anchor>
      </Center>
    </Box>
  );
}

export default Footer;
