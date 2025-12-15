import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import storage from '../src/storage.js'

describe('storage', () => {
    beforeEach(() => {
        sessionStorage.clear()
        jest.restoreAllMocks()
    })

    describe('get()', () => {
        test('returns defaultValue, when there is no such key', () => {
            expect(storage.get('missing')).toBeNull()
            expect(storage.get('missing', 123)).toBe(123)
            expect(storage.get('missing', { a: 1 })).toEqual({ a: 1 })
        })

        test('parse valid JSON', () => {
            sessionStorage.setItem('object', '{"a":1,"b":"x"}')
            expect(storage.get('object')).toEqual({ a: 1, b: 'x' })

            sessionStorage.setItem('array', '[1,2,3]')
            expect(storage.get('array')).toEqual([1, 2, 3])

            sessionStorage.setItem('bool', 'true')
            expect(storage.get('bool')).toBe(true)

            sessionStorage.setItem('number', '42')
            expect(storage.get('number')).toBe(42)

            sessionStorage.setItem('n', 'null')
            expect(storage.get('n')).toBeNull()
        })

        test('returns defaultValue, when JSON.parse throws an exception (e.g. "undefined")', () => {
            sessionStorage.setItem('bad', 'undefined') // niepoprawny JSON
            expect(storage.get('bad', 'fallback')).toBe('fallback')
        })

        test('returns defaultValue, when JSON.parse throws an exception (e.g. "NaN")', () => {
            sessionStorage.setItem('bad', 'NaN') // niepoprawny JSON
            expect(storage.get('bad', 'fallback')).toBe('fallback')
        })

        test('returns defaultValue, when JSON.parse was mocked and thrown an exception', () => {
            sessionStorage.setItem('x', '{"a":1}')

            const spy = jest.spyOn(JSON, 'parse').mockImplementation(() => {
                throw new Error('boom')
            })

            expect(storage.get('x', 'fallback')).toBe('fallback')
            spy.mockRestore()
        })
    })

    describe('set()', () => {
        test('stores without stringify, when stringify=false', () => {
            storage.set('k', 'abc')
            expect(sessionStorage.getItem('k')).toBe('abc')
        })

        test('stores as JSON, when stringify=true', () => {
            storage.set('k', { a: 1 }, true)
            expect(sessionStorage.getItem('k')).toBe('{"a":1}')
            expect(storage.get('k')).toEqual({ a: 1 })
        })

        test('stringify=true works fine for number/boolean/null', () => {
            storage.set('n', 12, true)
            expect(sessionStorage.getItem('n')).toBe('12')
            expect(storage.get('n')).toBe(12)

            storage.set('b', false, true)
            expect(sessionStorage.getItem('b')).toBe('false')
            expect(storage.get('b')).toBe(false)

            storage.set('z', null, true)
            expect(sessionStorage.getItem('z')).toBe('null')
            expect(storage.get('z')).toBeNull()
        })
    })

    describe('delete()', () => {
        test('removes key', () => {
            sessionStorage.setItem('k', '"x"')
            storage.delete('k')
            expect(sessionStorage.getItem('k')).toBeNull()
        })
    })
})
