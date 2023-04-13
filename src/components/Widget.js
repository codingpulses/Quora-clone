import React from 'react'
import '../css/Widget.css'
import WidgetOptions from './WidgetOptions';
const Widget = () => {
    return (
        <div className="widget">
          <div className="widget__header">
            <h5>You would love to follow</h5>
          </div>
          <div className="widget__contents">
            <WidgetOptions/>
          </div>
        </div>
      );
}

export default Widget
