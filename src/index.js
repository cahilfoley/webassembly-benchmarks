import fibonacciSet from './sets/fibonacci'
import createSuite from './createSuite'

const Benchmark = window.Benchmark

async function main() {
  const tests = await fibonacciSet()
  const suite = await createSuite(
    { args: [20], initCount: 5 },
    tests,
    Benchmark
  )
  suite.run({ async: true })
}

main()
