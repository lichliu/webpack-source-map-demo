# start
node .
# problem
In build/webpack.config.server.js,if I set '#cheap-module-source-map' for devtool,it will not generate full path in dist/index.js.map, just
webpack:///C.vue, I hope it is webpack:///./src_fe/components/C/C.vue