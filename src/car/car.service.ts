import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock'
import { CarDto } from './car.dto'

@Injectable()
export class CarService {
    private cars = CARS;

    public async getCars() {
        return this.cars;
    }

    public async postCar(car: CarDto) {
        return this.cars.push(car);
    }

    public async getCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve => {
            const car = this.cars.find((car) => car.id === carId);
            if (!car) {
                throw new HttpException('Not found', 404);
            }
            return resolve(car);
        }));
    }

    public async deleteCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve => {
            const index = this.cars.findIndex((car) => car.id === carId);
            if (index === -1) {
                throw new HttpException('Not found', 404);
            }
            this.cars.splice(index, 1)
            return resolve(this.cars);
        }));
    }

    public async putCarById(id: number, propertyName: string, propertyValue: string): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve => {
            const index = this.cars.findIndex((car) => car.id === carId);
            if (index === -1) {
                throw new HttpException('Not found', 404);
            }
            this.cars[index][propertyName] = propertyValue;
            return resolve(this.cars);;
        }));
    }
}
