import React from 'react';

const Content = ({ courseInfo }) => {
    return (
        <content>
            <p>{ courseInfo.name } { courseInfo.exercises }</p>
        </content>
    )
}

export default Content;