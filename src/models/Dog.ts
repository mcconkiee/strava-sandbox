class Dog {
    id: string;
    name: string;
    firstname: string;
    lastname: string;
    totalDistance: number;
    matches: string[];
    path: string;
    initialData:any;
    constructor(obj: string); 
    constructor(obj: any) {
        this.id = obj && obj.id || obj
        this.name = obj && obj.firstname || obj
        this.firstname = obj && obj.firstname || obj
        this.initialData = obj;        
    }    
}
export default Dog;