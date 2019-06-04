

export interface ActivityState {
    activities:object[];
    error?:Error;  
    page:number;  
    updatedActivity?:object;
    getActivitiesList:(page?:number)=>void;
    getDogs?:()=>void;
}
export interface AuthState {
    userData?:object;
    accessToken?:string;
    error?:Error;
    location?:Location;
    authenticateWithCode:(code:string,dogs:boolean)=>void;    
}

export interface DogState {
    userData?:object;
    accessToken?:string;
    error?:Error;
    location?:Location;
    dogs?:object[];
    authenticateWithCode:(code:string)=>void;
    getDogs:()=>void;
}

export interface HelloState{
    languageName: string;
    enthusiasmLevel: number;
    location?:Location;    
    onIncrement?: () => void;
    onDecrement?: () => void;
}
export interface StoreState {
    hello:HelloState;
    dogs:DogState,
    activity:ActivityState;
    auth:AuthState;
}
