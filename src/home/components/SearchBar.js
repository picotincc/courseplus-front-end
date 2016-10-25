import React, { Component } from 'react';

export default class SearchBar extends Component {

    constructor (props) {
        super(props);

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    static defaultProps = {
        school: "",
        majors: [],
        selectedMajor: "",
        isSearched: false
    }

    static propTypes = {

    }

    state = {

    }

    componentDidMount()
    {
        this.input = this.refs["searchInput"];
    }

    render()
    {
        const { school, majors, selectedMajor} = this.props;

        return (
            <div className="cp-home-search">
                <span className="school-tag">学校：</span>
                <div className="school-dropdown dropdown">
                    <button className="btn-school btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        {school}<span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a>{school}</a></li>
                    </ul>
                </div>
                <span className="major-tag">专业:</span>
                <div className="major-dropdown dropdown">
                    <button className="btn-major btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        {selectedMajor.name}<span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {majors.map(item => {
                            return (<li
                                        ref={item.id}
                                        key={item.id}
                                        onClick={() => this.onSelectionChange(item)}
                                    ><a>{item.name}</a></li>)
                        })}
                    </ul>
                </div>
                <div className="empty"></div>
                <div className="search input-group">
                  <input ref="searchInput" onKeyDown={this.handleKeyDown} type="text" className="form-control" placeholder="搜索" />
                  <span className="input-group-addon">
                    <span onClick={this.handleSearchClick} className="iconfont icon-search"></span>
                    </span>
                </div>

            </div>
        );
    }

    onSelectionChange(major)
    {
        if (this.props.isSearched || this.props.selectedMajor !== major)
        {
            this.props.onMajorSelect(major);
        }
    }

    handleSearchClick()
    {
        const key = this.input.value;
        if (key !== "")
        {
            this.props.onSearch(key);
        }
    }

    handleKeyDown(e)
    {
        const key = this.input.value;
        if (e.keyCode === 13)
        {
            if (key !== "")
            {
                this.props.onSearch(key);
            }
        }

    }


}
