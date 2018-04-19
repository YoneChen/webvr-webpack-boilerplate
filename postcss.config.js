module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
    ...process.env.NODE_ENV === 'production' ? {'cssnano': { reduceIdents: false,zindex: false} } : {}
    // 'precss': {}
  },
};