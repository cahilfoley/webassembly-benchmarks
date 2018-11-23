import GPU from 'gpu.js'

export const matrixMultiply = (matrix1, matrix2) => {
  const result = []

  for (let i = 0; i < matrix1.length; i++) {
    result[i] = []
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j]
      }
      result[i][j] = sum
    }
  }
  return result
}

const gpu = new GPU()

export const matrixGPUMultiply = gpu
  .createKernel(function(a, b) {
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
