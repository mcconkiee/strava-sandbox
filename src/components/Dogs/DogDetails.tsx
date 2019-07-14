import './Dogs.css';

import Qty from 'js-quantities';
import * as React from 'react';
import Dog from 'src/models/Dog';
import { StravaActivity } from 'src/types';

import Map from '../Activities/Map';
import { MediaLine, SubTitle, Title } from './StyledComponents';




interface DogDetailsUI {
    dog: Dog;
    activities: StravaActivity[],
    refreshing: boolean;
    getDog: (path: string) => void;
    location: Location
}
const MediaLineActivityItem = (activity: StravaActivity) => {
    return <MediaLine key={`activity_${activity.id}`}>
        <div>
        <Map
            onMapClicked={() => {
            }}
            activity={activity}
        />
        </div>
        <div>
            <div>
                {activity.startDate}
            </div>
        </div>
    </MediaLine>
}
class DogDetails extends React.Component<DogDetailsUI> {
    componentDidMount() {
        this.props.getDog(this.props.location.pathname)

    }
    listDetails() {
        const { activities } = this.props;
        return activities.map(activity =>{
            return MediaLineActivityItem(activity);
        })
    }
    render() {
        if (this.props.refreshing) {
            return <div uk-spinner={1} />;
        }
        const { dog } = this.props;
        if (dog) {
            const qty = Qty(this.props.dog.totalDistance || 0, 'm').to('mile');
            const distance = Math.round(100 * qty.scalar) / 100;
            return (
                <div className="dog">
                    <Title> {this.props.dog.name}</Title>
                    <SubTitle>Total Tracked Distance: <strong>{distance} miles</strong></SubTitle>
                    <div>
                        <SubTitle>Last 5 activities:</SubTitle>
                        {this.listDetails()}
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default DogDetails;
