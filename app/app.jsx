import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import Menu from './menu.jsx';
import Users from './users.jsx';
import Stations from './stations.jsx';
import Routes from './routes.jsx';
import About from './about.jsx';


class App extends React.Component {
  render() {
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
             {this.props.children}
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