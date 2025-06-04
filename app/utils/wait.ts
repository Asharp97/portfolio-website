export default function wait(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
