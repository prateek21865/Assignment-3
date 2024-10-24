import {
  DefaultSequence,
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  Send,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';

export class MySequence extends DefaultSequence {
  @inject(RestBindings.Http.CONTEXT) ctx: RequestContext;

  constructor(
    @inject(RestBindings.SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(RestBindings.SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(RestBindings.SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(RestBindings.SequenceActions.SEND) public send: Send,
    @inject(RestBindings.SequenceActions.REJECT) public reject: Reject
  ) {
    super(findRoute, parseParams, invoke, send, reject);
  }

  async handle(context: RequestContext): Promise<void> {
    const {request, response} = context;
    const startTime = new Date().toISOString();

    // Extract request headers and details
    const referer = request.headers['referer'] ?? 'Unknown';
    const userAgent = request.headers['user-agent'] ?? 'Unknown';
    const ip = request.connection.remoteAddress ?? 'Unknown';

    console.log(`Request started: ${startTime}`);
    console.log(`Referer: ${referer}`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`IP: ${ip}`);

    // Step 2: Check if referer is allowed based on environment variable
    const allowedOrigin = process.env.ALLOWED_ORIGIN;

    if (referer && !referer.startsWith(allowedOrigin!)) {
      const errorTime = new Date().toISOString();
      console.log(`Error time: ${errorTime}`);
      throw new HttpErrors.Forbidden(`Referer '${referer}' is not allowed`);
    }

    try {
      // Step 3: Proceed with the regular sequence
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      const errorTime = new Date().toISOString();
      console.log(`Error time: ${errorTime}`);
      this.reject(context, err);
    }

    // Step 4: Log request completion time
    const completionTime = new Date().toISOString();
    console.log(`Request completed: ${completionTime}`);
  }
}
