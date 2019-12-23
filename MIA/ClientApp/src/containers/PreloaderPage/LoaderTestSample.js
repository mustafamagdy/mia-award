import React, { Component } from 'react';
import { Trans } from '@lingui/macro';
import Loader from '../../../components/Loaders/Loader';

class LoaderTestSample extends Component {
    state={
        loading: true,
        status: true
    }

    componentDidMount() {
        // setTimeout( () => this.fetchData()
        setTimeout( () => this.terminateLoader()
        ,3000)
    }

    fetchData = () => {
        this.setState({
            loading: false
        })
        
    }

    terminateLoader = () => {
        this.setState({
            status: false
        })
        
    }

    render(){
        const { loading, status } = this.state;
        return(<>
            <div className="container _text-center">
                <Loader terminate={status} />
                {/* { loading ? <Loader /> : null } */}
                <button type="button" className="button js-preload-btn">
                    <span className="button__text"><Trans id="submit"> Submit </Trans> </span>
                </button>
            </div>
            </>
         )
    }
}

export default LoaderTestSample;