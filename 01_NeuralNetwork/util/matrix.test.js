const Matrix = require('./matrix')

describe("Matrix", () => {
  it('constructor should construct a matrix object', () => {
    let m = new Matrix(2, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[1][1] = 7

    expect(m).toMatchObject({
      rows: 2,
      cols: 3,
      data: [
        [1, 2, 3],
        [4, 7, 6]
      ]
    })
  })

  it('fromArray() should create a matrix object from an array', () => {
    expect(Matrix.fromArray([1, 2, 3])).toMatchObject({
      rows: 3,
      cols: 1,
      data: [
        [1],
        [2],
        [3]
      ]
    })
  })

  it('fromArray() should throw an error when no array is provided', () => {
    expect(() => {
      Matrix.fromArray(0)
    }).toThrow()
  })

  it('add() should add two matrices of the same dimensions', () => {
    let m = new Matrix(2, 2)
    m.data[0] = [1, 2]
    m.data[1] = [3, 4]
    let n = new Matrix(2, 2)
    n.data[0] = [5, 6]
    n.data[1] = [7, 8]

    expect(Matrix.add(m, n)).toMatchObject({
      rows: 2,
      cols: 2,
      data: [
        [6, 8],
        [10, 12]
      ]
    })
  })

  it('add() should throw an error when the first parameter is not a matrix', () => {
    const m = 0
    let n = new Matrix(2, 2)
    n.data[0] = [1, 2]
    n.data[1] = [3, 4]

    expect(() => {
      Matrix.add(m, n)
    }).toThrow()
  })

  it('add() should throw an error when the second parameter is not a matrix', () => {
    const m = 0
    let n = new Matrix(2, 2)
    n.data[0] = [1, 2]
    n.data[1] = [3, 4]

    expect(() => {
      Matrix.add(n, m)
    }).toThrow()
  })

  it('add() should throw an error when the matrices are not of the same dimensions)', () => {
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


  it('transpose() should return the transposed matrix', () => {
    let m = new Matrix(2, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]

    expect(Matrix.transpose(m)).toMatchObject({
      rows: 3,
      cols: 2,
      data: [
        [1, 4], 
        [2, 5], 
        [3, 6]
      ]
    })
  })

  it('transpose() should return an error when no matrix is provided', () => {
    const m = 0
    expect(() => {
      Matrix.transpose(m)
    }).toThrow()
  })

  it('multiply() should multiply two matrices', () => {
    let m = new Matrix(2, 3)
    m.data[0] = [1, 2, 1]
    m.data[1] = [0, 1, 2]
    let n = new Matrix(3, 1)
    n.data[0] = [1]
    n.data[1] = [2]
    n.data[2] = [0]

    expect(Matrix.multiply(m, n)).toMatchObject({
      rows: 2,
      cols: 1,
      data: [
        [5], 
        [2]
      ]
    })
  })

  it('multiply() should throw an error when the first parameter is not a matrix', () => {
    const m = 0
    let n = new Matrix(3, 1)
    n.data[0] = [1]
    n.data[1] = [2]
    n.data[2] = [0]

    expect(() => {
      Matrix.multiply(m, n)
    }).toThrow()
  })

  it('multiply() should throw an error when the second parameter is not a matrix', () => {
    let m = new Matrix(2, 3)
    m.data[0] = [1, 2, 1]
    m.data[1] = [0, 1, 2]
    const n = 0

    expect(() => {
      Matrix.multiply(m, n)
    }).toThrow()
  })

  it('multiply() should throw an error when the columns of the first matrix do not match the rows of the second matrix', () => {
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

  it('randomize() should assign random values between 0 and 1 to each position in the matrix', () => {
    let m = new Matrix(2, 2)
    m.randomize()

    let sum = 0
    for(let i = 0; i < 2; i++) {
      for(let j = 0; j < 2; j++) {
        expect(m.data[i][j]).toBeGreaterThanOrEqual(0)
        expect(m.data[i][j]).toBeLessThanOrEqual(1)
        sum += m.data[i][j]
      }
    }
    expect(sum).not.toEqual(0)
  })

  it('randomize() should be chainable', () => {
    let m = (new Matrix(1, 1)).randomize()

    expect(m).toBeDefined()
    expect(m).toMatchObject({
      rows: 1,
      cols: 1,
    })
    expect(m.data).toBeInstanceOf(Array)
  })

  it('randomize(a, b) should assign random values between a and b', () => {
    let m = new Matrix(2, 2)
    m.randomize(2, 3) 

    for(let i = 0; i < 2; i++) {
      for(let j = 0; j < 2; j++) {
        expect(m.data[i][j]).toBeGreaterThanOrEqual(2)
        expect(m.data[i][j]).toBeLessThanOrEqual(3)
      }
    }
  })

  it('randomize(a) should assign random values between 0 and a', () => {
    let m = new Matrix(2, 2)
    m.randomize(5) 

    for(let i = 0; i < 2; i++) {
      for(let j = 0; j < 2; j++) {
        expect(m.data[i][j]).toBeGreaterThanOrEqual(0)
        expect(m.data[i][j]).toBeLessThanOrEqual(5)
      }
    }
  })
})