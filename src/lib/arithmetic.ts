import { askGPT3 } from "./gpt3";

export async function performArithmeticOp(
  op: string,
  x: number,
  y: number
): Promise<number> {
  switch (op) {
    case "addition":
      return x + y;
    case "subtraction":
      return x - y;
    case "multiplication":
      return x * y;
    default: {
      const prompt = `${x} ${op} ${y}`;
      const result = await askGPT3(prompt);
      return result;
    }
  }
}
