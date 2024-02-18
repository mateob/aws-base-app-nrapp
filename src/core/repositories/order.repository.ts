import { OrderAttributes, OrderModel, getSchema } from '@entities/order.model';
import { Sequelize } from 'sequelize';
// import { getSchema as getSchemaOrderType } from '@entities/order-type.model';
// import { getSchema as getSchemaOrderItem } from '@entities/order-item.model';
import { RepositoryBase } from './base/repository-base';

export class OrderRepository extends RepositoryBase<OrderModel, OrderAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    // const orderTypeSchema = getSchemaOrderType(sequelize);
    // const orderItemSchema = getSchemaOrderItem(sequelize);

    super(schema);
  }
}
