module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./dev-server.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    }

    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
    })

    return config
  },
}
