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
                <div className="tab-group">
                    <div className="tab selected">
                        <span>王思议</span>
                    </div>
                    <div className="tab">
                        <span>大神</span>
                    </div>
                </div>
                <div className="content">
                    <div className="left-section">
                        <ContributorInfo />
                    </div>
                    <div className="right-section">
                        <Knowledge />
                    </div>
                </div>
            </div>
        );
    }
}
