export default async filename => {
  const fetchPromise = fetch(filename)
  const { instance } = await WebAssembly.instantiateStreaming(fetchPromise, {
    env: {
      _printf: function(...args) {
        console.log(...args)
      },
      memory: new WebAssembly.Memory({ initial: 256 }),
      __memory_base: 0
    }
  })
  return instance
}
