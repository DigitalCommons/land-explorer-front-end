import React, {Component} from 'react';

class PoliticalInfoDisplay extends Component{
    constructor(props){
        super(props);
    }

    checkProps(){
        let output = [];

        if(this.props.displayInfo){
            output.push(
            <p>
                The council for {this.props.postcode} is {this.props.council}.
                The ward is {this.props.ward}.
            </p>                
            )
        }
        else
            output = [];

        return output;

    }

    render(){
        return(
            <div>
                {this.checkProps()}
            </div>
        );
    }
}

export default PoliticalInfoDisplay;