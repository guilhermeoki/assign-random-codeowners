// eslint-disable-next-line no-undef
module.exports = {
  roots: [
    "./src",
  ],
  verbose: true,
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
}
