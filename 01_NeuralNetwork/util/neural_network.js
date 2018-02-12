const matrix = require('./matrix')

class NeuralNetwork {
  constructor(input, hidden, output) {
    if(!Number.isInteger(input))
      throw new Error('Received a non integer in parameter "input"!')
    if(!Number.isInteger(hidden))
      throw new Error('Received a non integer in parameter "hidden"!')
    if(!Number.isInteger(output))
      throw new Error('Received a non integer in parameter "output"!')

    this.input_neurons = input
    this.hidden_neurons = hidden
    this.output_neurons = output
    this.weights_i2h = matrix.randomize(input, hidden, -1, 1)
    this.weights_h2o = matrix.randomize(hidden, output, -1, 1)
  }

  evaluateInput(input, fn = _sigmoid) {
    if(matrix.isMatrix(input)) {
      if(matrix.isRowMatrix(input) && input[0].length == this.input_neurons) {
        let hidden = matrix.multiply(input, this.weights_i2h)
        let output = matrix.multiply(hidden, this.weights_h2o)
        return output
      } else if(matrix.isColumnMatrix(input) && input.length == this.input_neurons) {
        return this.evaluateInput(matrix.transpose(input))
      }
      throw new TypeError('evaluateInput() can only take a row or column matrix of size of the input neurons!')
    }

    if(Array.isArray(input)) {
      return this.evaluateInput(matrix.createMatrix(input))
    }
    throw new TypeError('evaluateInput() cannot operate on the given parameters!')
  }
}

function _sigmoid(val) {
  return 1/(1 + Math.exp(-10*val))
}

module.exports = NeuralNetwork