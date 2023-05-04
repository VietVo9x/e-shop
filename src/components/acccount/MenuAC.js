import React from 'react';
import { Link } from 'react-router-dom';

const MenuAC = () => {
    return (
        <div>
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>ACCOUNT</h2>
                    <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                        <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to="/account">
                            <span className="badge pull-right"><i className="fa fa-plus" /></span>
                            ACCOUNT
                            </Link>
                        </h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                        <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to="/account/product/add">
                            <span className="badge pull-right"><i className="fa fa-plus" /></span>
                            Create Product
                            </Link>
                        </h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                        <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to="/user/my-product">
                            <span className="badge pull-right"><i className="fa fa-plus" /></span>
                            MY PRODUCT
                            </Link>
                        </h4>
                        </div>
                    </div>
                    </div>{/*/category-products*/}
                </div>
        </div>
        </div>
    );
};

export default MenuAC;