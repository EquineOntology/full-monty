import { ReactNode } from "react";
import Link from "next/link";
import { Center, Group, Text, ThemeIcon } from "@mantine/core";
import { useHover } from "@mantine/hooks";

type Props = {
  text: string;
  to: string;
  color?: string;
  icon?: ReactNode;
};

function NavLink({ text, to, color = "primary", icon }: Props) {
  const { hovered, ref } = useHover();

  return (
    <Link href={to} passHref>
      <Center>
        <Group
          ref={ref}
          position="center"
          spacing={5}
          sx={(theme) => ({
            backgroundColor: hovered
              ? theme.colors[color][6]
              : theme.colors[color][0],
            border: `1px solid ${theme.colors[color][6]}`,
            borderRadius: "30px",
            cursor: `${hovered ? "pointer" : "initial"}`,
            padding: "3px 15px 3px 10px",
            transition:
              "background-color 0.1s ease-out, border-color 0.1s ease-out",
          })}
        >
          {icon && (
            <ThemeIcon
              variant={hovered ? "filled" : "light"}
              radius={50}
              sx={{
                transition: "background-color 0.1s ease-out",
              }}
              color={color}
            >
              {icon}
            </ThemeIcon>
          )}
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
    </Link>
  );
}

export default NavLink;
