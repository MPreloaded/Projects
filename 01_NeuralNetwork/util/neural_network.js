const Matrix = require('./matrix')

class NeuralNetwork {
  constructor(input, hidden, output) {
    if(!Number.isInteger(input))
      throw new Error('Received a non integer in parameter "input"!')
    if(!Number.isInteger(hidden))
      throw new Error('Received a non integer in parameter "hidden"!')
    if(!Number.isInteger(output))
      throw new Error('Received a non integer in parameter "output"!')

    this.input_neurons =  input
    this.hidden_neurons =  hidden
    this.output_neurons =  output
    this.weights_i2h =  new Matrix(input, hidden)
    this.weights_h2o =  new Matrix(hidden, output)

    this.weights_i2h.randomize(-1, 1)
    this.weights_h2o.randomize(-1, 1)
  }
}

module.exports = NeuralNetwork