import * as React from 'react';
import config from 'src/config';
import { DogObject } from 'src/types';

import { Activity } from './Activity';

const uuid = require('uuid/v4')

// check if we are busy cloning this activity
const cloning = (queuedObjects: object[], item: object): boolean => {
    return queuedObjects.filter(obj => obj["id"] === item["id"]).length >= 1;
};
// helper to check if this is a recomended activity
const isRecomended = (distance: number) => {
    return distance <= config.maxRecomendedDistance;
};
// show a busy spinner
const spinner = () => <div key={uuid()} uk-spinner={1} />
// show a clone button, or an indicator that the dog already has been matched to this event
const cloneButton = (props: CloneButtonUI) => {
    const { dog, activity } = props;

    // check if this dog has already been matched to this activity
    if (dog.matches) {
        const count = dog.matches.filter(actId => {
            return actId === activity.item.id.toString();
        }).length
        if (count > 0) {
            return <div key={uuid()} > {dog.name} 🥇</div>
        }
    }

    // if it has not already been matched, decided if the distance is within the dogs max distance range
    // TODO - make max distance a setting for each dog
    const isRec = isRecomended(activity.item.distance);
    return <div key={uuid()}>
        <div>
            {isRec ? (
                <span className="uk-label uk-label-success">Recomended</span>
            ) : null}
        </div>
        <button
            key={activity.item.id}
            className={`uk-button ${
                isRec ? "uk-button-primary" : "uk-button-default"
                }`}
            onClick={() => {
                // if this is bigger than the norm, consult the user with a prompt
                if (!isRec) {
                    const confirm = window.prompt(
                        `Wow, that's long. Are you sure you want to add this activity to ${
                        dog.name
                        }? Type "YES" to confirm.`
                    );
                    if (confirm === "YES") {
                        props.activity.cloneActivity({activity:activity.item,dog:dog});
                    }
                    return;
                }
                props.activity.cloneActivity({activity:activity.item,dog:dog});
            }}
        >
            Add to {dog.name}
        </button>
    </div>
}
interface CloneButtonUI {
    activity: Activity;
    dog: DogObject;
    busy: boolean;
}
const CloneButton = (props: CloneButtonUI) => {
    const { activity } = props;
    const isCloning = cloning(activity.activity.queuedToClone, activity.item);
    
    return <div key={uuid()} >
        { isCloning || props.busy
            ?
            spinner()
            :
            cloneButton(props)
        }
    </div>
}
export default CloneButton