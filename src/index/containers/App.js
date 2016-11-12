import React, { Component } from 'react';
import FormatUtil from "../../base/util/FormatUtil";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.entry = this.entry.bind(this);
        this.entryMebox = this.entryMebox.bind(this);
        this.handleCarouselClick = this.handleCarouselClick.bind(this);
        this.handleScrollbarUpdate = this.handleScrollbarUpdate.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        position: 1
    }

    componentDidMount()
    {
        const isPc = FormatUtil.isPC();
        if (!isPc)
        {
            $("#root").css("display", "inline-block");
            $("#root").css("width", "auto");
            $(this.refs["carousel"]).css("display", "none");
        }

        const restDays = this.refs["restDays"];
        restDays.textContent = _calculateRestDays();

        this.body = document.body;
        this.refs["1"].classList.add("active");
        window.onscroll = this.handleScrollbarUpdate;
    }

    componentDidUpdate()
    {
        this.refs[this.state.position].classList.add("active");
    }

    handleScrollbarUpdate()
    {
        const scrollTop = this.body.scrollTop;
        const position = _calculatePosition(scrollTop);
        if (this.state.position !== position)
        {
            this.refs[this.state.position].classList.remove("active");
            this.setState({
                position
            });
        }
    }

    entry()
    {
        location.href = "/home.html";
    }

    entryMebox()
    {
        location.href = "http://mebox.top/";
    }

    handleCarouselClick(key)
    {
        this.refs[this.state.position].classList.remove("active");
        this.setState({
            position: key
        });
        $(this.body).animate({ scrollTop: _calculateScrollTop(key) }, 600);
    }



    render()
    {
        return (
            <div ref="container" className="cp-app-index">
                <ul ref="carousel" className="carousel-controls">
                    <li ref="1" onClick={() => this.handleCarouselClick(1)}><span></span></li>
                    <li ref="2" onClick={() => this.handleCarouselClick(2)}><span></span></li>
                    <li ref="3" onClick={() => this.handleCarouselClick(3)}><span></span></li>
                    <li ref="4" onClick={() => this.handleCarouselClick(4)}><span></span></li>
                    <li ref="5" onClick={() => this.handleCarouselClick(5)}><span></span></li>
                    <li ref="6" onClick={() => this.handleCarouselClick(6)}><span></span></li>
                    <li ref="7" onClick={() => this.handleCarouselClick(7)}><span></span></li>
                </ul>
                <div className="section first">
                    <div className="mebox">
                        <img src="/imgs/mebox.png"></img>
                    </div>
                    <div className="title">
                        <div className="logo">
                            <img src="/imgs/course-logo-v.png"></img>
                        </div>
                        <div className="slogen">
                            最后<span ref="restDays" className="days">50</span>天让考研更容易
                        </div>
                    </div>
                    <div className="entrys">
                        <div onClick={this.entry} className="entry course">
                            <span>进入course+</span>
                        </div>
                        <div onClick={this.entryMebox} className="entry mebox">
                            <span>进入米盒</span>
                        </div>
                    </div>
                </div>
                <div id="second" className="section second">
                    <div className="top-bar">
                        <span className="text">南京大学本校考研大神零距离定制辅导＋经验传授</span>
                        <span className="text">免费备考心理辅导</span>
                        <span className="text">首节课不满意，无条件全额退款</span>
                    </div>
                    <div className="middle-line"></div>
                    <div className="bottom-bar">
                        <div className="box">
                            <img src="/imgs/huo.png" />
                            <span className="name">火先生</span>
                            <span className="department">建筑与城市规划学院</span>
                            <span className="intro">城市规划专硕第一</span>
                        </div>
                        <div className="box">
                            <img src="/imgs/li.png" />
                            <span className="name">李学长</span>
                            <span className="department">政府管理学院</span>
                            <span className="intro">社会保障专业第一</span>
                        </div>
                        <div className="box">
                            <img src="/imgs/ran.png" />
                            <span className="name">然学姐</span>
                            <span className="department">社会学院</span>
                            <span className="intro">社会工作专业第一</span>
                        </div>
                        <div className="box">
                            <img src="/imgs/hu.png" />
                            <span className="name">胡学姐</span>
                            <span className="department">新闻传播学院</span>
                            <span className="intro">新闻学专业第一</span>
                        </div>
                    </div>
                </div>
                <div className="section third">
                    <div className="third-bg">
                        <img className="bar" src="/imgs/third-bar.png"></img>
                        <div className="title">
                            <img src="/imgs/course-logo-h.png" />
                            <span className="text">让你获得这些：</span>
                        </div>
                        <div className="content">
                            <div className="one item">
                                <img src="/imgs/one.png"></img>
                                <div className="item-text">南大历年
                                    <span className="yellow">考研真题</span>
                                    详解、更准确地把握出题趋势
                                </div>
                            </div>
                            <div className="two item">
                                <img src="/imgs/two.png"></img>
                                <div className="item-text">全程由南京大学考研大神辅导分享
                                    <span className="yellow">独家考研秘籍</span>
                                </div>
                            </div>
                            <div className="three item">
                                <img src="/imgs/three.png"></img>
                                <div className="item-text">熟悉南大考研专业课出题老师风格，轻松抓住
                                    <span className="yellow">知识重点</span>
                                </div>
                            </div>
                            <div className="four item">
                                <img src="/imgs/four.png"></img>
                                <div className="item-text">定制型课程，根据你的备考情况进行
                                    <span className="yellow">一对一辅导</span>
                                    提升，更适合现阶段冲刺
                                </div>
                            </div>
                            <div className="five item">
                                <img src="/imgs/five.png"></img>
                                <div className="item-text">
                                    更多学习时间，采用线上教学，不受地点限制，节省上课路程时间
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section fourth">
                    <div className="title">
                        <img className="book" src="/imgs/book.png" />
                        <img className="grey-logo" src="/imgs/grey-logo.png" />
                        <div className="text">课程内容包括：</div>
                    </div>
                    <div className="content">
                        <div className="ebook box">
                            <img src="/imgs/ebook.png" />
                            <div className="text1">
                                独家真题答案解析
                            </div>
                            <div className="text2">
                                电子版
                            </div>
                        </div>
                        <div className="voice box">
                            <img src="/imgs/voice.png" />
                            <div className="text">
                                线上语音课程
                            </div>
                        </div>
                        <div className="answer box">
                            <img src="/imgs/answer.png" />
                            <div className="text">
                                在线答疑
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section fifth">
                    <div className="title">
                        <img src="/imgs/course-logo-h.png" />
                        <span className="text">都有哪些大神：</span>
                    </div>
                    <div className="content">
                        <div className="box" style={{marginTop:'102px'}}>
                            <img src="/imgs/jessie.png" />
                            <span className="name">Jessie</span>
                            <span className="intro">
                                南京大学企业管理专业研一 专业课119<br/>
                                <br/>
                                曾任教多家考研机构VIF一对一辅导<br/>
                                熟悉研究多年专业考研真题，结合自身考研实战经验，
                                对管理学框架进行适应考试的搭建及运用
                            </span>
                            <span className="catalog">教学大纲</span>
                            <div className="list">
                                <span>一 历年真题分析</span>
                                <span>二 高频考点分析</span>
                                <span>三 教材及重点整理</span>
                                <span>四 冲刺期间备考策略</span>
                                <span>五 应试答题技巧</span>
                            </div>
                        </div>
                        <div className="box">
                            <img src="/imgs/ligangsheng.png" />
                            <span className="name">李港生</span>
                            <span className="intro">
                                南京大学行政管理专业研一 政治学原理121 行政管理学104<br/>
                                <br/>
                                曾任教知名考研机构VIP一对一辅导<br/>
                                密切关注学科前沿热点、南京大学政管老师研究动态，准确把握命题风格和趋势
                            </span>
                            <span className="catalog">教学大纲</span>
                            <div className="list">
                                <span>一 历年真题分析</span>
                                <span>二 教材及重点整理</span>
                                <span>三 应试答题阶段梳理</span>
                            </div>
                        </div>
                        <div className="box" style={{marginTop:'64px'}}>
                            <img src="/imgs/yang.png" />
                            <span className="name">杨亚男</span>
                            <span className="intro">
                                南京大学法律硕士（非法学）专业研一 专业基础课 127 专业综合课 130<br/>
                                <br/>
                                考研经验分享曾被法硕联盟论坛精选推送<br/>
                                研究历年真题、南大老师讲课音频，准确把握命题风格及重点
                            </span>
                            <span className="catalog">教学大纲</span>
                            <div className="list">
                                <span>一 历年真题分析</span>
                                <span>二 教材及重点整理</span>
                                <span>三 冲刺备考策略</span>
                                <span>四 应试答题技巧</span>
                            </div>
                        </div>
                        <div className="box" style={{marginTop:'85px'}}>
                            <img src="/imgs/jia.png" />
                            <span className="name">贾宝玉</span>
                            <span className="intro">
                                南京大学有机化学专业研一 有机化学123 仪器分析103<br/>
                                <br/>
                                研究近十年真题，熟悉出题老师偏好，熟知命题规律及重点<br/>
                                曾接受南大老师专门考研辅导，传授众多实用答题技巧
                            </span>
                            <span className="catalog">教学大纲</span>
                            <div className="list">
                                <span>一 历年真题分析</span>
                                <span>二 教材及重点整理</span>
                                <span>三 冲刺备考策略</span>
                                <span>四 应试答题技巧</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section sixth">
                    <div className="title">
                        <img src="/imgs/course-logo-h.png" />
                        <span className="text">覆盖哪些专业：</span>
                    </div>
                    <div className="content">
                        <div className="counts">
                            <div className="departments">
                                <span className="yellow">20+</span>个院系
                            </div>
                            <div className="courses">
                                <span className="yellow">40+</span>门专业课
                            </div>
                        </div>
                        <div className="imgs">
                            <img className="origin" src="/imgs/cloud.png" />
                            <img className="opa" src="/imgs/cloud.png" />
                        </div>
                    </div>
                </div>
                <div className="section seventh">
                    <div className="title">
                        <img src="/imgs/course-logo-h.png" />
                        <span className="text yellow">超值赠送！！！</span>
                    </div>
                    <div className="content">
                        <div className="box">
                            <img src="/imgs/ganhuo.png" />
                            <div className="name">超实用干货</div>
                            <span className="text">覆盖众多专业课教师</span>
                            <span className="text">教学重点</span>
                            <span className="text">由南大各专业13级本科</span>
                            <span className="text">生整理而成</span>
                        </div>
                        <div className="box" style={{marginTop:'0px'}}>
                            <img src="/imgs/health.png" />
                            <div className="name">健康备考</div>
                            <span className="text">最接地气的备考心理辅导</span>
                        </div>
                        <div className="box" style={{marginTop:'27px'}}>
                            <img src="/imgs/vip.png" />
                            <div className="name">米盒VIP账号</div>
                            <span className="text">三个月免费享受米盒</span>
                            <span className="text">全平台资料</span>
                        </div>
                    </div>
                </div>
                <div className="section eighth">
                    <div onClick={this.entry} className="entry course">
                        <span>进入course+</span>
                    </div>
                    <div onClick={this.entryMebox} className="entry mebox">
                        <span>进入米盒</span>
                    </div>
                </div>
                <div className="section nighth">
                    <div className="footer-content">
                        <div className="copyright">Copyright © 2016 一可米互联网科技公司</div>
                        <a href="http://www.miibeian.gov.cn/" target="_blank"> 苏ICP备15062280号</a>
                        <div className="qq">客服QQ:3542317181</div>
                    </div>
                </div>
            </div>
        );
    }
}

function _calculateScrollTop(key)
{
    switch (key) {
        case 1:
            return 0;
        case 2:
            return 725;
        case 3:
            return 1409;
        case 4:
            return 2129;
        case 5:
            return 2729;
        case 6:
            return 3769;
        case 7:
            return 4489;
        default:
            break;
    }
}

function _calculateRestDays()
{
    const curDate = new Date();
    const targetDate = new Date("2016-12-24 00:00:00");
    const date = 1482508800000 - curDate.getTime();

    const days = Math.floor(date / (24 * 3600 * 1000));
    return days;
}

function _calculatePosition(value)
{
    if (value >= 0 && value < 725)
    {
        return 1;
    }
    else if (value >= 725 && value < 1409)
    {
        return 2;
    }
    else if (value >= 1409 && value < 2129)
    {
        return 3;
    }
    else if (value >= 2129 && value < 2729)
    {
        return 4;
    }
    else if (value >= 2729 && value < 3769)
    {
        return 5;
    }
    else if (value >= 3769 && value < 4489)
    {
        return 6;
    }
    else
    {
        return 7;
    }
}
