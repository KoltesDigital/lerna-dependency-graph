# lerna-dependency-graph

Outputs dependencies in a Lerna monorepo using Graphviz.

![pug](https://raw.githubusercontent.com/KoltesDigital/lerna-dependency-graph/master/pug.png)  
_Graph of [Pug (template engine)](https://github.com/pugjs/pug)._

## Usage

Install [Graphviz](https://graphviz.gitlab.io/download/) and add the bin directory in your PATH.

Then add this package to your project:

    npm i -D lerna-dependency-graph

Add a script entry in your package.json:

```json
  "scripts": {
    "graph": "lerna-dependency-graph"
  },
```

Execute:

    npm run graph [-- options]

You could also give it a try without installing it:

    npx lerna-dependency-graph [options]

## Options

The most important ones are:

- `-f <format>` / `--outputFormat <format>`  
  Outputs the given format.  
  If not given, outputs plain DOT.  
  [List of available output formats](https://www.graphviz.org/doc/info/output.html)
- `-o <path>` / `--outputPath <path>`  
  File to write into.  
  If not given, outputs on stdout.

See all options with `-h`.
