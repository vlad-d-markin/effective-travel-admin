import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, Alert,Grid, Row, Col} from 'react-bootstrap';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'


import Menu from './menu.jsx';
import Users from './users.jsx';
import Stations from './stations.jsx';
import Routes from './routes.jsx';
import About from './about.jsx';


import RestClient from 'another-rest-client'


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state= {
      api : new RestClient("https://busstat-server.herokuapp.com"),
      messages : [ ]
    };
    
    this.state.api.res('token');
    
    var self = this;
    
    this.state.api.token.post({ login : 'admin', password : 'admin' }).then(function(res){
      console.log('Login ' + res.success);
      if(res.success) {
        localStorage.setItem('effectiveTravel.token', res.token);
      }
      else {
        localStorage.setItem('effectiveTravel.token', null);
      }
    });   
  }
  
  
  render() {   
    var messages = this.state.messages.map(function(msg, index){
      return (<Alert bsStyle={msg.style} key={index}>{msg.text}</Alert>);
    });
    
    return (
      <Grid>
        <Row>
          <Col md={12}><h1>Effective travel <small>developer tools</small></h1></Col>
        </Row>
        
        <Row>
          <Col md={2}>
            <Menu/>
          </Col>
          
          <Col md={10}>
            {messages}
            
            <Panel>
              {this.props.children}
            </Panel>
          </Col>
        </Row>
      </Grid>
      );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={About} />
        <Route path="users" component={Users}/>
        <Route path="stations" component={Stations}/>
        <Route path="routes" component={Routes}/>
        <Route path="*" component={About}/>
      </Route>
  </Router>, 
  document.body);