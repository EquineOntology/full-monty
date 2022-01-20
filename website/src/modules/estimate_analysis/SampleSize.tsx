import { Text } from "@mantine/core";

export default function SampleSize({ size }: { size: number }) {
  let judgementOnSize = "a great amount";
  if (size < 20) {
    judgementOnSize = "not a lot";
  } else if (size < 50) {
    judgementOnSize = "an okay amount";
  } else if (size < 100) {
    judgementOnSize = "a good amount";
  }

  return (
    <Text size="sm" color="dimmed" mt="xl">
      The amount of tasks that could be used for the analysis was {size}.
      That&apos;s {judgementOnSize}
    </Text>
  );
}
