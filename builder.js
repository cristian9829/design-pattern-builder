/**
 * How to implement Builder
 *
 * 1. Declare base builder base class/interface who will define
 *  the general steps for build products, each builder must
 *  implement functionality for these steps.
 *
 * Base builder:
 *  - CarProductionLine
 *
 * Build steps:
 *  - setAirBags
 *  - setColor
 *  - setEdition
 *  - resetProductionLine
 *
 * 2. Implement concrete builders subclasses that offer different
 *  versions of the build steps. These builders could create
 *  concrete products or base ones. Depends on what we need.
 *
 *  SedanProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *  RhinoProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *
 * 3. Implement Product classes, these ones could not inherit/implement
 *  from base class/interface.
 *
 *  For the problem we will make the builder returns the
 *  product base class.
 *
 *  Base product:
 *    - BaseCar
 *
 *  Concrete products:
 *    - MastodonSedanCar
 *    - RhinoSedanCar
 *
 * 4. Implement director class, this one will know the build
 *  process for each product, so we can create specific
 *  configurations for the products.
 *
 *  Product representations
 *      constructCvtEdition
 *      constructSignatureEdition
 *
 * Notes:
 *  The code of this file has some modifications with the version showed
 *  during the course.
 *
 *  Change 1: In resetProductionLine function, the cars to be created
 *  must be sedan cars (mastodon sedan, rhino sedan), since the production
 *  line don't create sedans, but receive and personalize sedan cars to
 *  match different versions (CVT, Signature).
 *
 *  Change 2: Rename model to modelToCustomizeInLine as the param to be passed
 *  in production line object creation.
 *
 *  Change 3: Renamed Car class to BaseCar.
 *
 *  Change 4: Renamed class MastodonCar to MastodonSedanCar.
 *
 *  Change 5: Renamed class RhinoCar to RhinoSedanCar.
 *
 *  Change 6: Delete function setModel and remove function call at build
 *  method in SedanProductionLine class. Make the model assignment directly
 *  in Mastodon and Rhino car classes constructors.
 *
 *  Change 7: Add more comments to code.
 *
 *  Change 8: Renamed file to builder.main.js
 */

// STEP 1

class CarProductionLine{
    setAirBags(airBargsNumber){
        throw new Error('Method not implemented!');
    }
    setcolor(color){
        throw new Error('Method not implemented!');
    }
    setEdition(){
        throw new Error('Method not implemented!');
    }
    resetProductLine(){
        throw new Error('Method not implemented!');
    }
}

//STEP 2
class SedanProductionLine extends CarProductionLine{
    constructor({model}){
        super();
        this.setInternalModel(model);
        this.resetProductLine()
    }

    setAirBags(howMany){
        this.sedanCar.airBags = howMany;
        return this;
    }

    setColor(color){
        this.sedanCar.color = color;
        return this;
    }
    setEdition(edition){
        this.sedanCar.edition = edition;
        return this;
    }
    setInternalModel(model){
        this.internalModel = model;
    }
    resetProductLine(){
        this.sedanCar = this.internalModel === 'mastodon' ? new MastodonCar() : new RhinoCar();
        return this;
    }

    setModel(){
        this.sedanCar.model = 'sedan';
    }
    
    build(){
        this.setModel()
        const sedanCar = this.sedanCar;
        this.resetProductLine();
        return sedanCar;
    }
}

//STEP 3

class Car{
    constructor(){
        this._edition = ''
        this._model = '';
        this._airBags = 2;
        this._color = 'black'
    }

    set airBags(howMany){
        this._airBags = howMany;
    }

    set color(color){
        this._color = color;
    }

    set edition(edition){
        this._edition = edition;
    }

    set model(model){
        this._model = model;
    }
}

class MastodonCar extends Car{
    constructor(){
        super()
    }
}


class RhinoCar extends Car{
    constructor(){
        super()
    }
}


//STEP 4

class Director{
    setProductionLine(productionLine){
        this.productionLine = productionLine;
    }

    constructCvtEdition(){
        this.productionLine.setAirBags(4).setColor('blue').setEdition('CVY');
    }

    constructSignatureEdition(){
        this.productionLine.setAirBags(8).setColor('grey').setEdition('Signature');
    }
}

function appBuilder(director){
    // build version CVT
    const mastodonSedanProductionLine = new SedanProductionLine({model: 'mastodon'})

    director.setProductionLine(mastodonSedanProductionLine)
    director.constructCvtEdition()
    const mastodonSedanCvt = mastodonSedanProductionLine.build();
    console.log(mastodonSedanCvt)

    // build version Signature
    const signatureSedanProductionLine = new SedanProductionLine({model: 'rhino'})

    director.setProductionLine(signatureSedanProductionLine);
    director.constructSignatureEdition();
    const rhinoSedanSignature = signatureSedanProductionLine.build()
    console.log(rhinoSedanSignature)
}



appBuilder(new Director())