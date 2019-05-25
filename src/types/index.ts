import { Activity } from './activity';

export interface ActivityState {
    activities:Activity[];
    error?:Error;
}
export interface AuthState {
    userData?:object;
    accessToken?:string;
    error?:Error;
    location?:Location;
    authenticateWithCode:(code:string)=>void;
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
    activity:ActivityState;
    auth:AuthState;
}
