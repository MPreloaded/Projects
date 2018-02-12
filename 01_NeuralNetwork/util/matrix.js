let Matrix = {}

Matrix.createMatrix = (rows, cols) => {
  let result = []

  if(_positiveInteger(rows) && _positiveInteger(cols)) {
    for(let i = 0; i < rows; i++) {
      let tmp = []
      for(let j = 0; j < cols; j++) {
        tmp.push(0)
      }
      result.push(tmp)
    }
    return result
  } else if((Array.isArray(rows)) && (!Array.isArray(rows[0]))) {
    let tmp = []
    for(let i = 0; i < rows.length; i++) {
      if(isNaN(rows[i])) {
        throw new TypeError('createMatrix() needs two positive Integer or one Array with positive numbers as parameters!')
      }
      tmp.push(rows[i])
    }
    result.push(tmp)
    return result
  }
  throw new TypeError('createMatrix() needs two positive Integer or one Array as parameters!')
}

Matrix.transpose = (a) => {
  if(!Matrix.isMatrix(a)) {
    throw new TypeError('transpose() needs a matrix as parameter!')
  }
  let result = []

  for(let i = 0; i < a[0].length; i++) {
    let tmp = []
    for(let j = 0; j < a.length; j++) {
      tmp.push(a[j][i])
    }
    result.push(tmp)
  }

  return result
}

Matrix.add = (a, b) => {
  if(Matrix.isMatrix(a) && Matrix.isMatrix(b)) {
    if(!(a.length == b.length && a[0].length == b[0].length)) {
      throw new RangeError('add() cannot use two matrices of different dimensions!')
    }
    let result = []
    for(let i = 0; i < a.length; i++) {
      let tmp = []
      for(let j = 0; j < a[0].length; j++) {
        tmp.push(a[i][j] + b[i][j])
      }
      result.push(tmp)
    }
    return result
  }

  if(Matrix.isMatrix(a) && (!isNaN(b))) {
    let result = []
    for(let i = 0; i < a.length; i++) {
      let tmp = []
      for(let j = 0; j < a[0].length; j++) {
        tmp.push(a[i][j] + b)
      }
      result.push(tmp)
    }
    return result
  }

  // Other input parameters
  throw new TypeError('add() cannot use the given input parameters!')
}

Matrix.isMatrix = (a) => {
  if(Array.isArray(a)) {
    if(Array.isArray(a[0])) {
      const length = a[0].length
      for(let i = 0; i < a.length; i++) {
        if(length != a[i].length) {
          return false
        }
        for(let j = 0; j < a[0].length; j++) {
          if(isNaN(a[i][j])) {
            return false
          }
        }
      }
      return true
    }
  }
  return false
}

Matrix.multiply = (a, b) => {
  if(Matrix.isMatrix(a) && Matrix.isMatrix(b)) {
    if(a[0].length != b.length) {
      throw new RangeError('multiply() cannot multiply with unmatching rows of a and columns of b!')
    }
    let result = []
    for(let i = 0; i < a.length; i++) {
      let tmp = []
      for(let j = 0; j < b[0].length; j++) {
        let sum = 0
        for(let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j]
        }
        tmp.push(sum)
      }
      result.push(tmp)
    }
    return result
  }

  if(Matrix.isMatrix(a) && !isNaN(b)) {
    let result = []
    for(let i = 0; i < a.length; i++) {
      let tmp = []
      for(let j = 0; j < a[0].length; j++) {
        tmp.push(a[i][j] * b)
      }
      result.push(tmp)
    }

    return result
  }

  throw new TypeError('multiply() cannot operate on the given parameters!')
}

Matrix.randomize = (a, b, c, d) => {
  if(Matrix.isMatrix(a)) {
    let min = 0
    let max = 1
    if(!isNaN(b)) {
      if(!isNaN(c)) {
        min = b
        max = c
      } else {
        max = b
      }
    }
    return _randomize(Matrix.createMatrix(a.length, a[0].length), min, max)
  }

  if(_positiveInteger(a) && _positiveInteger(b)) {
    let min = 0
    let max = 1
    if(!isNaN(c)) {
      if(!isNaN(d)) {
        min = c
        max = d
      } else {
        max = c
      }
    }

    return _randomize(Matrix.createMatrix(a, b), min, max)
  }

  throw new TypeError('randomize() cannot operate on the given parameters!')
}

Matrix.isRowMatrix = (a) => {
  if(Matrix.isMatrix(a)) {
    if(a.length == 1) {
      if(a[0].length > 0) {
        return true
      }
    }
  }
  return false
}

Matrix.isColumnMatrix = (a) => {
  if(Matrix.isMatrix(a)) {
    if(a.length > 0) {
      if(a[0].length == 1) {
        return true
      }
    }
  }
  return false
}

function _randomize(matrix, min, max) {
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[0].length; j++) {
      matrix[i][j] = min + Math.random() * (max - min)
    }
  }
  return matrix
}

function _positiveInteger(a) {
  return (Number.isInteger(a) && a > 0)
}

module.exports = Matrix