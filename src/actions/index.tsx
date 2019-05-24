export interface Action {
    type: string;
    payload: any;
}
export const defautltAction:Action = {type:"Init",payload:null}
