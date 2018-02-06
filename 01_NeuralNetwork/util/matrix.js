class Matrix {

  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = []

    for (let i = 0; i < rows; i++) {
      let tmp = []
      for (let j = 0; j < cols; j++) {
        tmp.push(0)
      }
      this.data.push(tmp)
    }
  }

  static fromArray(array) {
    if (!(array instanceof Array)) {
      throw new Error('Array need to have type Array!')
    }

    let result = new Matrix(array.length, 1)
    for (let i = 0; i < array.length; i++) {
      result.data[i][0] = array[i]
    }
    return result
  }

  static add(a, b) {
    if (!((a instanceof Matrix) && (b instanceof Matrix))) {
      throw new Error('A and B need to have type Matrix!')
    }

    if (a.rows != b.rows || a.cols != b.cols) {
      throw new Error('A and B need to have the same dimensions!')
    }

    let result = new Matrix(a.rows, a.cols)
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.data[i][j] = a.data[i][j] + b.data[i][j]
      }
    }
    return result
  }

  static transpose(a) {
    if (!(a instanceof Matrix)) {
      throw new Error('A needs to have type Matrix"')
    }

    let result = new Matrix(a.cols, a.rows)
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[j][i]
      }
    }
    return result
  }

  static multiply(a, b) {
    if (!((a instanceof Matrix) && (b instanceof Matrix))) {
      throw new Error('A and B need to have type Matrix!')
    }

    if(a.cols != b.rows) {
      throw new Error('Columns of A have to match Rows of B!')
    }

    let result = new Matrix(a.rows, b.cols)

    for(let i = 0; i < result.rows; i++) {
      for(let j = 0; j < result.cols; j++) {
        for(let k = 0; k < a.cols; k++) {
          result.data[i][j] += a.data[i][k] * b.data[k][j]
        }
      }
    }
    return result
  }
}



module.exports = Matrix