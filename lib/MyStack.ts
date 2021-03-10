import * as sst from "@serverless-stack/resources";
import * as cr from '@aws-cdk/custom-resources';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

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
  }
}
