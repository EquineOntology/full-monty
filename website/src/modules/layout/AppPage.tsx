import { useState } from "react";
import { AppShell } from "@mantine/core";
import Header from "./Header";
import Nav from "./Nav";

type Props = {
  children?: React.ReactNode;
  pageTitle: string;
};

function AppPage(props: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<Nav opened={opened} />}
      header={
        <Header
          title={props.pageTitle}
          opened={opened}
          setOpened={setOpened}
        />
      }
    >
      {props.children}
    </AppShell>
  );
}

export default AppPage;
