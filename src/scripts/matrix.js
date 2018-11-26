import GPU from 'gpu.js'

export const matrixMultiply = (matrix1, matrix2) => {
  const result = []
  const imax = matrix1.length
  const jmax = matrix2[0].length
  const kmax = matrix1[0].length

  for (let i = 0; i < imax; i++) {
    result[i] = []
    for (let j = 0; j < jmax; j++) {
      let sum = 0
      for (let k = 0; k < kmax; k++) {
        sum += matrix1[i][k] * matrix2[k][j]
      }
      result[i][j] = sum
    }
  }
  return result
}

const gpu = new GPU()

export const matrixGPUMultiply = gpu
  .createKernel(function(a, b, size) {
    let sum = 0
    for (let i = 0; i < 512; i++) {
      sum += a[this.thread.y][i] * b[i][this.thread.x]
    }
    return sum
  })
  .setOutput([512, 512])

export const matrixGPUTextureMultiply = gpu
  .createKernel(function(a, b) {
    let sum = 0
    for (let i = 0; i < 512; i++) {
      sum += a[this.thread.y][i] * b[i][this.thread.x]
    }
    return sum
  })
  .setOutput([512, 512])
  .setOutputToTexture(true)
