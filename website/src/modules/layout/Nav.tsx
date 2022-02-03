import { Center, Group, Navbar } from "@mantine/core";
import { AiOutlineCloudServer } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { MdBed, MdOutlineTimer } from "react-icons/md";
import NavLink from "./NavLink";

type Props = { opened: boolean };

function Nav({ opened }: Props) {
  return (
    <Navbar
      padding="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{
        base: 200,
      }}
    >
      <Navbar.Section mt="lg">
        <Center>
          <Group direction="column" sx={{ display: "inline-flex" }}>
            <NavLink
              to="/tasks/estimate"
              text="Tasks"
              color="green"
              icon={<MdOutlineTimer />}
            />
            <NavLink to="/sleep" text="Sleep" color="blue" icon={<MdBed />} />
            <NavLink
              to="/deliveries"
              text="Deliveries"
              color="orange"
              icon={<FiPackage />}
            />
            <NavLink
              to="/data"
              text="Manage data"
              color="gray"
              icon={<AiOutlineCloudServer />}
            />
          </Group>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
}

export default Nav;
