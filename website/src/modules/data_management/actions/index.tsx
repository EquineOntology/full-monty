import { Button, Center, Title } from "@mantine/core";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";
import Link from "next/link";
import DeleteTasks from "./DeleteTasks";

export default function () {
  return (
    <>
      <Title order={3} mt="2rem">
        2. Act on your data
      </Title>
      <Center mt="lg">
        <Button leftIcon={<MagnifyingGlassIcon />} color="blue" mx="md">
          <Link href="/estimate">Analyze estimate</Link>
        </Button>
        <DeleteTasks />
      </Center>
    </>
  );
}
