import fs from 'fs'
import path from 'path'
import os from 'os'

import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

const STORAGE_DIR = '.storage'
const NODE_MODULES = path.resolve('node_modules')

// eslint-disable-next-line sonar/function-name
export const DEFAULT_ENCODER = (key: string) =>
  Buffer.from(key).toString('base64')

export interface FsStorageOptions {
  path?: string
  encoder?: (key: string) => string
  decoder?: (encoded: string) => string
}

export class FsStorage implements Storage {
  get length() {
    return this.#keys.size
  }

  #keys = new Set<string>()

  get #defaultPath() {
    try {
      if (fs.statSync(NODE_MODULES).isDirectory()) {
        return path.resolve(NODE_MODULES, STORAGE_DIR)
      }
      /* istanbul ignore next */
      throw new Error('Invalid `node_modules` directory.')
    } catch {
      /* istanbul ignore next */
      return path.resolve(os.homedir(), STORAGE_DIR)
    }
  }

  #path: string
  #encoder: (key: string) => string

  constructor(pathOrOptions?: FsStorageOptions | string) {
    const { path, encoder } =
      pathOrOptions == null || typeof pathOrOptions === 'string'
        ? { path: pathOrOptions, encoder: null }
        : pathOrOptions

    this.#path = path ?? this.#defaultPath
    this.#encoder = encoder ?? DEFAULT_ENCODER
    mkdirp.sync(this.#path)
  }

  clear() {
    this.#keys.clear()
    rimraf.sync(this.#path)
    mkdirp.sync(this.#path)
  }

  getItem(key: string): string | null {
    try {
      return fs
        .readFileSync(path.resolve(this.#path, this.#encoder(key)))
        .toString()
    } catch {
      return null
    }
  }

  key(index: number | string): string | null {
    const num = Number.parseInt(index as string)
    const float = Number.parseFloat(index as string)

    if (
      !Number.isNaN(num) &&
      (num !== float || num < 0 || num >= this.#keys.size)
    ) {
      return null
    }

    let curr = 0

    for (const key of this.#keys.values()) {
      if (num === curr++) {
        return key
      }
    }

    return this.key(0) ?? null
  }

  removeItem(key: string): void {
    this.#keys.delete(key)
    rimraf.sync(path.resolve(this.#path, this.#encoder(key)))
  }

  setItem(key: string, value: string): void {
    this.#keys.add(key)
    fs.writeFileSync(path.resolve(this.#path, this.#encoder(key)), value)
  }
}

export const fsStorage = new FsStorage()
