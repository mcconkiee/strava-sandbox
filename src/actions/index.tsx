export interface ApplicationAction {
    type: string;
    payload: any;
}
export const defautltAction:ApplicationAction = {type:"Init",payload:null}
