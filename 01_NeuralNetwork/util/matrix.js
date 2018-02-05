class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < rows; i++) {
      let tmp = [];
      for (let j = 0; j < cols; j++) {
        tmp.push(0);
      }
      this.data.push(tmp);
    }
  }

  static fromArray(array) {
    let result = new Matrix(array.length, 1);
    for (let i = 0; i < array.length; i++) {
      result.data[i][0] = array[i];
    }
    return result;
  }

  static add(a, b) {
    if (!((a instanceof Matrix) && (b instanceof Matrix))) {
      throw new Error('A and B need to have type Matrix!');
    }

    if (a.rows != b.rows || a.cols != b.cols) {
      throw new Error('A and B need to have the same dimensions!');
    }

    let result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.data[i][j] = a.data[i][j] + b.data[i][j];
      }
    }
    return result;
  }
}



module.exports = Matrix;