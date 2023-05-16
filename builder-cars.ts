
interface Carro{
    edition : string;
    model:string;
    airBags: number;
    color:string;
}


interface HBProductionLine{
    car: Carro;
    internalModel: string;
    setAirBags(airbags:number) :any;
    setColor(color:string):any;
    setEdition(edition:string):any;
    resetProductLine():void
    build():Carro
}

type ModelCar = {model:string}

class HBFordFiestaProductionLine implements HBProductionLine{
    car: Carro = {
        edition : "",
        model:"",
        airBags: 0,
        color:""
    };
    internalModel: string = "";
    constructor({model}: ModelCar){
        this.car.model = model;
        this.setInternalModel(model);
        this.resetProductLine()
    }
    setAirBags(airbags: number) {
        this.car.airBags = airbags;
    }
    setColor(color: string) {
        this.car.color = color;
    }
    setEdition(edition: string) {
        this.car.edition = edition;
    }
    setInternalModel(model:string){
        this.internalModel = model;
    }
    resetProductLine(): void {
       if(this.internalModel){

       }
    }
    build(): Carro {
       return this.car;
    }
    
}


class CarroFordHB implements Carro{
    edition: string;
    model: string;
    airBags: number;
    color: string;
    constructor(edition: string, model: string, airBags: number, color: string){
        this.airBags = airBags;
        this.model = model;
        this.color = color;
        this.edition = edition;
    }
}

class Orquestator {
    buildCarFordHB(car: CarroFordHB): CarroFordHB {
        const HBFordFiesta = new HBFordFiestaProductionLine({model: car.model})
        HBFordFiesta.setAirBags(car.airBags);
        HBFordFiesta.setColor(car.color);
        HBFordFiesta.setEdition(car.edition);
        return HBFordFiesta.build()
    }
}

const main = (orq:Orquestator) =>{
    const carFordFiesta = new CarroFordHB("st","2018",2,"grey");
    const carBuilderFord = orq.buildCarFordHB({airBags: carFordFiesta.airBags, color: carFordFiesta.color, edition: carFordFiesta.edition, model: carFordFiesta.model})
    console.log(carBuilderFord) // { edition: 'st', model: '2018', airBags: 2, color: 'grey' }
}

main(new Orquestator())