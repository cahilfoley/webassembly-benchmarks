export default function(
  { args, initCount, label = 'Benchmark' },
  tests,
  Benchmark
) {
  const suite = new Benchmark.Suite('WASM Benchmarking')

  for (let test in tests) {
    suite.add(test, () => tests[test](...args), { initCount })
  }

  suite.on('start', function() {
    suite.startDate = Date.now()
    console.info('Benchmark configuration')
    console.table({
      'Test Set': label,
      'Tests Registered': Object.keys(tests).length,
      'Test Cycles': initCount,
      'Function Arguments': args.join(', ')
    })
    console.info('Benchmark running...')
  })

  suite.on('complete', function() {
    console.info(
      'Benchmark complete in ',
      (Date.now() - suite.startDate) / 1000,
      ' secs'
    )
    console.table(
      this.sort((a, b) => (a.stats.mean > b.stats.mean ? 1 : -1)).map(
        (result, i) => ({
          Rank: i + 1,
          Test: result.name,
          Average: `${(result.stats.mean * 1000000).toFixed(3)} μs`,
          Fastest: `${(Math.min(...result.stats.sample) * 1000000).toFixed(
            3
          )} μs`,
          Slowest: `${(Math.max(...result.stats.sample) * 1000000).toFixed(
            3
          )} μs`
        })
      )
    )
  })

  return suite
}
