import { Skeleton } from "@mantine/core";
import { CSSProperties } from "react";

type Props = {
  style?: CSSProperties;
};

function TimelineSkeleton(props: Props) {
  return (
    <div style={props.style}>
      <Skeleton height={30} circle />
      <Skeleton height={50} width={4} ml={13} radius={0} />
      <Skeleton height={5} width="20%" mt={-35} ml={30} radius="xl" />
      <Skeleton height={5} width="70%" mt={10} ml={30} radius="xl" />
      <Skeleton height={30} circle mt={15} />
      <Skeleton height={10} width={4} ml={13} />
      <Skeleton height={10} width={4} mt={5} ml={13} />
    </div>
  );
}

export default TimelineSkeleton;
