const NeuralNetwork = require('./neural_network')
const Matrix = require('./matrix')

describe('NeuralNetwork', () => {
  describe('constructor()', () => {
    it('constructor should create a new NeuralNetwork object', () => {
      const nnetwork = new NeuralNetwork(2, 2, 1)
      expect(nnetwork).toMatchObject({
        input_neurons: 2,
        hidden_neurons: 2,
        output_neurons: 1,
      })
      expect(Matrix.isMatrix(nnetwork.weights_i2h)).toBe(true)
      expect(Matrix.isMatrix(nnetwork.weights_h2o)).toBe(true)
    })
  
    it('constructor should initialize weights with random values between -1 and 1', () => {
      const nnetwork = new NeuralNetwork(2, 2, 1)
      let sum = 0
      for(let i = 0; i < 2; i++) {
        for(let j = 0; j < 2; j++) {
          expect(nnetwork.weights_i2h[i][j]).toBeGreaterThanOrEqual(-1)
          expect(nnetwork.weights_i2h[i][j]).toBeLessThanOrEqual(1)
          sum += nnetwork.weights_i2h[i][j]
        }
        expect(nnetwork.weights_h2o[i][0]).toBeGreaterThanOrEqual(-1)
        expect(nnetwork.weights_h2o[i][0]).toBeLessThanOrEqual(1)
        sum += nnetwork.weights_h2o[i][0]
      }
      expect(sum).not.toEqual(0)
    })
  
    it('constructor should throw an error when parameters are not integers', () => {
      expect(() => {
        new NeuralNetwork('a', 1, 2)
      }).toThrow()
      expect(() => {
        new NeuralNetwork(1, 'a', 2)
      }).toThrow()
      expect(() => {
        new NeuralNetwork(1, 2, 'a')
      }).toThrow()
    })
  })
})
