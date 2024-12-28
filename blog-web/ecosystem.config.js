module.exports = {
  apps : [{
    name: 'blog-test',
    port: '3200',
    script: './.output/server/index.mjs',
    exec_mode: 'cluster',
    instances: 'max',
  }]
}
