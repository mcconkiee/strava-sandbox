import './Dogs.css';

import * as React from 'react';
import { DogObject } from 'src/types';

interface DogDetailsUI {
    dog: DogObject;
    refreshing: boolean;
    getDog:(path:string)=>void;
    location:Location
}
class DogDetails extends React.Component<DogDetailsUI> {
    componentDidMount(){
        this.props.getDog(this.props.location.pathname)
        
    }
    render() {
        if (this.props.refreshing) {
            return <div uk-spinner={1} />;
        }
        const {dog} = this.props;
        if(dog){
            return (
                <div className="dog">
                    <h4>{this.props.dog.name}</h4>
    
                </div>
            );
        }
        return null;
    }
}

export default DogDetails;
