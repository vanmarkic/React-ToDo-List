var TodoContainer = React.createClass({
  getInitialState: function() {
    var counter = this.props.items ? this.props.items.length + 1 : 1;
    console.log({ items: this.props.items });
    return { items: this.props.items || [], counter: counter };
  },

  addItem: function(item) {
    var a = this.state.items.concat([{ id: this.state.counter, text: item }]);
    var oneUp = this.state.counter + 1;
    this.setState({ items: a, counter: oneUp });
  },

  removeItem: function(idx) {
    var a = this.state.items.filter((v, i) => {
      if (i !== idx) return v;
    });
    this.setState({ items: a, counter: this.state.counter - 1 });
  },
  render: function() {
    var list = this.state.items.map((it, idx) => (
      <TodoItem
        key={it.id}
        item={it.text}
        removeItem={this.removeItem.bind(null, idx)}
      />
    ));

    return (
      <div id="TodoContainer">
        <h1>React ToDo</h1>
        <ul>{list}</ul>
        <TodoInput addItem={this.addItem} />
      </div>
    );
  }
});

var TodoItem = React.createClass({
  checkItem: function(e) {
    var text = e.target.parentNode.getElementsByTagName("span")[0];
    text.classList.contains("line")
      ? text.classList.remove("line")
      : text.classList.add("line");
  },
  render: function() {
    return (
      <li className="TodoItem">
        <span>{this.props.item}</span>
        <span className="rem" onClick={this.props.removeItem}>
          remove
        </span>
        <span className="fin" onClick={this.checkItem}>
          finished
        </span>
      </li>
    );
  }
});

var TodoInput = React.createClass({
  handleSubmit: function() {
    var inp = this.refs.inputText;
    if (inp !== '' ) {
      this.props.addItem(inp.value.trim().substr(0, 50));
      inp.value = '';
  }
},

  render: function() {
    return (
      <div className="TodoInput">
        <input type="text" placeholder="todo..." ref="inputText"/>
        <input type="submit" value="add" onClick={this.handleSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <TodoContainer
    items={[
      { id: 1, text: "make food" },
      { id: 2, text: "make groceries" },
      { id: 3, text: "eat food" }
    ]}
  />,
  document.getElementById("container")
);
