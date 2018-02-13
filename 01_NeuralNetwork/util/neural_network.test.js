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

  describe('evaluateInput()', () => {
    it('should take a row matrix of size of input neurons as input', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      expect(() => {
        nnetwork.evaluateInput([[1, 2]])
      }).not.toThrow()
    })

    it('should take a column matrix of size of input neurons as input', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      expect(() => {
        nnetwork.evaluateInput([[1], [2]])
      }).not.toThrow()
    })

    it('should take a array of size of input neurons as input', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      expect(() => {
        nnetwork.evaluateInput([1, 2])
      }).not.toThrow()
    });

    it('should take a function as a second argument, which is used as a activation function', () => {
      //Activation function should be called per hidden and output neuron
      const mock_fn = jest.fn()
      mock_fn.mockReturnValue(1)

      const nnetwork = new NeuralNetwork(2, 2, 3)
      nnetwork.evaluateInput([[1, 2]], mock_fn)
      expect(mock_fn).toHaveBeenCalledTimes(5)
    })

    it('should throw a TypeError when size of input does not fit number of input neurons', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      expect(() => {
        nnetwork.evaluateInput([[1, 2, 3]])
      }).toThrow(TypeError)
      expect(() => {
        nnetwork.evaluateInput([[1], [2], [3]])
      }).toThrow(TypeError)
      expect(() => {
        nnetwork.evaluateInput([1, 2, 3])
      }).toThrow(TypeError)
    })

    it('should throw a TypeError when not a row or column matrix is provided', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      expect(() => {
        nnetwork.evaluateInput([[1, 2], [3, 4]])
      }).toThrow(TypeError)
    })

    it('should throw a TypeError when an array with not numbers is provided', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      expect(() => {
        nnetwork.evaluateInput(['not a number', 1])
      }).toThrow(TypeError)
      expect(() => {
        nnetwork.evaluateInput([1, 'not a number'])
      }).toThrow(TypeError)
      expect(() => {
        nnetwork.evaluateInput(['not a number', 'not a number'])
      }).toThrow(TypeError)
    });

    it('should return a row matrix of size of output neurons when a matrix is given as input', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      const received = nnetwork.evaluateInput([[1], [2]])
      expect(Matrix.isMatrix(received)).toBe(true)
      expect(received[0].length).toBe(3)
    })

    it('should return an array of size of output neurons, when an array was provided as first parameter', () => {
      const nnetwork = new NeuralNetwork(2, 2, 3)
      const received = nnetwork.evaluateInput([1, 2])
      expect(Array.isArray(received)).toBe(true)
      expect(received.length).toBe(3)
    })

    it('should use matrix multiplication to calculate the output', () => {
      // Only test the multiplication part, use identity as activation function
      const emptyfn = (val) => {
        return val
      }
      const nnetwork = new NeuralNetwork(2, 2, 1)
      nnetwork.weights_i2h = [[1, -1], [0, 1]]
      nnetwork.weights_h2o = [[-1], [1]]
      expect(nnetwork.evaluateInput([[1, 1]], emptyfn)).toEqual([[-1]])
    });
  })
})
