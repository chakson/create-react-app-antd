import React, { Component } from 'react';

class NoMatch extends Component {
  render() {
    return (
      <div className="page-no-data">
        <div className="img"></div>
        <div className="txt">访问的页面不存在~~~</div>
      </div>
    );
  }
}

export default NoMatch;
