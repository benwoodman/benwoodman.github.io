class PortfolioHeaders extends React.Component {
    constructor (props) {
        super(props);
        this.state = {modalVisible: false, modalImageUrl: ''}
    }

    renderItems = () => {
        const items = [];
        for (let i = 0; i < this.props.projects.length; i++) {
            items.push(<PortfolioItem data={this.props.projects[i]} openModal={this.openModal}></PortfolioItem>)
        }
        return items;
    }

    openModal = (e) => {
        const clicked_image = e.target.style.backgroundImage;
        const parsed_url = clicked_image.substring(5, clicked_image.length - 2);
        this.setState({modalVisible: true, modalImageUrl: parsed_url});
    }

    closeModal = (e) => {
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <div>
                <div id="modal-outer" className={this.state.modalVisible ? '' : 'modal-hide'} onClick={this.closeModal}>
                    <div id="modal-inner">
                        <img src={this.state.modalImageUrl}></img>
                    </div>
                </div>
                <div id="typed-strings">
                <div>
                    <div><h1 class="pink typing">&lt;intro&gt;</h1></div>
                    <div><h1 class="bold indent-1">Here is a collection of my most recent projects. I'm very proud of each one, as I've learned an immense amount from each.</h1></div>
                    <div><h1 class="pink">&lt;/intro&gt;</h1></div>
                </div>
                {this.renderItems()}
            </div>
            </div>
            
        )
    }
}

class PortfolioItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, visibility: 'hidden'};
    }

    renderImages = () => {
        const images = [];
        for (let i = 0; i < this.props.data['images'].length; i++) {
            images.push(<div onClick={this.props.openModal} style={{backgroundImage: 'url(' + this.props.data['images'][i] + ')'}}></div>);
        }

        return images;
    }

    toggle = () => {
        this.setState({open: this.state.open ? false : true, visibility: 'show'});
    }

    render() {
        if (this.state.open) {
            return <OpenPortfolio data={this.props.data} toggle={this.toggle} openModal={this.props.openModal}></OpenPortfolio>
        } else {
            return <ClosedPortfolio data={this.props.data} toggle={this.toggle} visibility={this.state.visibility}></ClosedPortfolio>
        }
    }
}

class OpenPortfolio extends React.Component {
    renderImages = () => {
        const images = [];
        for (let i = 0; i < this.props.data['images'].length; i++) {
            images.push(<div onClick={this.props.openModal} style={{backgroundImage: 'url(' + this.props.data['images'][i] + ')'}}></div>);
        }

        return images;
    }
    render() {
        return (
            <div id={this.props.data['name']} className="portfolio-item show">
                <div><h1 class="pink">&lt;{this.props.data['name']} </h1><h1 style={{cursor: 'pointer'}} class="yellow bold" onClick={this.props.toggle}>close-project</h1><h1 class="pink">&gt;</h1></div>
                <div><h1 class="blue indent-1">&lt;description&gt;</h1></div>
                <div><h1 class="bold indent-2">{this.props.data['description']}</h1></div>
                <div><h1 class="blue indent-1">&lt;/description&gt;</h1></div>
                {/* <div><h1 class="blue indent-1">&lt;img&gt;</h1></div>
                <div class="images">
                    {this.renderImages()}
                </div>
                <div><h1 class="blue indent-1">&lt;/img&gt;</h1></div> */}
                    
                <a class="indent-1" href={this.props.data['link']} target="_blank">
                    <h1 class="blue">&lt;a</h1>
                    {
                        this.props.data['link'] === '' ? '' : <h1 class="yellow"> href={'"' + this.props.data['link'] + '"'}</h1>
                    }
                    <h1 class="blue">&gt;</h1>
                    <h1 class="green bold">{this.props.data['link_text']}</h1>
                    <h1 class="blue">&lt;a&gt;</h1>
                </a>
                <div><h1 class="pink">&lt;/{this.props.data['name']}&gt;</h1></div>
            </div>
        )
    }

    componentDidMount() {
        // startTyping(this.props.data['name'], 15, 2)
        // current_obj.classList.add('show');
    }
}

class ClosedPortfolio extends React.Component {
    render() {
        return(
            <div className={"portfolio-item " + this.props.visibility}>
                <div><h1 className="pink">&lt;{this.props.data['name']}&gt;</h1></div>
                <div style={{cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#A9DC76'}} class="indent-1" onClick={this.props.toggle}><h1 class="green bold">Click to learn more...</h1></div>
                <div><h1 className="pink">&lt;/{this.props.data['name']}&gt;</h1></div>
            </div>
        )
    }
}