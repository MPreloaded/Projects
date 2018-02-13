const matrix = require('./matrix')

describe('matrix', () => {
  describe('createMatrix()', () => {
    it('should create a matrix with rows and cols', () => {
      expect(matrix.createMatrix(2, 3)).toEqual([[0, 0, 0], [0, 0, 0]])
    })

    it('should create a matrix based on given one-dimensional array', () => {
      expect(matrix.createMatrix([1, 2, 3])).toEqual([[1, 2, 3]])
    })

    it('should throw TypeError when given rows or columns are less or equal 0', () => {
      expect(() => {
        matrix.createMatrix(0, 0)
      }).toThrow(TypeError)
      expect(() => {
        matrix.createMatrix(-1, 1)
      }).toThrow(TypeError)
      expect(() => {
        matrix.createMatrix(1, -1)
      }).toThrow(TypeError)
    })

    it('should throw TypeError on other cases', () => {
      expect(() => {
        matrix.createMatrix('wrong input')
      }).toThrow(TypeError)
      expect(() => {
        matrix.createMatrix(['wrong input', 'a', 'b'])
      }).toThrow(TypeError)
      expect(() => {
        matrix.createMatrix([0, 1, 'wrong input'])
      }).toThrow(TypeError)
      expect(() => {
        matrix.createMatrix()
      }).toThrow(TypeError)
    })
  })

  describe('transpose()', () => {
    it('should transpose a matrix', () => {
      expect(matrix.transpose([[1, 2, 3]])).toEqual([[1], [2], [3]])
      expect(matrix.transpose([[1], [2], [3]])).toEqual([[1, 2, 3]])
      expect(matrix.transpose([[1, 2], [3, 4]])).toEqual([[1, 3], [2, 4]])
    })

    it('should throw TypeError when not a matrix is provided', () => {
      expect(() => {
        matrix.transpose("wrong input")
      }).toThrow(TypeError)
      expect(() => {
        matrix.transpose()
      }).toThrow(TypeError)
    })
  })

  describe('add()', () => {
    it('should add two matrices of the same dimension', () => {
      expect(matrix.add([[1, 2, 3]], [[4, 5, 6]])).toEqual([[5, 7, 9]])
      expect(matrix.add([[1], [2], [3]], [[4], [5], [6]])).toEqual([[5], [7], [9]])
      expect(matrix.add([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([[6, 8], [10, 12]])
    })

    it('should add a scalar to a matrix', () => {
      expect(matrix.add([[1, 2, 3]], 5)).toEqual([[6, 7, 8]])
      expect(matrix.add([[1], [2], [3]], 4)).toEqual([[5], [6], [7]])
      expect(matrix.add([[1, 2], [3, 4]], 5)).toEqual([[6, 7], [8, 9]])
    })

    it('should throw RangeError when two matrices of incompatible dimensions are given', () => {
      expect(() => {
        matrix.add([[1, 2, 3]], [[1], [2], [3]])
      }).toThrow(RangeError)
    })

    it('should throw TypeError when other types are provided', () => {
      expect(() => {
        matrix.add(1, 2)
      }).toThrow(TypeError)
      expect(() => {
        matrix.add("invalid type", 2)
      }).toThrow(TypeError)
      expect(() => {
        matrix.add([[1]], "invalid type")
      }).toThrow(TypeError)
    })

    it('should throw TypeError if no parameters are given', () => {
      expect(() => {
        matrix.add()
      }).toThrow(TypeError)
    })
  })

  describe('multiply()', () => {
    it('should multiply two matrices (matrix multiplication)', () => {
      expect(matrix.multiply([[1, 2, 3]], [[1], [2], [3]])).toEqual([[14]])
      expect(matrix.multiply([[1, 2], [1, 2]], [[1], [1]])).toEqual([[3], [3]])
    })

    it('should multiply a matrix with a scalar', () => {
      expect(matrix.multiply([[1, 2, 3]], 2)).toEqual([[2, 4, 6]])
      expect(matrix.multiply([[1, 2], [3, 4]], 3)).toEqual([[3, 6], [9, 12]])
    })

    it('should throw RangeError when matrices are not compatibel for multiplication', () => {
      expect(() => {
        matrix.multiply([[1, 2, 3]], [[1, 2, 3]])
      }).toThrow(RangeError)
      expect(() => {
        matrix.multiply([[1, 2], [3, 4]], [[1]])
      }).toThrow(RangeError)
    })

    it('should throw TypeError when no parameter is given', () => {
      expect(() => {
        matrix.multiply()
      }).toThrow(TypeError)
    })

    it('should throw TypeError when other types are provided', () => {
      expect(() => {
        matrix.multiply(1)
      }).toThrow(TypeError)
      expect(() => {
        matrix.multiply("wrong input", 1)
      }).toThrow(TypeError)
      expect(() => {
        matrix.multiply([["wrong input"]], 1)
      }).toThrow(TypeError)
    })
  })

  describe('isMatrix()', () => {
    it('should return true if value is a matrix', () => {
      expect(matrix.isMatrix([[1, 2, 3]])).toBe(true)
      expect(matrix.isMatrix([[1, 2], [3, 4]])).toBe(true)
      expect(matrix.isMatrix([[1], [2], [3]])).toBe(true)
    })

    it('should return false if no value is given', () => {
      expect(matrix.isMatrix()).toBe(false)
    })

    it('should return false if value is not a matrix', () => {
      expect(matrix.isMatrix(0)).toBe(false)
      expect(matrix.isMatrix('not a matrix')).toBe(false)
      expect(matrix.isMatrix({matrix: [[1, 2, 3]]})).toBe(false)
      expect(matrix.isMatrix([1, 2, 3])).toBe(false)
    })

    //This could lead to worse performance...
    it('should return false when array contains not number objects', () => {
      expect(matrix.isMatrix([['wrong input']])).toBe(false)
    })

    //This could lead to worse performance... 
    //But if the above test runs, this one should also run
    it('should return false if two-dimensional array contains arrays of different sizes', () => {
      expect(matrix.isMatrix([[1], [1, 2], [1, 2, 3]])).toBe(false)
      expect(matrix.isMatrix([[1, 2, 3], [1, 2], [1, 2]])).toBe(false)
      expect(matrix.isMatrix([[1], [1], [1], [1, 2]])).toBe(false)
    })
  })

  describe('randomize()', () => {
    it('should return a new matrix of the same size with values between 0 and 1', () => {
      const received = matrix.randomize(matrix.createMatrix(4, 4))
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(0)
          expect(val).toBeLessThanOrEqual(1)
        }
      }
    })

    it('should ignore additional wrong input parameters (matrix, a)', () => {
      expect(() => {
        matrix.randomize([[0, 0, 0]], 'wrong_input')
      }).not.toThrow()
      const received = matrix.randomize(matrix.createMatrix(4, 4), -3, 'additional input')
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(-3)
          expect(val).toBeLessThanOrEqual(0)
        }
      }
    })

    it('should return a new matrix of the same size with values between 0 and a', () => {
      const received = matrix.randomize(matrix.createMatrix(4, 4), -3)
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(-3)
          expect(val).toBeLessThanOrEqual(0)
        }
      }
    })

    it('should ignore additional wrong input parameters (matrix, a)', () => {
      expect(() => {
        matrix.randomize([[0, 0, 0]], -3, 'wrong_input')
      }).not.toThrow()
      const received = matrix.randomize(matrix.createMatrix(4, 4), -3, 'additional input')
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(-3)
          expect(val).toBeLessThanOrEqual(0)
        }
      }
    })

    it('should return a new matrix of the same size with values between a and b', () => {
      const received = matrix.randomize(matrix.createMatrix(4, 4), 3, 5)
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(3)
          expect(val).toBeLessThanOrEqual(5)
        }
      }
    })

    it('should ignore additional wrong input parameters (matrix, a, b)', () => {
      expect(() => {
        matrix.randomize([[0, 0, 0]], 0, 5, 'wrong_input')
      }).not.toThrow()
      const received = matrix.randomize(matrix.createMatrix(4, 4), 3, 5, 'additional input')
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(3)
          expect(val).toBeLessThanOrEqual(5)
        }
      }
    })

    it('should return a matrix with a rows and b columns with values between 0 and 1', () => {
      const received = matrix.randomize(4, 4)
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(0)
          expect(val).toBeLessThanOrEqual(1)
        }
      }
    })

    it('should return a matrix with a rows and b columns with values between 0 and c', () => {
      const received = matrix.randomize(4, 4, -3)
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(-3)
          expect(val).toBeLessThanOrEqual(0)
        }
      }
    })

    it('should return a matrix with a rows and b columns with values between c and d', () => {
      const received = matrix.randomize(4, 4, 3, 5)
      expect(received.length).toBe(4)
      expect(received[0].length).toBe(4)
      for(let i = 0; i < received.length; i++) {
        for(let j = 0; j < received[0].length; j++) {
          const val = received[i][j]
          expect(isNaN(val)).toBe(false)
          expect(val).toBeGreaterThanOrEqual(3)
          expect(val).toBeLessThanOrEqual(5)
        }
      }
    })

    it('should throw TypeError when provided with wrong input', () => {
      expect(() => {
        matrix.randomize('wrong input')
      }).toThrow(TypeError)
    })
  })

  describe('isRowMatrix()', () => {
    it('should return true if a matrix with only one row is input', () => {
      expect(matrix.isRowMatrix([[1, 2, 3]])).toBe(true)
    })

    it('should return false if a matrix that has more than one row is provided', () => {
      expect(matrix.isRowMatrix([[1, 2], [3, 4]])).toBe(false)
      expect(matrix.isRowMatrix([[1], [2], [3]])).toBe(false)
    })

    it('should return false if an empty matrix is provided', () => {
      expect(matrix.isRowMatrix([[]])).toBe(false)
    })

    it('should return false if nothing is provided', () => {
      expect(matrix.isRowMatrix()).toBe(false)
    })

    it('should return false if something other than a matrix is provided', () => {
      expect(matrix.isRowMatrix('not a row matrix')).toBe(false)
      expect(matrix.isRowMatrix([1, 2, 3])).toBe(false)
    })
  })

  describe('isColumnMatrix()', () => {
    it('should return true if a matrix with only one column is input', () => {
      expect(matrix.isColumnMatrix([[1], [2], [3]])).toBe(true)
    })

    it('should return false if a matrix that has more than one column is provided', () => {
      expect(matrix.isColumnMatrix([[1, 2], [3, 4]])).toBe(false)
      expect(matrix.isColumnMatrix([[1, 2, 3]])).toBe(false)
    })

    it('should return false if an empty matrix is provided', () => {
      expect(matrix.isColumnMatrix([[]])).toBe(false)
    })

    it('should return false if nothing is provided', () => {
      expect(matrix.isColumnMatrix()).toBe(false)
    })

    it('should return false if something other than a matrix is provided', () => {
      expect(matrix.isColumnMatrix('not a column matrix')).toBe(false)
      expect(matrix.isColumnMatrix([1, 2, 3])).toBe(false)
    })
  })

  describe('map()', () => {
    it('should apply a function to each member of a matrix', () => {
      const mock_fn = jest.fn()
      mock_fn.mockReturnValue(1)
      const received = matrix.map([[0, 0], [0, 0]], mock_fn)

      expect(mock_fn).toHaveBeenCalledTimes(4)
      expect(matrix.isMatrix(received)).toBe(true)
      expect(received).toEqual([[1, 1], [1, 1]])
    })

    it('should throw TypeError when not a matrix is provided', () => {
      expect(() => {
        matrix.map()
      }).toThrow(TypeError)
      expect(() => {
        matrix.map('not a matrix', jest.fn())
      }).toThrow(TypeError)
      expect(() => {
        matrix.map([1, 2, 3], jest.fn())
      }).toThrow(TypeError)
    })

    it('should throw TypeError when no function is provided as second parameter', () => {
      expect(() => {
        matrix.map([[1, 2, 3]])
      }).toThrow(TypeError)
      expect(() => {
        matrix.map([[1, 2, 3]], 'not a function')
      }).toThrow(TypeError)
    })
  })

  describe('toArray()', () => {
    it('should return a Array', () => {
      expect(Array.isArray(matrix.toArray([[1, 2, 3]]))).toBe(true)
    })

    it('should put all elements into the array', () => {
      expect(matrix.toArray([[1, 2], [3, 4]])).toHaveLength(4)
    })

    it('should put the elements in order into the array (row by row)', () => {
      expect(matrix.toArray([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should return an empty Array when not a matrix is provided', () => {
      expect(matrix.toArray()).toEqual([])
      expect(matrix.toArray('not a matrix')).toEqual([])
    })
  })
})