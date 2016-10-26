import React, { Component } from 'react';

import ContributorInfo from "./ContributorInfo";
import Knowledge from "./Knowledge";

export default class Contributor extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div className="cp-course-contributor">    
                <div className="left-section">
                    <ContributorInfo />
                </div>
                <div className="right-section">
                    <Knowledge />
                </div>
            </div>
        );
    }
}
