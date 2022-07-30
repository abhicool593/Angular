export class Product {
    id: string;
    sku : string;
    name : string;
    description : string;
    unitPrice : number;
    imageUrl : string;
    active : boolean;
    unitsInStock : number;
    dateCreated : Date;
    lastUpdated : Date;
    //it matches the data and type what we will getting from database in the form of JSON format
}
