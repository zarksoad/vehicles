export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  photo: string;
}



export interface ICreateVehicle {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  photo: string;
}
