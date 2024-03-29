import { Center, Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  text: string;
  to: string;
  icon?: ReactNode;
  color?: string;
};

export default function NavLink({ text, to, icon, color = "primary" }: Props) {
  const { hovered, ref } = useHover();
  const router = useRouter();

  const dimmed = router.pathname !== to;
  color = dimmed && !hovered ? "gray" : color;

  return (
    <NextLink href={to}>
      <Center>
        <Group
          ref={ref}
          position="center"
          spacing={5}
          sx={(theme) => ({
            backgroundColor: hovered ? theme.colors[color][6] : "transparent",
            borderRadius: "30px",
            cursor: `${hovered ? "pointer" : "initial"}`,
            padding: "3px 15px 3px 10px",
            transition:
              "background-color 0.1s ease-out, border-color 0.1s ease-out",
          })}
        >
          <Group
            sx={(theme) => ({
              color: hovered ? theme.colors[color][0] : theme.colors[color][6],
              backgroundColor: "transparent",
            })}
          >
            {icon}
          </Group>
          <Text
            sx={(theme) => ({
              fontWeight: 500,
              color: hovered ? theme.colors[color][0] : theme.colors[color][9],
            })}
          >
            {text}
          </Text>
        </Group>
      </Center>
    </NextLink>
  );
}
