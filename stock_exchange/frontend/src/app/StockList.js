import React, { Component } from 'react';
import { Row, Col, Button, ButtonToolbar,
    ListGroup, ListGroupItem, Well, Form,
    FormGroup, FormControl, InputGroup,
    ControlLabel, Label } from 'react-bootstrap';
import services from './Services';

class StockList extends Component {
    constructor(props) {
        super(props);
        
        if (!props.location.state || !props.location.state.email) {
            this.props.history.push({
                pathname: '/'
            }); 
        }
        
        this.state = {               
            stockDetails: {},
            orders: [],
            user: props.location.state.email
        };

        setInterval(() => {
            services.getUserOrders(props.location.state.email)
            .then((response) => {
                this.setState({
                    orders: (response.length > 5)? response.reverse().slice(0, 5): response
                });
            });
         }, 15000);

        services.getStocks()
        .then((response) => {
            this.setState({
                stock: response
            });
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleSell = this.handleSell.bind(this);
    }

    componentDidMount() {
              
    }

    componentDidUpdate() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.stock)? true: false;
    }

    getValueBySymbol(item) {
        const value = this.state.stockDetails[item.stock_name];
        return value || 0;
    }

    handleChange(e) {
        this.setState({
            stockDetails: {
                ...this.state.stockDetails,
                [e.target.getAttribute('data-symbol')]: Number(e.target.value),
            },
        });
    }

    handleBuy(e) {

        this.createOrdersRequest(e, 'BUY');

    }

    handleSell(e) {

        this.createOrdersRequest(e, 'SELL');

    }

    createOrdersRequest(e, orderType) {

        e.preventDefault();
        
        let orders = [];
        let index = 0;

        for (let key in this.state.stockDetails) {
            orders[index++] = {
                stock_name: key,
                limit_price: this.state.stockDetails[key],
                order_type: orderType
            };
        }

        services.submitOrder({
            user: this.state.user,
            orders: orders
        });

    }

    renderShares() {
        const shares = this.state.myShares;
        let mySharesDOM = '';
        if (Object.keys(this.state.myShares).length > 0) {
            mySharesDOM = Object.keys(shares)
                .map(key => <span>{`${key} - ${shares[key]}`}; </span>);
        } else {
            mySharesDOM = 0;
        }

        return mySharesDOM;
    }


    render() {
        const stock = this.state.stock;
        const orders = this.state.orders;

        if (!stock) { 
          return <div/>;
        }

        return (
            <Well>
                <h3>Recent 5 Transactions:</h3>
                {orders.map(order => (
                <header key={order.order_id}>
                
                   Order Id: {order.order_id}, Type: {order.order_type}, Status: {order.status}
                </header>
                ))}
                <br/>
                <h3>Buy or Sell Stocks</h3>
                <Form action="">
                    <FormGroup>
                        <ListGroup>
                            {stock.map((item, i) => (
                                <ListGroupItem key={item.stock_name}>
                                    <Row>
                                        <Col xs={4}>
                                            <ControlLabel htmlFor={`stockDetails-${i}`}>
                                                <span><b>{item.stock_name} </b></span>
                                                <Label className="stock-cost">{item.price}</Label>
                                            </ControlLabel>
                                        </Col>
                                        <Col xs={4}>
                                            
                                            <FormControl
                                                id={`stockDetails-${i}`}
                                                name={`stockDetails${i}`}
                                                type="number"
                                                value={this.getValueBySymbol(item)}
                                                placeholder={item.price}
                                                min="0"
                                                data-symbol={item.stock_name}
                                                onChange={this.handleChange}
                                            />
                                        </Col>                                        
                                    </Row>
                                </ListGroupItem>
                        ))}
                        </ListGroup>
                    </FormGroup>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.handleBuy} id="buy">Buy</Button>
                        <span><b>~</b></span>
                        <Button bsStyle="success" onClick={this.handleSell} id="sell">Sell</Button>
                    </ButtonToolbar>
                </Form>
            </Well>
        );
    }
}

export default StockList;
