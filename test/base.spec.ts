import path from 'path'

import { FsStorage, fsStorage } from 'node-fs-storage'

const cases = (fsStorage: FsStorage) => {
  expect(fsStorage.length).toBe(0)
  expect(fsStorage.key(-1)).toBe(null)
  expect(fsStorage.key(0)).toBe(null)
  expect(fsStorage.getItem('0')).toBe(null)
  expect(fsStorage.length).toBe(0)

  fsStorage.setItem('key1', 'value1')

  expect(fsStorage.getItem('key1')).toBe('value1')
  expect(fsStorage.length).toBe(1)
  expect(fsStorage.key(0)).toBe('key1')
  expect(fsStorage.key(1)).toBe(null)
  expect(fsStorage.key('0')).toBe('key1')
  expect(fsStorage.key('1')).toBe(null)
  expect(fsStorage.key('0.1')).toBe(null)
  expect(fsStorage.key('x')).toBe('key1')

  fsStorage.setItem('key2', 'value2')
  expect(fsStorage.getItem('key1')).toBe('value1')
  expect(fsStorage.getItem('key2')).toBe('value2')
  expect(fsStorage.length).toBe(2)

  fsStorage.removeItem('key1')

  expect(fsStorage.getItem('key1')).toBe(null)
  expect(fsStorage.getItem('key2')).toBe('value2')
  expect(fsStorage.length).toBe(1)

  fsStorage.clear()
}

describe('basic usage', () => {
  // eslint-disable-next-line jest/expect-expect
  test('default', () => cases(fsStorage))

  // eslint-disable-next-line jest/expect-expect
  test('custom', () => {
    const STORAGE_DIR = path.resolve('.storage')

    cases(new FsStorage(STORAGE_DIR))
    cases(
      new FsStorage({
        path: STORAGE_DIR,
        encoder: (key: string) => key,
      }),
    )
  })
})
