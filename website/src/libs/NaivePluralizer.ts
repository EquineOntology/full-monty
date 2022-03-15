// If any more precision in rules is ever required, there's a number of pluralizers
// that can be used instead of this extra-naive implementation (CF 20.01.22).

export default function pluralize(word: string, amount: number) {
  if (Math.abs(amount) === 1) {
    return word;
  }

  const lastCharacter = word[word.length - 1];
  return lastCharacter === "s" ? word : word + "s";
}
