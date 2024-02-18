export class Policy {
  static generate(principalId, effect, resource, context) {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }],
      },
      context,
    };
  }
}
