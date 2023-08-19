export default function getBoolean(probability: number): boolean {
  return Math.random() < probability;
}
