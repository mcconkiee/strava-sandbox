
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

export interface StravaAccount{
    firstname:string;
    lastname:string;        
    id:number;
}

export interface ActivityState {
    activities:StravaActivity[];
    queuedToClone:StravaActivity[];
    error?:Error;  
    page:number;  
    loading:boolean;
    updatedActivity?:object; 
    selectedActivity?:StravaActivity;     
}
export interface AuthState {
    userData?:StravaAccount;
    accessToken?:string;
    error?:Error;
    location?:Location;    
}

export interface DogState {
    loading:boolean;
    userData?:StravaAccount;
    accessToken?:string;
    error?:Error;
    location?:Location;
    dogs?:StravaAccount[];
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
