# undefined

Session storage and undefined value

## Building project

```shell
docker compose run --rm node14
```

## Running unit tests

```shell
yarnpkg test
```

Results:

```
yarn run v1.22.19
$ node --experimental-vm-modules ./node_modules/.bin/jest
(node:402) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  tests/storage.test.js
  storage
    get()
      ✓ returns defaultValue, when there is no such key (5 ms)
      ✓ parse valid JSON (2 ms)
      ✓ returns defaultValue, when JSON.parse throws an exception (e.g. "undefined") (1 ms)
      ✓ returns defaultValue, when JSON.parse was mocked and thrown an exception (2 ms)
    set()
      ✓ stores without stringify, when stringify=false
      ✓ stores as JSON, when stringify=true (1 ms)
      ✓ stringify=true works fine for number/boolean/null (1 ms)
    delete()
      ✓ removes key (1 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.765 s, estimated 1 s
Ran all test suites.
Done in 1.36s.
```