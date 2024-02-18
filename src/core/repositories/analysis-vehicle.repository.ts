import { AnalysisVehicleAttributes, AnalysisVehicleModel, getAnalysisVehicleSchema } from '@entities/analysis-vehicle.model';
import { ModelStatic, Sequelize } from 'sequelize';
import { DocumentModel, getDocumentSchema } from '@entities/document.model';
import { RestrictionModel, getRestrictionSchema } from '@entities/restriction.model';
import { RepositoryBase } from './base/repository-base';

export class AnalysisVehicleRepository extends RepositoryBase<AnalysisVehicleModel, AnalysisVehicleAttributes> {
  restrictionSchema: ModelStatic<RestrictionModel>;

  documentSchema: ModelStatic<DocumentModel>;

  constructor(sequelize: Sequelize) {
    const schema = getAnalysisVehicleSchema(sequelize);

    // Restriction association Many
    const restrictionSchema = getRestrictionSchema(sequelize);
    const restrictionAssociation = schema.hasMany(restrictionSchema, { foreignKey: 'analysisVehicleUuid', as: 'restrictions' });

    // Document association Many
    const documentSchema = getDocumentSchema(sequelize);
    const documentAssociation = schema.hasMany(documentSchema, { foreignKey: 'analysisVehicleUuid', as: 'documents' });

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
