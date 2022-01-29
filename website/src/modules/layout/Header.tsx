import Head from "next/head";
import {
  Burger,
  Header as MantineHeader,
  MediaQuery,
  useMantineTheme,
  Title,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  opened: boolean;
  title: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export default function Header(props: HeaderProps) {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <MantineHeader height={70} padding="md">
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={props.opened}
              onClick={() => props.setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Title order={2}>{props.title}</Title>
        </div>
      </MantineHeader>
    </>
  );
}