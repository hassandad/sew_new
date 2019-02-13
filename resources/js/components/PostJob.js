import React from 'react'
import { Link } from 'react-router-dom'

class PostJob extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        title: '',
        type: '',
        subject: '',
        details: '',
        minPages: 1,
        pageSize: 'single_space',
        totalWords: 0,
        typeOfService: '',
        academicLevel: '',
        formattingStyle: '',
        deadline: new Date(),
        price: 1,
        attachments: [],
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleMinPages = this.handleMinPages.bind(this);
    this.handlePageSize = this.handlePageSize.bind(this);
    this.handleTotalWords = this.handleTotalWords.bind(this);
    this.handleTotalWordsValue = this.handleTotalWordsValue.bind(this);
    this.handleTypeOfService = this.handleTypeOfService.bind(this);
    this.handleAcademicLevel = this.handleAcademicLevel.bind(this);
    this.handleFormattingStyle = this.handleFormattingStyle.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleAttachments = this.handleAttachments.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillMount(){
    axios.get('/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    }); 
  }
  
  componentDidMount(){
    this.mounted = true;
  }
  
  handleTitle(event){
    this.setState({
        title: event.target.value
    });
  }
  
  handleType(event){
    this.setState({
        type: event.target.value
    });
  }
  
  handleSubject(event){
    this.setState({
        subject: event.target.value
    });
  }
  
  handleDetails(event){
    this.setState({
        details: event.target.value
    });
  }
  
  handleMinPages(event){
    this.setState({
        minPages: event.target.value
    });
    //this.handleTotalWordsValue();
  }
  
  handlePageSize(event){
    this.setState({
        pageSize: event.target.value
    });
    //this.handleTotalWordsValue();
  }
  
  handleTotalWords(event){
    
    this.setState({
        totalWords: event.target.value
    });
    
    //this.handleTotalWordsValue();
    
  }
  
  handleTotalWordsValue(){
    
    if(this.state.pageSize !== 'other'){
      const multiplyWith = this.state.pageSize === 'single_space' ? 550 : 275;
      this.setState({
        totalWords: this.state.minPages * multiplyWith
      });
    }
  }
  
  handleTypeOfService(event){
    this.setState({
        typeOfService: event.target.value
    });
  }
  
  handleAcademicLevel(event){
    this.setState({
        academicLevel: event.target.value
    });
  }
  
  handleFormattingStyle(event){
    this.setState({
        formattingStyle: event.target.value
    });
  }
  
  handleDeadline(event){
    this.setState({
        deadline: event.target.value
    });
  }
  
  handlePrice(event){
    this.setState({
        price: event.target.value
    });
  }
  
  handleAttachments(event){
    this.setState({
        attachments: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();

    const formValues = {
        title: this.state.title,
        type: this.state.type,
        subject: this.state.subject,
        details: this.state.details,
        minPages: this.state.minPages,
        pageSize: this.state.pageSize,
        totalWords: this.state.totalWords,
        typeOfService: this.state.typeOfService,
        academicLevel: this.state.academicLevel,
        formattingStyle: this.state.formattingStyle,
        deadline: this.state.deadline,
        price: this.state.price,
        attachments: this.state.attachments
    };

    let self = this;
    // Submit form values to ajax api
    this.setState({
      inSubmitState:true
    });

  axios.post('/api/register', formValues)
    .then(function (response) {
      return self.props.history.push('/login');
    })
    .catch(function (error) {
      console.log(error);

      if(error.hasOwnProperty('response')){
        console.log(error.response.data.errors);
        self.setState({
          formErrors:error.response.data.errors
        });
      }
    }).then(function(){
      if(self.mounted){
        self.setState({
          inSubmitState:false
        });
      }
    });
  }
  
  componentWillUnmount(){
    this.mounted = false;
  }
    
  render(){
    let totalWords = this.state.totalWords;
    if(this.state.pageSize !== 'other'){
      const multiplyWith = this.state.pageSize === 'single_space' ? 550 : 275;
      totalWords = this.state.minPages * multiplyWith;
    }
    
    return(
      <main role="main" className="container main-body-container">
        <div className="card shadow rounded-0">
          <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
            <h1 className="card-header">Post a job</h1>
            <div className="card-body">
              <div className="col-sm-8">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title pb-2 border-bottom">Provide Main details of Assignment</h3>
                      <div className="form-group">
                        <label htmlFor="title">Assignment title</label>
                        <input onChange={this.handleTitle} type="text" className="form-control" id="title" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="type">Assignment type</label>
                        <select onChange={this.handleType} className="custom-select" id="type">
                          <option>Case study</option>
                          <option>Code</option>
                          <option>Lab report</option>
                          <option>Math assignment</option>
                          <option>Non-word assignmnet</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <select onChange={this.handleSubject} className="custom-select" id="subject">
                          <option>Case study</option>
                          <option>Code</option>
                          <option>Lab report</option>
                          <option>Math assignment</option>
                          <option>Non-word assignmnet</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="details">Details</label>
                        <textarea onChange={this.handleDetails} className="form-control" id="details" rows="3"></textarea>
                      </div>
                  </div>
                </div>

                <div className="card shadow-sm mt-2">
                  <div className="card-body">
                    <h3 className="card-title pb-2 border-bottom">Provide extra details about assignment</h3>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="minPages">Min pages</label>
                        <input onChange={this.handleMinPages} type="number" className="form-control" id="minPages" min="1" />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="pageSize">Page size</label>
                        <select onChange={this.handlePageSize} className="custom-select" id="pageSize">
                          <option value="single_space">Singel space</option>
                          <option value="double_space">Double space</option>
                          <option value="other">other</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="totalWords">Total Words</label>
                        <input onChange={this.handleTotalWords} type="number" value={totalWords} className="form-control" id="totalWords" min="1" readOnly={this.state.pageSize != 'other'} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="typeOfService">Type of Service</label>
                        <select onChange={this.handleTypeOfService} className="custom-select" id="typeOfService">
                          <option>Custom writing</option>
                          <option>Editing</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="academicLevel">Acedemic level</label>
                        <select onChange={this.handleAcademicLevel} className="custom-select" id="academicLevel">
                          <option>MiddleSchool</option>
                          <option>High School</option>
                          <option>Undergraduate/Bachlor</option>
                          <option>Masters</option>
                          <option>Phd</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="formattingStyle">Formatiing Style</label>
                        <select onChange={this.handleFormattingStyle} className="custom-select" id="formattingStyle">
                          <option>AMA</option>
                          <option>APA</option>
                          <option>ASA</option>
                          <option>CBE</option>
                          <option>MLA</option>
                          <option>Chicago/Turabin</option>
                          <option>Oxford</option>
                          <option>McGill Guide</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="deadline">Deadline</label>
                        <input onChange={this.handleDeadline} type="date" className="form-control" id="deadline" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="price">Price</label>
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                          </div>
                          <input onChange={this.handlePrice} type="number" className="form-control" id="price" min="5" />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="attachments">Additional Files</label>
                        <div className="custom-file">
                          <input onChange={this.handleAttachements} type="file" className="custom-file-input" id="attachments" />
                          <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-2 text-center">
                  <button type="submit" className="btn btn-primary pl-4 pr-4">Post Job</button>
                </div>
              </div>
            </div>
            </form>
        </div>
      </main>
    )      
  }
}


export default PostJob