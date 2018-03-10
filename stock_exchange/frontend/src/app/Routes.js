import React from "react";
import {Route,
        Redirect,
        Switch} from "react-router-dom";

import App from "./App";
import Login from "./Login";
import StockList from "./StockList";

export default function Routes() {
    return (
        
            <App>
                <Switch>

                    <Route path="/" exact component={Login} />

                    <Route path="/stocklist" component={StockList} />

                </Switch>

            </App>
       
    )
}