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

  evaluateInput(input) {
    if(matrix.isMatrix(input)) {
      if()
    }

    if(Array.isArray(input)) {
      if(input.length != this.input_neurons) {
        throw new TypeError('evaluateInput() needs an array of size of the input neurons!')
      }
    }

    throw new TypeError('evaluateInput() cannot operate on the given parameters!')
  }
}

module.exports = NeuralNetwork