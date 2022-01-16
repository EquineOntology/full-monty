import { useState } from "react";
import { AppShell, Navbar, Text } from "@mantine/core";
import Header from "./Header";

type AppPageProps = {
  children?: React.ReactNode;
  pageTitle: string;
};

function AppPage(props: AppPageProps) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
        </Navbar>
      }
      header={
        <Header title={props.pageTitle} opened={opened} setOpened={setOpened} />
      }
    >
      {props.children}
    </AppShell>
  );
}

export default AppPage;
