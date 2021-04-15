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

      linkListContent: "",
      valid: true
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
    event.target.className += " was-validated";

    if (this.state.SelectedContentType.length == 0
      || this.state.SelectedLocations.length == 0
      || this.state.SelectedAudiences.length == 0
      || this.state.SelectedNeeds.length == 0
      || this.state.SelectedServices.length == 0) {
      this.state.valid = false;
    }

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
        <form className="needs-validation" noValidate>

          <div className="form-group">
            <h1>
              Content tagging tool
            </h1>
            <br></br>
            <p>Use this tool to compile a list of all the AEM tags you want to add to a new page on JLL.com.</p>
            <ul>
              <li>	Select the tags you want to add to your content in each of the categories below. Required categories are marked with an asterisk. To learn more about what different categories mean and how to use their tags, check out the tag definitions document.</li>
              <li>	When you're finished, click "Generate link list" to get your list of tags, formatted:
              Category name/Tag name, Tag name…
For categories with multiple tags selected, each tag name will appear in a comma string after the category name. Categories are separated by a semicolon.</li>
              <li>	Copy/paste your generated link list into your Workfront request or content template worksheet.</li>
            </ul>
          </div>

          <br></br>

          <div className="form-group required">
            <label className="control-label" htmlFor="contentType">Content type</label>
            <Multiselect id="contentType" className='form-control' aria-describedby="contentTypeHelp"
              singleSelect
              options={this.state.ContentType}
              avoidHighlightFirstOption="true"
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedContentType: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedContentType: selectedList })}
            />
            <small id="contentTypeHelp" className="form-text text-muted">{ContentTypedescription}</small>
            <div className="invalid-feedback">
              Please select a content type.
              </div>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="T&Itype">T&I type</label>
            <Multiselect id="T&Itype" className='form-control' aria-describedby="T&ItypeHelp"
              singleSelect
              avoidHighlightFirstOption="true"
              options={this.state.TI}
              displayValue="Item"
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedTI: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedTI: selectedList })}
            />
            <small id="T&ItypeHelp" className="form-text text-muted">{TItypeDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Locationstype">Locations</label>
            <Multiselect id="Locationstype" className='form-control' aria-describedby="LocationstypeHelp"
              options={this.state.Locations}
              displayValue="Item"
              groupBy="Category"
              closeOnSelect={false}
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedLocations: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedLocations: selectedList })}
            />
            <small id="LocationstypeHelp" className="form-text text-muted">{LocationsDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Audiencestype">Audiences</label>
            <Multiselect id="Audiencestype" className='form-control' aria-describedby="AudiencestypeHelp"
              options={this.state.Audiences}
              displayValue="Item"
              showCheckbox={true}
              closeOnSelect={false}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedAudiences: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedAudiences: selectedList })}
            />
            <small id="AudiencestypeHelp" className="form-text text-muted">{AudiencesDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Needstype">Needs & Subneeds</label>
            <Multiselect id="Needstype" className='form-control' aria-describedby="NeedstypeHelp"
              options={this.state.Needs}
              displayValue="Item"
              groupBy="Category"
              closeOnSelect={false}
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedNeeds: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedNeeds: selectedList })}
            />
            <small id="NeedstypeHelp" className="form-text text-muted">{NeedsDescription}</small>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="Industriestype">Industries</label>
            <Multiselect id="Industriestype" className='form-control' aria-describedby="IndustriestypeHelp"
              options={this.state.Industries}
              displayValue="Item"
              closeOnSelect={false}
              showCheckbox={true}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedIndustries: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedIndustries: selectedList })}
            />
            <small id="IndustriestypeHelp" className="form-text text-muted">{IndustriesDescription}</small>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="Productstype">Products</label>
            <Multiselect id="Productstype" className='form-control' aria-describedby="ProductstypeHelp"
              options={this.state.Products}
              displayValue="Item"
              showCheckbox={true}
              selectionLimit="5"
              closeOnSelect={false}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedProducts: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedProducts: selectedList })}
            />
            <small id="ProductstypeHelp" className="form-text text-muted">{ProductsDescription}</small>
          </div>

          <div className="form-group required">
            <label className="control-label" htmlFor="Servicestype">Services</label>
            <Multiselect id="Servicestype" className='form-control' aria-describedby="ServicestypeHelp"
              options={this.state.Services}
              displayValue="Item"
              showCheckbox={true}
              selectionLimit="5"
              closeOnSelect={false}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedServices: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedServices: selectedList })}
            />
            <small id="ServicestypeHelp" className="form-text text-muted">{ServicesDescription}</small>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="Industriestype">Topics</label>
            <Multiselect id="Topicstype" className='form-control' aria-describedby="TopicstypeHelp"
              options={this.state.Topics}
              displayValue="Item"
              showCheckbox={true}
              selectionLimit="5"
              closeOnSelect={false}
              onSelect={(selectedList, selectedItem) => this.setState({ SelectedTopics: selectedList })}
              onRemove={(selectedList, selectedItem) => this.setState({ SelectedTopics: selectedList })}
            />
            <small id="TopicstypeHelp" className="form-text text-muted">{TopicsDescription}</small>
          </div>


          <button className="btn btn-primary" onClick={e => this.GetSelectedItems(e)} type="submit">Generate link list</button>
          <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => console.log("Reset")} type="submit">Reset</button>

          {this.state.valid ? "" : <div className="alert alert-danger" role="alert" style={{ marginTop: "15px" }}> Please fill all required fields </div>}

          <div className="form-group" style={{ paddingTop: "20px" }}>
            <label htmlFor="linkListContent">Generated Link List</label>
            <textarea className="form-control" id="linkListContent" value={this.state.linkListContent} readOnly></textarea>
          </div>

        </form>
      </div>
    );
  }
}

export default App;
