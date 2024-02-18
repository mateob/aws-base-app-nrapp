import { VehicleAttributes, VehicleModel } from '@entities/vehicle.model';
import { VehicleRepository } from '@repositories/vehicle.repository';
import { ServiceBase } from './base/service-base';

export class VehicleService extends ServiceBase<VehicleModel, VehicleAttributes> {
  repository: VehicleRepository;
}
