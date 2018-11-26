import createSuite from './createSuite'

// import fibonacciSet from './sets/fibonacci'
import matrixSet, { createTestArgs as createMatrixArgs } from './sets/matrix'

const Benchmark = window.Benchmark

async function main() {
  // const set = {
  //   label: 'Fibonacci Sequence',
  //   tests: await fibonacciSet(),
  //   args: [20]
  // }

  const set = {
    label: 'Matrix Multiplication',
    tests: await matrixSet(),
    args: createMatrixArgs(512)
  }

  window.set = set

  const suite = await createSuite(
    { args: set.args, initCount: 5, label: set.label },
    set.tests,
    Benchmark
  )

  suite.run({ async: true })
}

main()
