import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Multiselect } from "multiselect-react-dropdown";
import './MockData'
import { ContentType, ContentTypedescription, Locations, LocationsDescription, TI, TItypeDescription, _contentType, _Locations, _TI } from './MockData';

class App extends Component {

  constructor() {
    super();
    this.multiselectRef = React.createRef();
    this.state = {
      ContentType: [],
      SelectedContentType: [],

      TI: [],
      SelectedTI: [],

      Locations: [],
      SelectedLocations: [],

      Audiences: [],
      SelectedAudiences: [],

      Needs: [],
      SelectedNeeds: [],

      linkListContent: ""
    }
  }

  componentDidMount() {
    this.setState({ ContentType: _contentType , TI: _TI, Locations: _Locations});
  }

  GenerateListContent(sourceData, sourceContent, label) {
    if (sourceData.length !== 0) {
      if (sourceContent) {
        return `${sourceContent}; ${label}/${sourceData[0].Item}`
      }
      else {
        return `${label}/${sourceData[0].Item}`
      }
    }
    return sourceContent
  }

  GetSelectedItems = (event) => {
    event.preventDefault();

    let tempLinkListContent = "";
    tempLinkListContent = this.GenerateListContent(this.state.SelectedContentType, tempLinkListContent, ContentType);
    tempLinkListContent = this.GenerateListContent(this.state.SelectedTI, tempLinkListContent, TI);
    tempLinkListContent = this.GenerateListContent(this.state.SelectedLocations, tempLinkListContent, Locations);
    
    this.setState({ linkListContent: tempLinkListContent });
  }

  render() {
    return (
      <div className="container">
        <form>

          <div className="form-group">
            <h1>
              UTM Builder
            </h1>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="contentType">Content type</label>
            <Multiselect id="contentType" className='form-control' aria-describedby="contentTypeHelp"
              singleSelect
              options={this.state.ContentType}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedContentType: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedContentType: selectedList })}
            />
            <small id="contentTypeHelp" className="form-text text-muted">{ContentTypedescription}</small>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="T&Itype">T&I type</label>
            <Multiselect id="T&Itype" className='form-control' aria-describedby="T&ItypeHelp"
              singleSelect
              options={this.state.TI}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedTI: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedTI: selectedList })}
            />
            <small id="T&ItypeHelp" className="form-text text-muted">{TItypeDescription}</small>            
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Locationstype">Locations type</label>
            <Multiselect id="Locationstype" className='form-control' aria-describedby="LocationstypeHelp"              
              options={this.state.Locations}
              displayValue="Item"
              groupBy="Category"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedLocations: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedLocations: selectedList })}
            />
            <small id="LocationstypeHelp" className="form-text text-muted">{LocationsDescription}</small>            
          </div>

          <button className="btn btn-primary" onClick={e => this.GetSelectedItems(e)} type="submit"> Submit </button>
          
          <div class="form-group" style={{paddingTop:"20px"}}>
            <label htmlFor="linkListContent">Generated Link List</label>
            <textarea className="form-control" id="linkListContent" value={this.state.linkListContent} readOnly></textarea>
          </div>

        </form>
      </div>
    );
  }
}

export default App;
