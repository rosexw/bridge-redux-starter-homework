import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {addProduct, removeProduct} from './actions/index';
import Chance from 'chance';

export const chance = Chance();

const Product = (props) => <div class="Product">{props.name}</div>;

const DaBest = ({name}) => <h1>The Best: {name}</h1>;

const AdderButton = ({add}) => <button class="AdderButton" onClick={() => add({name: 'Sofa'})}>Add Sofa</button>


const RemoverButton = ({remove}) => <button class="RemoverButton" onClick={() => remove({id: '1'})}><i class="fas fa-times"></i></button>

class App extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.add({
      id: chance.guid(),
      name: 'Table',
      department: 'Furniture',
      price: '300.00',
      stock: 5,
    });

    this.props.remove({
      id: chance.guid(),
      name: 'Chair',
      department: 'Furniture',
      price: '50.00',
      stock: 10,
    });
  }

  render() {
    const {productList, add, whoIsTheBest} = this.props;
    debugger;
    return (
      <div class="bodyContent">
        <DaBest name={whoIsTheBest}/>
        {productList.map(product =>
          <div>
            <Product name={product.name} key={product.id} />
            <RemoverButton {...this.props} />
          </div> )}

        <AdderButton {...this.props} />
      </div>
    );
  }
}


// React x REDUX STUFF

const mapStateToProps = state => {
  return {
    productList: state.products.productList,
    whoIsTheBest: 'Della',

    // an example of how to derive state in the mapStateToProps function - this is a specific 'subset' of the full list
    lowStockProducts: state.products.productList.filter(prod => prod.stock && prod.stock < 4),
  }
};

const mapDispatchToProps = {
  add: addProduct,
  remove: removeProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
