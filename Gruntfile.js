module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt, {
		pattern: ['grunt-*', '!grunt-template-jasmine-istanbul', 'which']
	});

	var stdMetadata = {
		apexclass: ['*'],
		apexpage: ['*'],
		staticresource: ['*'],
		apextrigger: ['*'],
		apexcomponent: ['*'],
		customfield: [],
		customobject: []
	};

	grunt.initConfig({
		jasmine: {
			proposalPlus: {
				// Include paths for both the local user, if we're in dev mode, as well as share mode
				src: ["resource-bundles/app.resource/resources/tests/**/*.js"],
				options: {
					// Include path for Jasmine spec files
					// Only include those ending in Spec.js
					// Specifically excluding those ending in NotReady.js
					vendor: [
						'lib/jQuery-2.1.1.min.js',
						'lib/jquery-jasmine.js',
					],
					specs: [
						'spec/unitTests/jquerySpec.js',
						'spec/unitTests/exampleSpec.js',
					],
					version: '2.0.0',
					keepRunner: true,
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						files: '!resource-bundles/pp_js.resource/**',
						coverage: 'bin/coverage/coverage.json',
						report: 'bin/coverage',
						thresholds: {
							lines: 30,
							statements: 20,
							branches: 10,
							functions: 5
						}
					}
				}
			}
		},
		copy: {
			deploy: {
				files: [{
					src: 'src/**',
					dest: 'deployTmp/',
				}]
			},
		},
		clean: {
			bootstrap: ['tmp'],
			deployTmp: ['deployTmp']
		},
		antdeploy: {
			options: {
				version: '29.0',
				root: 'deployTmp/src/',
				existingPackage: false
			},
			automated: {
				options: {
					useEnv: true,
					serverurl: 'https://login.salesforce.com' // default => https://login.salesforce.com
				},
				pkg: stdMetadata
			},
			test: {
				options: {
					serverurl: 'https://test.salesforce.com' // default => https://login.salesforce.com
				},
				pkg: stdMetadata
			},
			prod: {
				options: {
					serverurl: 'https://login.salesforce.com'
				},
				pkg: stdMetadata
			},
			ngApp: {
				options: {
					user: '',
					pass: '',
					token: '',
					serverurl: 'https://test.salesforce.com'
				},
				pkg: {
					staticresources: [
						'jasmine'
					]
				}
			}
		},
		availabletasks: {
			tasks: {}
		},
		compress: {
			ngApp: {
				options: {
					mode: 'zip',
					archive: 'src/staticresources/ngf.resource'
				},
				files: [{
					expand: true,
					cwd: 'resource-bundles/ngf.resource/',
					src: ['**'],
					dest: ''
				}, ]
			},
			css: {
				options: {
					mode: 'zip',
					archive: 'src/staticresources/pp_css.resource'
				},
				files: [{
					expand: true,
					cwd: 'resource-bundles/pp_css.resource/',
					src: ['**'],
					dest: ''
				}, ]
			},
			output: {
				options: {
					mode: 'zip',
					archive: 'src/staticresources/ccpp_output.resource'
				},
				files: [{
					expand: true,
					cwd: 'resource-bundles/ccpp_output.resource/',
					src: ['**'],
					dest: ''
				}, ]
			},
			js: {
				options: {
					mode: 'zip',
					archive: 'src/staticresources/pp_js.resource'
				},
				files: [{
					expand: true,
					cwd: 'resource-bundles/pp_js.resource/',
					src: ['**'],
					dest: ''
				}, ]
			},
			test: {
				options: {
					mode: 'zip',
					archive: 'src/staticresources/pp_test.resource'
				},
				files: [{
					expand: true,
					cwd: 'resource-bundles/pp_test.resource/',
					src: ['**'],
					dest: ''
				}, ]
			}
		},
		deploy: {
			test: {

			},
			prod: {}
		},
		deployNgApp: {
			ngApp: {}
		},
		antretrieve: {
			options: {
				version: '29.0',
				useEnv: true,
				root: 'src/',
				// existingPackage: true,
				maxPoll: '20',
				pollWaitMillis: '10000'
			},
			test: {
				options: {
					serverurl: 'https://test.salesforce.com' // default => https://login.salesforce.com
				},
				pkg: stdMetadata
			},
			prod: {
				options: {
					serverurl: 'https://login.salesforce.com'
				},
				pkg: stdMetadata
			}
		},
		prompt: {
			login: {
				options: {
					questions: [{
						config: 'antdeploy.test.options.user', // arbitray name or config for any other grunt task
						type: 'input', // list, checkbox, confirm, input, password
						message: "Enter the Deploy Username: ", // Question to ask the user, function needs to return a string,
					}, {
						config: 'antdeploy.test.options.pass', // arbitray name or config for any other grunt task
						type: 'password', // list, checkbox, confirm, input, password
						message: "Enter Password (without security token): ", // Question to ask the user, function needs to return a string,
					}, {
						config: 'antdeploy.test.options.token', // arbitray name or config for any other grunt task
						type: 'password', // list, checkbox, confirm, input, password
						message: "Enter Security Token: ", // Question to ask the user, function needs to return a string,
					}, ]
				}
			},
		},

	});

	// Default task.
	grunt.registerTask('default', 'jasmine');
	grunt.registerTask('refreshResources', "Refresh the staticResource.zip files", function() {
		grunt.task.run(['compress:ngApp']);
	});
	grunt.registerMultiTask('deploy', "Refreshes resources and deploys to selected env", function() {
		grunt.task.run([
			'refreshResources',
			'copy:deploy',
			'prompt:login',
			'antdeploy:' + this.target,
			'clean:deployTmp'
		]);
	});

	grunt.registerMultiTask('deployNgApp', "Deploys the ngApp resource to the specified env", function() {
		grunt.task.run([
			'compress:ngApp',
			'clean:deployTmp',
			'copy:ngApp',
			'antdeploy:ngApp',
			'clean:deployTmp'
		]);
	});

	grunt.registerTask('automatedDeploy', "Refreshes resources and deploys to selected env", function() {
		grunt.task.run([
			'refreshResources',
			'copy:deploy',
			'antdeploy:automated',
			'clean:deployTmp'
		]);
	});

	grunt.registerTask('tasks', ['availabletasks']);
	grunt.registerTask('bootstrap', ['copy', 'less', 'cssmin', 'clean:bootstrap']);
};