import {
  matrixMultiply,
  matrixGPUMultiply,
  matrixGPUTextureMultiply
} from '../scripts/matrix'

const range = size =>
  Array(size)
    .fill()
    .map((v, i) => i + 1)

export const createTestArgs = size =>
  range(2).map(() => range(size).map(() => range(size)))

export default async function() {
  return {
    'JS Multiply': matrixMultiply,
    'GPU Multiply': matrixGPUMultiply,
    'GPU Texture Multiply': matrixGPUTextureMultiply
  }
}
