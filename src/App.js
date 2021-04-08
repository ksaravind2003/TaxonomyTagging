import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Multiselect } from "multiselect-react-dropdown";
import './MockData'
import { Audiences, AudiencesDescription, ContentType, ContentTypedescription, Industries, IndustriesDescription, Locations, LocationsDescription, Needs, NeedsDescription, Products, ProductsDescription, Services, ServicesDescription, TI, TItypeDescription, Topics, TopicsDescription, _Audiences, _contentType, _Industries, _Locations, _Needs, _Products, _Services, _TI, _Topics } from './MockData';

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

      Industries: [],
      SelectedIndustries: [],

      Products: [],
      SelectedProducts: [],

      Services: [],
      SelectedServices: [],

      Topics: [],
      SelectedTopics: [],

      linkListContent: ""
    }
  }

  componentDidMount() {
    this.setState({
      ContentType: _contentType, TI: _TI,
      Locations: _Locations, Audiences: _Audiences, Needs: _Needs,
      Industries: _Industries, Products: _Products, Services: _Services, Topics: _Topics
    });
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

  GenerateMultiListContent(sourceData, sourceContent, label) {
    if (sourceData.length !== 0) {
      let sourceValue = sourceData.map(i => i.Item).join(',');

      if (sourceContent) {
        return `${sourceContent}; ${label}/${sourceValue}`
      }
      else {
        return `${label}/${sourceValue}`
      }
    }
    return sourceContent
  }

  GetSelectedItems = (event) => {
    event.preventDefault();

    let tempLinkListContent = "";
    tempLinkListContent = this.GenerateListContent(this.state.SelectedContentType, tempLinkListContent, ContentType);
    tempLinkListContent = this.GenerateListContent(this.state.SelectedTI, tempLinkListContent, TI);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedLocations, tempLinkListContent, Locations);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedAudiences, tempLinkListContent, Audiences);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedNeeds, tempLinkListContent, Needs);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedIndustries, tempLinkListContent, Industries);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedProducts, tempLinkListContent, Products);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedServices, tempLinkListContent, Services);
    tempLinkListContent = this.GenerateMultiListContent(this.state.SelectedTopics, tempLinkListContent, Topics);

    this.setState({ linkListContent: tempLinkListContent });
  }

  render() {
    return (
      <div className="container">
        <form>

          <div className="form-group">
            <h1>
            Content tagging tool
            </h1>
            <p>Centralize taxonomy information and updates so marketers and publishers always have access to the complete list of JLL.com tags available to them when submitting Workfront requests or building content.</p>
          </div>

          <br></br>

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

          <div className="form-group required">
            <label className="control-label" htmlFor="Audiencestype">Audiences type</label>
            <Multiselect id="Audiencestype" className='form-control' aria-describedby="AudiencestypeHelp"
              options={this.state.Audiences}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedAudiences: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedAudiences: selectedList })}
            />
            <small id="AudiencestypeHelp" className="form-text text-muted">{AudiencesDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Needstype">Needs & Subneeds type</label>
            <Multiselect id="Needstype" className='form-control' aria-describedby="NeedstypeHelp"
              options={this.state.Needs}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedNeeds: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedNeeds: selectedList })}
            />
            <small id="NeedstypeHelp" className="form-text text-muted">{NeedsDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Industriestype">Industries type</label>
            <Multiselect id="Industriestype" className='form-control' aria-describedby="IndustriestypeHelp"
              options={this.state.Industries}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedIndustries: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedIndustries: selectedList })}
            />
            <small id="IndustriestypeHelp" className="form-text text-muted">{IndustriesDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Productstype">Products type</label>
            <Multiselect id="Productstype" className='form-control' aria-describedby="ProductstypeHelp"
              options={this.state.Products}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedProducts: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedProducts: selectedList })}
            />
            <small id="ProductstypeHelp" className="form-text text-muted">{ProductsDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Servicestype">Services type</label>
            <Multiselect id="Servicestype" className='form-control' aria-describedby="ServicestypeHelp"
              options={this.state.Services}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedServices: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedServices: selectedList })}
            />
            <small id="ServicestypeHelp" className="form-text text-muted">{ServicesDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Industriestype">Topics type</label>
            <Multiselect id="Topicstype" className='form-control' aria-describedby="TopicstypeHelp"
              options={this.state.Topics}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedTopics: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedTopics: selectedList })}
            />
            <small id="TopicstypeHelp" className="form-text text-muted">{TopicsDescription}</small>
          </div>

          <button className="btn btn-primary" onClick={e => this.GetSelectedItems(e)} type="submit">Generate link list</button>
          <button className="btn btn-primary" onClick={ () => console.log("Reset")} type="submit">Reset</button>

          <div class="form-group" style={{ paddingTop: "20px" }}>
            <label htmlFor="linkListContent">Generated Link List</label>
            <textarea className="form-control" id="linkListContent" value={this.state.linkListContent} readOnly></textarea>
          </div>

        </form>
      </div>
    );
  }
}

export default App;
