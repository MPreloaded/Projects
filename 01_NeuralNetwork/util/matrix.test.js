const Matrix = require('./matrix')

it('constructor (Success)', () => {
  let m = new Matrix(2, 3)
  m.data[0] = [1, 2, 3]
  m.data[1] = [4, 5, 6]
  m.data[1][1] = 7

  expect(m).toEqual({
    rows: 2,
    cols: 3,
    data: [
      [1, 2, 3],
      [4, 7, 6]
    ]
  })
})

it('fromArray (Success)', () => {
  expect(Matrix.fromArray([1, 2, 3])).toEqual({
    rows: 3,
    cols: 1,
    data: [
      [1],
      [2],
      [3]
    ]
  })
})

it('fromArray (Failure: Not an Array)', () => {
  expect(() => {
    Matrix.fromArray(0)
  }).toThrow()
})

it('add (Success)', () => {
  let m = new Matrix(2, 2)
  m.data[0] = [1, 2]
  m.data[1] = [3, 4]
  let n = new Matrix(2, 2)
  n.data[0] = [5, 6]
  n.data[1] = [7, 8]

  expect(Matrix.add(m, n)).toEqual({
    rows: 2,
    cols: 2,
    data: [
      [6, 8],
      [10, 12]
    ]
  })
})

it('add (Failure: A not a Matrix)', () => {
  let m = 0
  let n = new Matrix(2, 2)
  n.data[0] = [1, 2]
  n.data[1] = [3, 4]

  expect(() => {
    Matrix.add(m, n)
  }).toThrow()
})

it('add (Failure: B not a Matrix)', () => {
  let m = 0
  let n = new Matrix(2, 2)
  n.data[0] = [1, 2]
  n.data[1] = [3, 4]

  expect(() => {
    Matrix.add(n, m)
  }).toThrow()
})

it('add (Failure: Matrices not same dimensions)', () => {
  let m = new Matrix(2, 2)
  m.data[0] = [1, 2]
  m.data[1] = [3, 4]
  let n = new Matrix(2, 1)
  n.data[0] = [5]
  n.data[1] = [6]

  expect(() => {
    Matrix.add(m, n)
  }).toThrow()
})


it('transpose (Success)', () => {
  let m = new Matrix(2, 3)
  m.data[0] = [1, 2, 3]
  m.data[1] = [4, 5, 6]

  expect(Matrix.transpose(m)).toEqual({
    rows: 3,
    cols: 2,
    data: [
      [1, 4], 
      [2, 5], 
      [3, 6]
    ]
  })
})

it('transpose (Failure: Not a matrix)', () => {
  let m = 0
  expect(() => {
    Matrix.transpose(m)
  }).toThrow()
})

it('multiply (Success)', () => {
  let m = new Matrix(2, 3)
  m.data[0] = [1, 2, 1]
  m.data[1] = [0, 1, 2]
  let n = new Matrix(3, 1)
  n.data[0] = [1]
  n.data[1] = [2]
  n.data[2] = [0]

  expect(Matrix.multiply(m, n)).toEqual({
    rows: 2,
    cols: 1,
    data: [
      [5], 
      [2]
    ]
  })
})

it('multiply (Failure: A not a matrix)', () => {
  let m = 0
  let n = new Matrix(3, 1)
  n.data[0] = [1]
  n.data[1] = [2]
  n.data[2] = [0]

  expect(() => {
    Matrix.multiply(m, n)
  }).toThrow()
})

it('multiply (Failure: B not a matrix)', () => {
  let m = new Matrix(2, 3)
  m.data[0] = [1, 2, 1]
  m.data[1] = [0, 1, 2]
  let n = 0

  expect(() => {
    Matrix.multiply(m, n)
  }).toThrow()
})

it('multiply (Failure: Columns of A do not match Rows of B)', () => {
  let m = new Matrix(1, 2)
  m.data[0] = [1, 2]
  let n = new Matrix(3, 1)
  n.data[0] = [1]
  n.data[1] = [2]
  n.data[2] = [0]

  expect(() => {
    Matrix.multiply(m, n)
  }).toThrow()
})