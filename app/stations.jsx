import React from 'react';
import { Button, ControlLabel, FormGroup, FormControl, Table, ListGroup, ListGroupItem, Alert, ButtonToolbar } from 'react-bootstrap';


class StationsAlert extends React.Component {
  render() {
    return(<Alert >{this.props.text}</Alert>)
  }
}


export default class Stations extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      stations : this.props.route.resource,
      stationsList : [],
      newStation : {
        title : ''
      },
      
      submitDisabled : false,
      
      showAlert: false,
      alertStyle : 'warning',
      alertText : ''
    };
    
    this.update();
  }
  
  update() {
    this.state.stations.get().then(function(resp) {   
      if(resp.success) {
        this.setState({stationsList : resp.stations});
      }
      else {
        this.setState({stationsList : [] });
        console.log('Failed to update stations list');
      }
    }.bind(this));
  }
  
  submitNewStation() {
    console.log('New station ' + this.state.newStation.title);
    this.setState({ submitDisabled : true });
    
    this.state.stations.post(this.state.newStation).then(function(resp){
      if(resp.success) {
        this.update();
        this.setState({ showAlert: true, alertStyle : 'success', alertText : 'Successfully added new station' });
      }
      else {
        this.setState({ showAlert: true, alertStyle : 'danger', alertText : 'Failed to add new station. Error: ' + JSON.stringify(resp.error) });
        console.log(resp.error);
      }
      this.setState({ submitDisabled : false });
    }.bind(this));
  }
  
  handleTitleChange(e) {
    this.setState({ newStation : { title : e.target.value }} );
  }
  
  render() {   
    var stationTableItems = this.state.stationsList.map(function(station, idx){
      return(
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{station.title}</td>
          <td>{station.s_id}</td>
          <td>not yet</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="xsmall">Edit</Button>
              <Button bsStyle="danger" bsSize="xsmall">Remove</Button>
            </ButtonToolbar>
          </td>
        </tr>
      );
    });
    
    var alert = this.state.showAlert ? <Alert bsStyle={this.state.alertStyle}>{this.state.alertText}</Alert> : '';
    
    return (
      <div>
        {alert}
         <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>S_ID</th>
                <th>Coordinates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stationTableItems}
            </tbody>
         </Table>

        <form>
          <FormGroup controlId="newStationTitle">
            <h3>Add new station</h3>
            <ControlLabel>Title: </ControlLabel>
            <FormControl
              type="text"
              value={this.state.newStation.title}
              placeholder="Enter new station title"
              onChange={this.handleTitleChange.bind(this)}></FormControl>
          </FormGroup>
          <Button onClick={this.submitNewStation.bind(this)} disabled={this.state.submitDisabled} >Submit</Button>          
        </form>
     </div>
    );
  }
}