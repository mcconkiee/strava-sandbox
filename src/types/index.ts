export interface AuthState {
    userName?:string,    
}
export interface HelloState{
    languageName: string;
    enthusiasmLevel: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}
export interface StoreState {
    hello:HelloState;
    auth:AuthState;
}
