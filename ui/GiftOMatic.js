var ids = 0;

var GiftOMatic = React.createClass({
  loadDataFromServer: function() {
    var theDataBeHere = [
      new ItemData('id1', 2, 'ojan', 'a million dollars',
          'financial independence, here i come!',
          [
            'http://www.amazon.com/Set-100-Million-Dollar-Bills/dp/B00B50PJVE/ref=sr_1_cc_1?s=aps&ie=UTF8&qid=1414893469&sr=1-1-catcorr&keywords=one+million+dollars',
            'http://www.forbes.com/sites/chrisbarth/2011/01/19/want-a-million-dollars-just-ask-for-it/',
          ],
          [
            'http://ecx.images-amazon.com/images/I/51DJvcTluWL.jpg',
            'http://yobucko.com/wp-content/uploads/2012/04/if-i-had-a-million-dollars.png',
          ],
          [
            {author: 'jewree', comment: 'do you really need a million dollars?'},
            {author: 'ojan', comment: 'Note the quantity. Actually, I need $2,003,821.21'},
            {author: 'jewree', comment: 'oh yeah'},
          ],
          [
            {purchaser: 'jewree', quantity: 1},
            {purchaser: 'your mom', quantity: 1},
          ]
          ),
      new ItemData('id2', 1, 'jewree', 'a house'),
      new ItemData('id3', 1, 'jewree', 'a green dress'),
    ];
    this.setState({data: theDataBeHere});

    net.json('/users').then(function(users) {
      this.setState({users: users});
    }.bind(this));
  },
  saveItem: function(owner, quantity, title, link, description) {
    var newData = this.state && this.state.data;
    if (!newData)
      newData = []
    newData.push(new ItemData(ids++, quantity, owner, title, description, [link]));
    this.setState({data: newData});
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return <div>
      <div className="flex">
        <div className="flexOne"><NewItemForm onAdd={this.saveItem} /></div>
        <Login users={this.state && this.state.users} />
      </div>
      <GroupedItemLists data={this.state && this.state.data} />
    </div>;
  },
});
