# node-fs-storage

[![GitHub Actions](https://github.com/rx-ts/node-fs-storage/workflows/CI/badge.svg)](https://github.com/rx-ts/node-fs-storage/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/rx-ts/node-fs-storage.svg)](https://codecov.io/gh/rx-ts/node-fs-storage)
[![Codacy Grade](https://img.shields.io/codacy/grade/3eaf9a96ad12491493b712a6a99028c5)](https://www.codacy.com/gh/rx-ts/node-fs-storage)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Fnode-fs-storage%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![npm](https://img.shields.io/npm/v/node-fs-storage.svg)](https://www.npmjs.com/package/node-fs-storage)
[![GitHub Release](https://img.shields.io/github/release/rx-ts/node-fs-storage)](https://github.com/rx-ts/node-fs-storage/releases)

[![David Peer](https://img.shields.io/david/peer/rx-ts/node-fs-storage.svg)](https://david-dm.org/rx-ts/node-fs-storage?type=peer)
[![David](https://img.shields.io/david/rx-ts/node-fs-storage.svg)](https://david-dm.org/rx-ts/node-fs-storage)
[![David Dev](https://img.shields.io/david/dev/rx-ts/node-fs-storage.svg)](https://david-dm.org/rx-ts/node-fs-storage?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/atlassian/changesets)

File System Storage shared same interface with Browser Storage.

## TOC <!-- omit in toc -->

- [Usage](#usage)
  - [Install](#install)
  - [API](#api)
- [Changelog](#changelog)
- [License](#license)

## Usage

### Install

```sh
yarn add node-fs-storage    # yarn
npm install node-fs-storage # npm
```

### API

```ts
// default
import { fsStorage } from 'node-fs-storage'

fsStorage.setItem('key', 'value')
fsStorage.getItem('key')
fsStorage.key(0)
fsStorage.length
fsStorage.removeItem('key')
fsStorage.clear()
```

```ts
// custom
import { FsStorage } from 'node-fs-storage'

// custom path
const fsStorage1 = new FsStorage(path.resolve('.storage'))

// custom `path` and key `encoder`, make sure it is a valid filename
const fsStorage2 = new FsStorage({
  path: path.resolve('.storage'),
  encoder: hash(key),
})
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
