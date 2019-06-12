import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class Item extends Component {
    render(){
        let itemID = 'item' + this.props.itemID;
        return (
            <li id={this.props.item}><a href="#" onClick={this.props.action}>{this.props.item}</a></li>
        )
    }
}

class ShoppingList extends Component{
    constructor(props){
        super(props);

        this.state = {listItems: []}

        this.addItem = this.addItem.bind(this);
        this.submit = this.submit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(event){
        event.preventDefault();
        console.log(event.target.parentNode.id);
        let aryListItems = this.state.listItems;
        let aryLength = aryListItems.indexOf(event.target.parentNode.id);
        console.log(aryListItems.indexOf(event.target.parentNode.id));
        aryListItems.splice(aryLength, 1);
        console.log(aryListItems.length);
        this.setState({
            listItems: aryListItems
        }, () => {
            console.log(this.state.listItems);
          })        
    }

    addItem(event){
        console.log(event.target.parentNode.getElementsByTagName('input')[0].value);
        this.setState({
            listItems: [...this.state.listItems, event.target.parentNode.getElementsByTagName('input')[0].value]
        }, () => {
            console.log(this.state.listItems);
          })
        /*this.setState((prevState) => {
            let aryListItems = prevState.listItems;
            aryListItems.push(event.target.parentNode.getElementsByTagName('input')[0].value);
            return {listItems: aryListItems}
        });*/
    }

    submit(event){
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <section>
                    <form onSubmit={this.submit}>
                        <label>Add new item:</label>
                        <input id="newListItem" type="text"></input>
                        <button onClick={this.addItem}>Add</button>
                    </form>
                </section>
                <section>
                    <ul>
                        {
                            (this.state.listItems.length > 0) ? this.state.listItems.map((item, index)=>
                                <Item key={index} item={item} itemID={index} action={this.deleteItem}/>
                            ) : "Shopping cart is empty"
                        }
                    </ul>
                </section>
            </div>
        )
    }

   /* static propTypes = {
        listItems: PropTypes.array
    }*/
}

ReactDOM.render(<ShoppingList />, document.getElementById('root'));
