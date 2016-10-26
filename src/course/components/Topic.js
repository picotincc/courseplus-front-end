import React, { Component } from 'react';

export default class Knowledge extends Component {

    constructor (props) {
        super(props);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    render()
    {
        return (
            <div className="cp-course-topic">
                <div className="knowledge-content">
                </div>
                <div className="bottom-controls">
                    <div className="previous">
                        <span>上一条</span>
                    </div>
                    <div className="category-dropdown dropdown">
                        <button className="btn-category btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                            二叉树<span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a>二叉树</a></li>
                            <li><a>快速排序</a></li>
                        </ul>
                    </div>
                    <div className="next">
                        <span>下一条</span>
                    </div>
                </div>
            </div>
        );
    }
}
