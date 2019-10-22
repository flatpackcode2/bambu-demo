import React from 'react';
import axios from 'axios';
import {
    Container, Button, InputGroup, Label, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import infinityLoader from './images/infinityLoader.gif';
import PlacesWithStandaloneSearchBox from './components/PlacesWithStandaloneSearchBox' //autocomplete location search from Google

class JobFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            jobList: null,
            isLoading: false
        }
    }

    liftMyLocationUp = (location) => {
        this.setState({ location: location })
    }

    handleChange = event => {
        this.setState({ location: event.target.value })
    }

    getJobs = () => {
        this.setState({ isLoading: true })
        axios.get(`https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=${process.env.REACT_APP_API_KEY}&format=json&location=${this.state.location}&method=aj.jobs.search&perpage=20&page=1`)
            .then(res => {
                this.setState({ jobList: res, isLoading: false })
                console.log(this.state.jobList)
            }).catch(err => {
                console.log(err)
            })
    }

    DataDisplay = data => {
        return (<p>
            ${data}
        </p>)
    }

    render() {
        const { isLoading, jobList } = this.state
        let listing = jobList ? jobList.data.listings.listing : null;
        return (
            <>
                <Container>
                <h1>Search For A Job Here!</h1>
                    <InputGroup>
                        <Label className="d-inline-block" style={{ lineHeight: '2.2rem' }}>Location:&nbsp;</Label>
                        <PlacesWithStandaloneSearchBox liftMyLocationUp={this.liftMyLocationUp} />
                        <Button color="primary" onClick={this.getJobs}>Press me!</Button>
                    </InputGroup>
                    {isLoading ? <img src={infinityLoader} alt='Loading results...' /> : listing !== null ? listing.length > 0 ? listing.map(el => {
                        return (
                            <div>
                                <Card className="m-2">
                                    <CardBody>
                                        <CardTitle className="font-weight-bold text-primary">{el.title}</CardTitle>
                                        <CardSubtitle className="text-secondary">{el.company.name}</CardSubtitle>
                                        <CardText style={{ height: '100px', overflow: 'hidden' }}>{el.description.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').replace(/&nbsp;/gi, ' ').replace(/&rsquo;/gi, '\'')}</CardText>
                                        <a className="btn btn-primary" href={el.apply_url} target="_blank">Apply now</a>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })
                        :
                        <h4>There are no jobs to display</h4> : null}
                </Container>
            </>

        )
    }
}

export default JobFeed