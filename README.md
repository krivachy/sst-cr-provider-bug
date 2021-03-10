# Custom Resource Provider bug

When I do:

```typescript
    const nodejsLambda = new lambda.NodejsFunction(this, 'lambda', {
        entry: 'src/lambda.ts',
    })

    const provider = new cr.Provider(
        this,
        'provider',
        {
          onEventHandler: nodejsLambda,
        }
    );
```

And then `npx sst build`, it fails with:

```text
Preparing your SST app
Detected tsconfig.json
Transpiling source
 > node_modules/@aws-cdk/aws-lambda-nodejs/lib/util.js:73:20: warning: This call to "require" will not be bundled because the argument is not a string literal (surround with a try/catch to silence this warning)
    73 │     const pkgJson = require(pkgPath); // eslint-disable-line @typescript-eslint/no-require-imports
       ╵                     ~~~~~~~

1 warning
Linting source

sst-cr-provider-bug/lib/MyStack.ts
  13:11  warning  'provider' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)

Running type checker
Synthesizing CDK

Error: ENOENT: no such file or directory, stat 'sst-cr-provider-bug/.build/lib/runtime'
    at Object.statSync (fs.js:1086:3)
    at Object.fingerprint (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/fs/fingerprint.ts:30:28)
    at Function.fingerprint (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/fs/index.ts:38:12)
    at AssetStaging.calculateHash (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/asset-staging.ts:445:27)
    at AssetStaging.stageByCopying (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/asset-staging.ts:246:28)
    at stageThisAsset (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/asset-staging.ts:168:35)
    at Cache.obtain (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/private/cache.ts:24:13)
    at new AssetStaging (sst-cr-provider-bug/node_modules/@aws-cdk/core/lib/asset-staging.ts:191:44)
    at new Asset (sst-cr-provider-bug/node_modules/@aws-cdk/aws-s3-assets/lib/asset.ts:128:21)
    at AssetCode.bind (sst-cr-provider-bug/node_modules/@aws-cdk/aws-lambda/lib/code.ts:251:20)

There was an error synthesizing your app.
```

Line in CDK which is causing the issue in SST:

https://github.com/aws/aws-cdk/blob/v1.91.0/packages/@aws-cdk/custom-resources/lib/provider-framework/provider.ts#L16
