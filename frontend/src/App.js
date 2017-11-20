import React, { Component } from 'react'
import RegionMap from './RegionMap'
import { Button, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  
   constructor(props) {
        super(props);
        this.state = {
          speciality: '',
          regionId: 0,
          query: ""
        }
    }
  
  getRegion = (region) => {
    this.setState((state) => ({
        ...state, regionId: region
    }))
  }
  
  getSpec = (e) => {
    const spec = e.target.value
    this.setState((state) => ({
      ...state, speciality: spec
    }))
  }
  
  propagate = (e) => {
    this.setState((state) => ({
      ...state, query: this.state.speciality
    }))
  }
  
  render() {
    return (
      <div className='app'>
      <div className="main-top">
        <div className="flex-item ui huge icon input">
          <Input className='search-input' type="text" placeholder='Введите специальность...' onChange={this.getSpec} value={this.state.speciality} />
              <i className="search icon"></i>
        </div>
        <Button className="flex-item ui huge icon" onClick= {this.propagate}> Search </Button>
      </div>  
      <div className='map-inside'>
        <RegionMap retRegion={this.getRegion} text={this.state.query} region={this.state.regionId}/>
      </div>
      </div>
    );
  }
}

export default App;
