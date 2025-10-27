const { src, dest } = require('gulp');
const { parallel } = require('gulp');

function buildNodeIcons() {
  return src('nodes/**/*.{png,svg}').pipe(dest('dist/nodes'));
}

function buildCredentialIcons() {
  return src('credentials/**/*.{png,svg}').pipe(dest('dist/credentials'));
}

const buildIcons = parallel(buildNodeIcons, buildCredentialIcons);

exports.default = buildIcons;
exports['build:icons'] = buildIcons;

