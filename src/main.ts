import { Linter, Rule } from 'eslint';
import RuleModule = Rule.RuleModule;
import BaseConfig = Linter.BaseConfig;

const isRecord = (arg: unknown): arg is Record<string, unknown> => !!arg && typeof arg === 'object';

interface EslintPluginPackageLock {
    'lock-file-version': RuleModule;
}

const defaultPackageLockVersion = 3;

const rules: EslintPluginPackageLock = {
    'lock-file-version': {
        meta: {
            type: 'suggestion',
        },
        create: (context) => {
            if (!context.getFilename().endsWith('package-lock.json')) {
                return {};
            }
            const [options] = context.options;
            const desiredLockVersion =
                isRecord(options) && typeof options['version'] === 'number'
                    ? options['version']
                    : defaultPackageLockVersion;
            return {
                Property: (property) => {
                    if (
                        property.key.type === 'Literal' &&
                        property.key.value === 'lockfileVersion' &&
                        property.value.type === 'Literal' &&
                        property.value.value !== desiredLockVersion
                    ) {
                        context.report({
                            message: `Found package-lock version ${property.value.value}. Desired version is ${desiredLockVersion}`,
                            node: property.value,
                        });
                    }
                },
            };
        },
    },
};

const configs: Record<string, BaseConfig> = {
    version: {
        overrides: [
            {
                files: ['package-lock.json'],
                parser: 'eslint-plugin-json-es',
                plugins: ['package-lock'],
                rules: {
                    'package-lock/lock-file-version': ['error'],
                },
            },
        ],
    },
};

export = { rules, configs };
