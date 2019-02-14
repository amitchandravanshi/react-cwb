import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

class DisclosureList extends React.Component  {
    render(){
        let disclosureItems=this.props.disclosure && this.props.disclosure.Results;
        if(this.props.disclosure.length===0){
            disclosureItems=this.props.state.disclosures.disclosure.Results;
        }
        
        return (
          <div>
             <div className="disclosure-list-item">
                {disclosureItems && disclosureItems.map((disclosure,index) =>
                    <div key ={index}>
                     <div className="disclosure-text" dangerouslySetInnerHTML={{ __html: disclosure.language }} />
                     <div className="disclosure-path">
                         renditionPath: <div  dangerouslySetInnerHTML={{ __html: disclosure.renditionPath.toString().replace(/,/g,'<br/>') }} />
                     </div>
                    <hr/>
                    </div>        
			)}
             </div>{ typeof disclosureItems!=='undefined' && disclosureItems.length>0 && 
                         <div className="disclosure-finish-action">
                           <Button onClick={this.props.onClick}>Finish and Apply to draft</Button>
                        </div>
                     } 
           </div>);
           }
}


const mapStateToProps = state => {
    return {
        state
    };
};

export default connect(mapStateToProps)(DisclosureList);
