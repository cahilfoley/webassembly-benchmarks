#include <emscripten.h>

extern "C"
{
  EMSCRIPTEN_KEEPALIVE
  double matrixMultiply(int size)
  {
    int matrix1[size][size];
    int matrix2[size][size];

    int i, j, k;
    int imax = size;
    int jmax = size;
    int kmax = size;

    for (i = 0; i < imax; i++)
    {
      for (j = 0; j < jmax; j++)
      {
        matrix1[i][j] = i;
        matrix2[i][j] = i;
      }
    }

    int output[size][size];
    double total = 0;

    for (i = 0; i < imax; i++)
    {
      for (j = 0; j < jmax; j++)
      {
        output[i][j] = 0;
        for (k = 0; k < kmax; k++)
        {
          output[i][j] += matrix1[i][k] * matrix2[k][j];
        }

        total += output[i][j];
      }
    }

    return total;
  }
}