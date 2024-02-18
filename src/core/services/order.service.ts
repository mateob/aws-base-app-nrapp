import { OrderAttributes, OrderModel } from '@entities/order.model';
import { OrderRepository } from '@repositories/order.repository';
import { ServiceBase } from './base/service-base';

export class OrderService extends ServiceBase<OrderModel, OrderAttributes> {
  repository: OrderRepository;
}
