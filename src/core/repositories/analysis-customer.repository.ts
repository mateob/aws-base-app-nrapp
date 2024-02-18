import { AnalysisCustomerAttributes, AnalysisCustomerModel, getAnalysisCustomerSchema } from '@entities/analysis-customer.model';
import { ModelStatic, Sequelize } from 'sequelize';
import { RestrictionModel, getRestrictionSchema } from '@entities/restriction.model';
import { DocumentModel, getDocumentSchema } from '@entities/document.model';
import { RepositoryBase } from './base/repository-base';

export class AnalysisCustomerRepository extends RepositoryBase<AnalysisCustomerModel, AnalysisCustomerAttributes> {
  restrictionSchema: ModelStatic<RestrictionModel>;

  documentSchema: ModelStatic<DocumentModel>;

  constructor(sequelize: Sequelize) {
    const schema = getAnalysisCustomerSchema(sequelize);

    // Restriction association Many
    const restrictionSchema = getRestrictionSchema(sequelize);
    const restrictionAssociation = schema.hasMany(restrictionSchema, { foreignKey: 'analysisCustomerUuid', as: 'restrictions' });

    // Document association Many
    const documentSchema = getDocumentSchema(sequelize);
    const documentAssociation = schema.hasMany(documentSchema, { foreignKey: 'analysisCustomerUuid', as: 'documents' });

    super(schema, {
      select: [
        { model: restrictionSchema, required: false, as: 'restrictions' },
        { model: documentSchema, required: false, as: 'documents' },
      ],
      create: [
        { association: restrictionAssociation, as: 'restrictions' },
        { association: documentAssociation, as: 'documents' },
      ],
    });
    this.restrictionSchema = restrictionSchema;
    this.documentSchema = documentSchema;
  }
}
