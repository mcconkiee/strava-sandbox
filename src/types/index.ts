
export interface StravaMap{
    summary_polyline:string;
}

export interface StravaActivity{
    name:string;
    map:StravaMap;
    distance:number;
    startDate:string;
    id:number;
}
export interface ActivityState {
    activities:StravaActivity[];
    queuedToClone:StravaActivity[];
    error?:Error;  
    page:number;  
    loading:boolean;
    updatedActivity?:object;     
}
export interface AuthState {
    userData?:object;
    accessToken?:string;
    error?:Error;
    location?:Location;
    authenticateWithCode:(code:string,dogs:boolean)=>void;    
}

export interface DogState {
    loading:boolean;
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
