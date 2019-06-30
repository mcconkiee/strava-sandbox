import './Dogs.css';

import * as React from 'react';
import { DogObject } from 'src/types';
import Map from '../Activities/Map';

interface DogDetailsUI {
    dog: DogObject;
    refreshing: boolean;
    getDog: (path: string) => void;
    location: Location
}
class DogDetails extends React.Component<DogDetailsUI> {
    componentDidMount() {
        this.props.getDog(this.props.location.pathname)

    }
    listDetails() {
        const { dog } = this.props;
        if (dog.matches) {
            return dog.matches.map(match => {
                return <div key={`activity_${match.id}`}>
                    <Map
                        onMapClicked={() => {


                        }}
                        activity={match}
                    />
                </div>
            })
        }
        return null;
    }
    render() {
        if (this.props.refreshing) {
            return <div uk-spinner={1} />;
        }
        const { dog } = this.props;
        if (dog) {
            return (
                <div className="dog">
                    <div>
                    {this.props.dog.name}
                    </div>
                    <div>
                    {this.props.dog.totalDistance}
                    </div>

                    <div>
                        {this.listDetails()}
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default DogDetails;
