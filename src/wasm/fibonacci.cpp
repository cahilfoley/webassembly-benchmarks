#include <emscripten.h>

extern "C"
{
  EMSCRIPTEN_KEEPALIVE
  int fibonacciLoop(int index)
  {
    int a = 1;
    int b = 0;
    int temp;
    int i = index;

    for (; i >= 1; i--)
    {
      temp = a;
      a = b;
      b += temp;
    }

    return b;
  }

  EMSCRIPTEN_KEEPALIVE
  int fibonacciRecurse(int index)
  {
    if (index == 1 || index == 2)
      return 1;

    return fibonacciRecurse(index - 1) + fibonacciRecurse(index - 2);
  }

  EMSCRIPTEN_KEEPALIVE
  int memo[10000];

  EMSCRIPTEN_KEEPALIVE
  int fibonacciMemoized(int n)
  {
    if (memo[n] != 0)
      return memo[n];

    if (n == 1 || n == 2)
    {
      return 1;
    }
    else
    {
      return memo[n] = fibonacciMemoized(n - 1) + fibonacciMemoized(n - 2);
    }
  }

  /*
  Helper function that multiplies 2 matrices F and M of size 2*2, and 
  puts the multiplication result back to F[][]
 */
  EMSCRIPTEN_KEEPALIVE
  void multiply(int F[2][2], int M[2][2]);

  /*
  Helper function that calculates F[][] raise to the power n and puts the 
  result in F[][] 
  Note that this function is designed only for fibonacciMatrix() and won't work as general 
  power function
 */
  EMSCRIPTEN_KEEPALIVE
  void power(int F[2][2], int n);

  EMSCRIPTEN_KEEPALIVE
  int fibonacciMatrix(int n)
  {
    int F[2][2] = {{1, 1}, {1, 0}};
    if (n == 0)
      return 0;
    power(F, n - 1);
    return F[0][0];
  }

  EMSCRIPTEN_KEEPALIVE
  void power(int F[2][2], int n)
  {
    if (n == 0 || n == 1)
      return;
    int M[2][2] = {{1, 1}, {1, 0}};

    power(F, n / 2);
    multiply(F, F);

    if (n % 2 != 0)
      multiply(F, M);
  }

  EMSCRIPTEN_KEEPALIVE
  void multiply(int F[2][2], int M[2][2])
  {
    int x = F[0][0] * M[0][0] + F[0][1] * M[1][0];
    int y = F[0][0] * M[0][1] + F[0][1] * M[1][1];
    int z = F[1][0] * M[0][0] + F[1][1] * M[1][0];
    int w = F[1][0] * M[0][1] + F[1][1] * M[1][1];

    F[0][0] = x;
    F[0][1] = y;
    F[1][0] = z;
    F[1][1] = w;
  }
}
