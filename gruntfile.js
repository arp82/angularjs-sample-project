module.exports = function(grunt){
	var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
	grunt.initConfig({
		connect: {
			'static':{
				options:{
					hostname: 'localhost',
					port:8081
				}
			},

			server: {
				options: {
					hostname: 'localhost',
					port: 8080,
					keepalive: true,
					middleware: function(connect){
						return [proxySnippet];
					},
					open: {
						target: 'http://localhost:8080/src/index.html'
					}
				},
				proxies: [
					{
						context: '/api',
						host: 'localhost',
						port: 36853
					},
					{
						context: '/',
						host: 'localhost',
						port: 8081
					}
				]
			}

			
		}
	});

	grunt.registerTask('default',['web']);
	grunt.registerTask('web', ['connect:static','configureProxies:server','connect:server']);	// Aqui realmente podemos poner más de un parámetro, para encadenar varias acciones
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-proxy');
};