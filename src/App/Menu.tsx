import * as React from 'react';
export default function Meny() {
    return (<nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">SW Prototype</a>
            </div>

            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li ><a href="JavaScript:;" style={{ cursor: 'not-allowed' }}>Details</a></li>
                    <li className="active"><a href="#">Summary</a></li>
                </ul>
            </div>
        </div>
    </nav>);
}