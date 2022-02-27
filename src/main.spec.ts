import { RuleTester } from 'eslint';
import rule from './main';

const ruleTester = new RuleTester({
    parser: `${__dirname}/../node_modules/eslint-plugin-json-es/index.js`,
});

const validPackageLock = {
    name: 'eslint-plugin-package-lock',
    version: '0.0.1',
    lockfileVersion: 3,
    requires: true,
};

ruleTester.run('lock-file-version', rule.rules['lock-file-version'], {
    valid: [
        {
            code: JSON.stringify(validPackageLock),
        },
        {
            code: JSON.stringify({ ...validPackageLock, lockfileVersion: 2 }),
            filename: '.eslintrc.json',
        },
    ],
    invalid: [
        {
            code: JSON.stringify({ ...validPackageLock, lockfileVersion: 2 }),
            filename: 'package-lock.json',
            errors: [{ message: 'Found package-lock version 2. Desired version is 3' }],
        },
    ],
});
