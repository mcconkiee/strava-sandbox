import * as React from 'react';
import { RouteChildrenProps } from "react-router";

function NoMatch(props: RouteChildrenProps) {
    return (
        <div>
            <h3>
                No match for <code>{props.location.pathname}</code>
            </h3>
        </div>
    );
}
export default NoMatch;