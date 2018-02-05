const Matrix = require('./matrix');

it('constructor (Success)', () => {
  let m = new Matrix(2, 3);
  m.data[0] = [1, 2, 3];
  m.data[1] = [4, 5, 6];
  m.data[1][1] = 7;

  expect(m).toEqual({
    rows: 2,
    cols: 3,
    data: [
      [1, 2, 3],
      [4, 7, 6]
    ]
  });
});

it('Matrix.fromArray (Success)', () => {
  let m = Matrix.fromArray([1, 2, 3]);

  expect(m).toEqual({
    rows: 3,
    cols: 1,
    data: [
      [1],
      [2],
      [3]
    ]
  });
});

it('Matrix.add (Success)', () => {
  let m = new Matrix(2, 2);
  m.data[0] = [1, 2];
  m.data[1] = [3, 4];
  let n = new Matrix(2, 2);
  n.data[0] = [5, 6];
  n.data[1] = [7, 8];

  expect(Matrix.add(m, n)).toEqual({
    rows: 2,
    cols: 2,
    data: [
      [6, 8],
      [10, 12]
    ]
  });
});

it('Matrix.add (Failure: A not a Matrix)', () => {
  let m = 0;
  let n = new Matrix(2, 2);
  n.data[0] = [1, 2];
  n.data[1] = [3, 4];

  expect(() => {
    Matrix.add(m, n);
  }).toThrow();
});

it('Matrix.add (Failure: B not a Matrix)', () => {
  let m = 0;
  let n = new Matrix(2, 2);
  n.data[0] = [1, 2];
  n.data[1] = [3, 4];

  expect(() => {
    Matrix.add(n, m);
  }).toThrow();
});

it('Matrix.add (Failure: Matrices not same dimensions)', () => {
  let m = new Matrix(2, 2);
  m.data[0] = [1, 2];
  m.data[1] = [3, 4];
  let n = new Matrix(2, 1);
  n.data[0] = [5];
  n.data[1] = [6];

  expect(() => {
    Matrix.add(m, n);
  }).toThrow();
})