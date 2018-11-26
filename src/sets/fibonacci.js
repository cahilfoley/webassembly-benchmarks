import {
  fibonacciLoop,
  // fibonacciRecurse,
  fibonacciMemoized
} from '../scripts/fibonacci'
import loadWasmModule from '../loadWasmModule'

export default async function() {
  const { exports: wasm } = await loadWasmModule('./wasm/fibonacci.wasm')
  console.log(wasm)
  return {
    'JS Loop': fibonacciLoop,
    // 'JS Recurse': fibonacciRecurse,
    'JS Memoized': fibonacciMemoized,
    'WASM Loop': wasm._fibonacciLoop,
    // 'WASM Recurse': wasm._fibonacciRecurse,
    'WASM Memoized': wasm._fibonacciMemoized
    // 'WASM Matrix': wasm._fibonacciMatrix
  }
}
