import React from 'react';

const Content = ({ data }) => {
    return (
        <content>
            <p>{ data.name } { data.exercises }</p>
        </content>
    )
}

export default Content;