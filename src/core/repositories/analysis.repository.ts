import { AnalysisAttributes, AnalysisModel, getSchema } from '@entities/analysis.model';
import { ModelStatic, Sequelize } from 'sequelize';
import { AnalysisCustomerModel, getAnalysisCustomerSchema } from '@entities/analysis-customer.model';
import { AnalysisVehicleModel, getAnalysisVehicleSchema } from '@entities/analysis-vehicle.model';
import { RepositoryBase } from './base/repository-base';

export class AnalysisRepository extends RepositoryBase<AnalysisModel, AnalysisAttributes> {
  analysisCustomerSchema: ModelStatic<AnalysisCustomerModel>;

  analysisVehicleSchema: ModelStatic<AnalysisVehicleModel>;

  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);

    // AnalysisCustomer association One
    const analysisCustomerSchema = getAnalysisCustomerSchema(sequelize);
    const analysisCustomerAssociation = schema.hasOne(analysisCustomerSchema, { foreignKey: 'analystUuid', as: 'analysisCustomer' });

    // AnalysisCustomer association One
    const analysisVehicleSchema = getAnalysisVehicleSchema(sequelize);
    const analysisVehicleAssociation = schema.hasOne(analysisVehicleSchema, { foreignKey: 'analystUuid', as: 'analysisVehicle' });

    super(schema, {
      select: [
        { model: analysisCustomerSchema, required: false, as: 'analysisCustomer' },
        { model: analysisVehicleSchema, required: false, as: 'analysisVehicle' },
      ],
      create: [
        { association: analysisCustomerAssociation, as: 'analysisCustomer' },
        { association: analysisVehicleAssociation, as: 'analysisVehicle' },
      ],
    });

    this.analysisCustomerSchema = analysisCustomerSchema;
    this.analysisVehicleSchema = analysisVehicleSchema;
  }
}
