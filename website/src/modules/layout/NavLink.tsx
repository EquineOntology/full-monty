import { ReactNode } from "react";
import Link from "next/link";
import { Anchor, Group, Text, ThemeIcon } from "@mantine/core";
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
      <Group
        ref={ref}
        sx={(theme) => ({
          border: `1px solid ${
            hovered ? theme.colors[color][6] : theme.colors[color][0]
          }`,
          borderRadius: "9px",
          cursor: `${hovered ? "pointer" : "initial"}`,
          display: "flex",
          transition: "border-color 0.1s ease-out",
          width: "100%",
        })}
      >
        <>
          {icon && (
            <ThemeIcon
              variant={hovered ? "filled" : "light"}
              sx={{
                borderRadius: "8px 0 0 8px",
                transition: "background-color 0.1s ease-out",
              }}
              size="lg"
              color={color}
            >
              {icon}
            </ThemeIcon>
          )}
          <Text sx={{ paddingRight: 15 }}>
            <Anchor variant="text">{text}</Anchor>
          </Text>
        </>
      </Group>
    </Link>
  );
}

export default NavLink;
