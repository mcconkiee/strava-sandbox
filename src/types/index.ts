export interface StravaMap {
    summary_polyline: string;
}

export interface StravaActivity {
    name: string;
    map: StravaMap;
    distance: number;
    startDate: string;
    start_latitude: number;
    start_longitude: number;
    id: number;
}

export interface StravaAccount {
    firstname: string;
    lastname: string;
    id: number;
    path: string;

}

export interface ActivityState {
    activities: StravaActivity[];
    queuedToClone: StravaActivity[];
    error?: Error;
    page: number;
    loading: boolean;
    updatedActivity?: object;
    selectedActivity?: StravaActivity
    needsRefresh: boolean;
}
export interface AuthState {
    userData?: StravaAccount;
    accessToken?: string;
    error?: Error;
    location?: Location;
    refreshing: boolean;
}
export interface DogObject {
    name: string;
    breed?: string;
    birthdate?: number;
    totalDistance?: number;
    matches?: string[];
    path?: string;
}
export interface DogState {
    loading: boolean;
    userData?: StravaAccount;
    accessToken?: string;
    error?: Error;
    location?: Location;
    dogs?: DogObject[];
    currentDog?: DogObject;
    authenticateWithCode: (code: string) => void;    
}
export interface MapState {
    currentActivity?: StravaActivity;
    width?: number;
    height?: number;
    latitude: number;
    longitude: number;
    zoom?: number;
    coordinates?: number[],
    bounds?: any;
    mercator?: any;
    error?: Error;
}
export interface HelloState {
    languageName: string;
    enthusiasmLevel: number;
    location?: Location;
    onIncrement?: () => void;
    onDecrement?: () => void;
}
export interface StoreState {
    hello: HelloState;
    dogs: DogState,
    activity: ActivityState;
    auth: AuthState;
    map: MapState;
}
