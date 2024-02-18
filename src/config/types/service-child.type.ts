import { ServiceBase } from '@services/base/service-base';

export type ServiceChild = {
  service: ServiceBase<any, any>,
  field: string,
  fk: string
}
