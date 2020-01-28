#!/usr/bin/env node

import { getPackages } from '@lerna/project';
import fs from 'fs';
import graphviz from 'graphviz';
import yargs from 'yargs';

const argv = yargs
	.help()
	.alias('help', 'h')
	.version()
	.alias('version', 'v')
	.options({
		graphvizCommand: {
			alias: 'c',
			default: 'dot',
			description: 'Graphviz command to use.',
			type: 'string',
		},
		graphvizDirectory: {
			alias: 'd',
			description: 'Graphviz directory, if not in PATH.',
			type: 'string',
		},
		outputFormat: {
			alias: 'f',
			description: 'Outputs the given format. If not given, outputs plain DOT.',
			type: 'string',
		},
		outputPath: {
			alias: 'o',
			description: 'File to write into. If not given, outputs on stdout.',
			type: 'string',
		},
	}).argv;

getPackages().then((packages) => {
	const g = graphviz.digraph('G');

	g.use = argv.graphvizCommand;

	if (argv.graphvizDirectory) {
		g.setGraphVizPath(argv.graphvizDirectory);
	}

	packages.forEach((pkg) => {
		const node = g.addNode(pkg.name);

		if (pkg.private) {
			node.set('style', 'dashed');
		}

		if (pkg.dependencies) {
			Object.keys(pkg.dependencies).forEach((depName) => {
				if (packages.find((p) => p.name === depName)) {
					g.addEdge(node, depName);
				}
			});
		}

		if (pkg.devDependencies) {
			Object.keys(pkg.devDependencies).forEach((depName) => {
				if (packages.find((p) => p.name === depName)) {
					const edge = g.addEdge(node, depName);
					edge.set('style', 'dashed');
				}
			});
		}

		if (pkg.peerDependencies) {
			Object.keys(pkg.peerDependencies).forEach((depName) => {
				if (packages.find((p) => p.name === depName)) {
					const edge = g.addEdge(node, depName);
					edge.set('style', 'dotted');
				}
			});
		}
	});

	if (argv.outputFormat) {
		if (argv.outputPath) {
			g.output(argv.outputFormat, argv.outputPath);
		} else {
			g.output(argv.outputFormat, (data) => process.stdout.write(data));
		}
	} else {
		const data = g.to_dot();
		if (argv.outputPath) {
			fs.writeFile(argv.outputPath, data, (err) => {
				if (err) {
					console.error(err);
					process.exit(1);
				}
			});
		} else {
			console.log(data);
		}
	}
});
