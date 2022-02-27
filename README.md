# eslint-plugin-package-lock

An eslint plugin that will let you lint the package-lock.json

## Rules

-   `lock-file-version` Allows you to require a specific lock file version. The current default is version `3`, but you can request a different version by giving an object with the key `version`. You may want to apply this rule to make sure that you maintain compatibility with your clients and to avoid version `2` which has a rather large footprint due to its attempt to retain backwards compatibility.

## Configurations

-   `version` Applies the lock-file-version rule as an error and uses the default value. An override is used to apply the rule only to `package-lock.json` files and use a JSON parser.

## Examples

### Default values

```json
{
    "extends": ["plugin:package-lock/version"]
}
```

### Requiring a specific lock file version

```json
{
    "overrides": [
        {
            "files": ["package-lock.json"],
            "parser": "eslint-plugin-json-es",
            "plugins": ["package-lock"],
            "rules": {
                "package-lock/lock-file-version": ["error", { "version": 2 }]
            }
        }
    ]
}
```
