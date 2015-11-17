'use strict';

var auth = '';

window.location.search.substring(1, window.location.search.length);

if (!window.location.search) {
  alert('Add authorization as query parameter like ?admin:password');
} else {
  auth = window.location.search.substring(1, window.location.search.length);
}

var Power = function Power(props) {
  var background = props.on ? '#555' : '#333';
  var color = props.on ? props.color || 'cyan' : '#777';
  var glow;
  if (props.on) {
    glow = React.createElement('circle', { cx: '50', cy: '50', r: '20', strokeWidth: '20', stroke: color, fill: background, className: 'glow' });
  }
  return React.createElement(
    'svg',
    { onClick: props.onClick, width: '100', height: '100' },
    React.createElement('rect', { x: '0', y: '0', rx: '15', ry: '15', width: '100', height: '100', fill: background }),
    glow,
    React.createElement('circle', { cx: '50', cy: '50', r: '30', strokeWidth: '10', stroke: color, fill: background })
  );
};

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      on: false,
      color: 'rgb(255, 255, 255)',
      value: 100100100
    };
  },
  _setColor: function _setColor(i, v) {
    var controller = '0870d46b-033f-0c84-ffffeee00050010b';
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:1337/loxone.nitor.fi/dev/sps/io/" + controller + "/AI" + i + "/" + v, true);
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(auth));
    xhttp.withCredentials = true;
    xhttp.send();
  },
  componentWillMount: function componentWillMount() {
    for (var i = 1; i < 13; ++i) {
      this._setColor(i, 0);
    }
  },
  _clicked: function _clicked() {
    this.setState({
      on: !this.state.on
    });
    var value = 0;
    if (!this.state.on) {
      value = this.state.value;
    }
    for (var i = 4; i < 13; ++i) {
      this._setColor(i, value);
    }
  },
  _colorChanged: function _colorChanged() {
    var v = 0;
    var r = this.refs.rInput.value;
    var g = this.refs.gInput.value;
    var b = this.refs.bInput.value;
    var color = 'rgb(' + r + ',' + g + ',' + b + ')';
    var value = 0;
    console.log(this.state.on);
    value = Math.floor(r / 255.0 * 100.0) + Math.floor(g / 255.0 * 100.0) * 1000 + Math.floor(b / 255.0 * 100.0) * 1000000;
    console.log('color=' + color + ', value=' + value);
    this.setState({ color: color, value: value });

    if (this.state.on) {
      for (var i = 4; i < 13; ++i) {
        this._setColor(i, value);
      }
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'loxone.nitor.fi'
      ),
      React.createElement(
        'div',
        { className: 'control' },
        React.createElement(
          'h2',
          null,
          'Power'
        ),
        React.createElement(Power, { onClick: this._clicked, on: this.state.on, color: this.state.color })
      ),
      React.createElement(
        'div',
        { className: 'control' },
        React.createElement(
          'h2',
          null,
          'Color'
        ),
        React.createElement(
          'label',
          null,
          'R ',
          React.createElement('input', { ref: 'rInput', type: 'range', min: '0', max: '255', step: '1', onChange: this._colorChanged, defaultValue: '255' })
        ),
        React.createElement(
          'label',
          null,
          'G ',
          React.createElement('input', { ref: 'gInput', type: 'range', min: '0', max: '255', step: '1', onChange: this._colorChanged, defaultValue: '255' })
        ),
        React.createElement(
          'label',
          null,
          'B ',
          React.createElement('input', { ref: 'bInput', type: 'range', min: '0', max: '255', step: '1', onChange: this._colorChanged, defaultValue: '255' })
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(App, null), container);
