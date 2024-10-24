import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  Send,
  SequenceHandler,
} from '@loopback/rest';

const SequenceActions = {
  FIND_ROUTE: 'rest.sequence.actions.findRoute',
  PARSE_PARAMS: 'rest.sequence.actions.parseParams',
  INVOKE_METHOD: 'rest.sequence.actions.invokeMethod',
  SEND: 'rest.sequence.actions.send',
  REJECT: 'rest.sequence.actions.reject',
};

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
