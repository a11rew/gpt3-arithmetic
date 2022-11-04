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
    default:
      throw new Error(`Invalid operation: ${op}`);
  }
}
