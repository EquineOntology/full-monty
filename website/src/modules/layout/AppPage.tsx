import { useState } from "react";
import { AppShell, Navbar } from "@mantine/core";
import Header from "./Header";

type Props = {
  children?: React.ReactNode;
  pageTitle: string;
};

function AppPage(props: Props) {
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
          <div></div>
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
