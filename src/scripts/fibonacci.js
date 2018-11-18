export const fibonacciLoop = index => {
  let a = 1
  let b = 0
  for (let i = index; i > 0; i--) {
    ;[a, b] = [a + b, a]
  }

  return b
}

export const fibonacciRecurse = index => {
  if (index <= 2) return 1
  return fibonacciRecurse(index - 1) + fibonacciRecurse(index - 2)
}

const memo = {}

export const fibonacciMemoized = index => {
  if (memo[index]) return memo[index]
  if (index <= 2) return 1

  return (memo[index] =
    fibonacciMemoized(index - 1, memo) + fibonacciMemoized(index - 2, memo))
}
