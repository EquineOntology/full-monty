import { Group } from "@mantine/core";
import { FiPackage } from "react-icons/fi";
import { HiOutlineServer } from "react-icons/hi";
import { MdBed, MdOutlineTimer } from "react-icons/md";
import NavLink from "./NavLink";

export default function PageLinks() {
  return (
    <Group spacing="md" noWrap>
      <NavLink
        to="/tasks/estimate"
        text="Estimates."
        color="green"
        icon={<MdOutlineTimer />}
      />
      <NavLink to="/sleep" text="Sleep." color="blue" icon={<MdBed />} />
      <NavLink
        to="/deliveries"
        text="Deliveries."
        color="indigo"
        icon={<FiPackage />}
      />
      <NavLink
        to="/data"
        text="Manage data."
        color="violet"
        icon={<HiOutlineServer />}
      />
    </Group>
  );
}
