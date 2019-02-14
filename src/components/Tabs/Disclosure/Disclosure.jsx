import React from 'react';
import "../../../shared/scss/Disclosure.css";
import DisclosureList from './DisclosureList';
import AccordionPanel from './AccordionPanel';
import PropTypes from "prop-types";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from "react-redux";
import { addDisclosureDetails } from "../../../redux/actions/disclosureActions";
import { addTagFilter} from "../../../redux/actions/tagFilterActions";
import { INITIAL_TAG_STATE} from "../../../redux/constants/tagFilterConstants";
import { updatedisclosureTags } from "../../../redux/actions/writeAction";
import { Toolbar, Typography, Button, Paper } from "@material-ui/core";
import { getDisclosureDetails } from "../../../api/disclosureApi";

class Disclosure extends React.Component  {
    constructor(props) {
        super(props);
        this.state={
            accordionValue:INITIAL_TAG_STATE,
            tagFilterArr:[],
            contextValue:'sc:audience',	
            disclosures:[],
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleResetClick=this.handleResetClick.bind(this);
        this.handleAccordionClick=this.handleAccordionClick.bind(this);
        this.addPercolateTag=this.addPercolateTag.bind(this);
        this.handleApplyToDraft=this.handleApplyToDraft.bind(this);
        this.handleExpandDefault=this.handleExpandDefault.bind(this);
		this.applyDisclosureOnLoad=this.applyDisclosureOnLoad.bind(this);
   
    }

    componentDidMount(){
        this.addPercolateTag();
		if(this.props.dataBaseDisclosureTags && typeof this.props.dataBaseDisclosureTags.disclosureTags!=='undefined'  && this.props.dataBaseDisclosureTags.disclosureTags.length>0){
		 this.applyDisclosureOnLoad();
		}
    }
   
    handleAccordionClick(e){ 
        this.setState({contextValue:e});         
    }
	applyDisclosureOnLoad(){
     		let param='';
        Object.keys(this.props.dataBaseDisclosureTags.disclosureTags).map((item,index)=>{
            if(index===0){
                param=this.props.dataBaseDisclosureTags.disclosureTags[item].parent.replace('sc:','')+"=";
            }else{
                param=param+"&"+this.props.dataBaseDisclosureTags.disclosureTags[item].parent.replace('sc:','')+"=";
            }
            this.props.dataBaseDisclosureTags.disclosureTags[item].child.map((items,index)=>
            {  
                if(index===0) {    
                    param=param+items.name;
                }else{
                    param=param+","+items.name;
                }
            })   
        })
        getDisclosureDetails(param).then(results => {
            return results;
        }).then(dataValues => {
            this.setState({disclosures:dataValues.data});
			this.props.addDisclosureDetails(this.state.disclosures);
        })
       .catch(err => console.error(err)); 
		
    }
	
    handleClick(){
        let param='';
        Object.keys(this.props.tagFilter).map((item,index)=>{
            if(index===0){
                param=this.props.tagFilter[item].parent.replace('sc:','')+"=";
            }else{
                param=param+"&"+this.props.tagFilter[item].parent.replace('sc:','')+"=";
            }
            this.props.tagFilter[item].child.map((items,index)=>
            {  
                if(index===0) {    
                    param=param+items.name;
                }else{
                    param=param+","+items.name;
                }
            })   
        })
        getDisclosureDetails(param).then(results => {
            return results;
        }).then(dataValues => {
            this.setState({disclosures:dataValues.data});
        })
       .catch(err => console.error(err)); 
    }

    addPercolateTag(){
        let updateArr=[];
        if(this.props.dataBaseDisclosureTags && typeof this.props.dataBaseDisclosureTags.disclosureTags!=='undefined'  && this.props.dataBaseDisclosureTags.disclosureTags.length>0){
            updateArr=this.props.dataBaseDisclosureTags.disclosureTags;
        }else{
            updateArr=this.state.accordionValue;
        }
        let percolateTagArr=this.props.assignment.taxonomy;
        this.props.assignment.taxonomy && Object.keys(this.props.assignment.taxonomy).map((items)=>{
            updateArr.map((a)=> {
                if (items.includes(a.parent.replace("sc:",""))) {
                    percolateTagArr[items].map((tag,index)=> {
                        let arrayIndex=a.child.findIndex(i => i.name.toUpperCase() === tag.toUpperCase());
                        if(arrayIndex===-1){
                            let tempArr={"name":tag,"isPercolate":true}; 
                            a.child = a.child.concat(tempArr);
                        }
                    })
                }
            })
        })
        this.setState({tagFilterArr:updateArr});
        this.props.addTagFilter(updateArr);
        this.forceUpdate(); 
    }

    handleResetClick(){
        let resetState=[{"parent":"sc:audience","title":"Audience*","child":[]},{"parent":"sc:channel","title":"Channel*","child":[]},
                {"parent":"sc:product","title":"Product","child":[]},{"parent":"sc:feeStructure","title":"Fee Structure","child":[]},
                {"parent":"sc:statistic","title":"Statistic","child":[]},{"parent":"sc:feeStructureCharacteristic","title":"Fee Structure Characteristic","child":[]},
                {"parent":"sc:materialCharacteristic","title":"Material Characteristic","child":[]},{"parent":"sc:productCharacteristic","title":"Product Characteristic","child":[]},
                {"parent":"sc:general","title":"General","child":[]},{"parent":"sc:underconstruct","title":"Widget Node Name (Under Construction)","child":[]}];

        let percolateTagArr=this.props.assignment.taxonomy;
      
        if(typeof percolateTagArr==='undefined'){
            percolateTagArr={audience:["adviser"],channel:["web"]};
        }
        
        Object.keys(percolateTagArr).map((items)=>{
            resetState.map((a)=> {
                if (items.includes(a.parent.replace("sc:",""))) {
                    percolateTagArr[items].map((tag,index)=> {
                        let arrayIndex=a.child.findIndex(i => i.name.toUpperCase() === tag.toUpperCase());
                        if(arrayIndex===-1){
                            let tempArr={"name":tag,"isPercolate":true}; 
                            a.child = a.child.concat(tempArr);
                        }
                    })
                }
            })
        })
        this.props.addTagFilter(resetState);
        this.setState({tagFilterArr:resetState});
        this.forceUpdate();  
    }

    handleApplyToDraft(){
        if (window.confirm("Do you want to save disclosure results in draft?")) {
            if(this.state.disclosures.hasOwnProperty("Results")){
                this.props.addDisclosureDetails(this.state.disclosures);
            } 
            this.props.updatedisclosureTags(this.props.tagFilter);
        }  
    }

    handleExpandDefault(child){
        let flag=false;
        if(child.length>0){
            flag=true;
        }
        return Boolean(flag);
    }

    render(){
        return(
       <div>
           <Toolbar className={'tab-header'}>
	        <Typography variant="title">
		       Add Disclosure
		    </Typography>
        </Toolbar>
        <div className="Search-for-related-d">
            Search for related disclosure on the left  |  Review disclosure results on the right If you need to amend the list, edit the topics. After you are done, select 	&quot;Finish and Apply to Draft&quot;
        </div>
	    <div className="content-block"> 
             <Paper className={'tab-subhead'}>
     	        <Typography variant="subheading">Disclosure Search</Typography>
             </Paper>
            <div className="disclosure-box"> 
                <div className="disclosure-tags-control">
	            {this.state.tagFilterArr && this.state.tagFilterArr.map((items,index) =>
	                    <ExpansionPanel  key={items.parent} onClick={() => this.handleAccordionClick(items.parent)} defaultExpanded={this.handleExpandDefault(items.child)}>
                                <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} className={"disclosure-category"}>
                                    {items.title?items.title:items.parent.toString().replace("sc:","").toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={"disclosure-category-details"}>
                                    <AccordionPanel  parentId={items.parent} />
                                </ExpansionPanelDetails>
                          </ExpansionPanel>)}
		           <div className={'disclosure-actions-box'}>
                    <Button variant="contained" className="TopBar-button-11"   onClick={this.handleResetClick}>Reset</Button>
                    <Button variant="contained" className="TopBar-button-11"   onClick={this.handleClick}>Apply</Button>
		           </div>
                </div>
                <div className="disclosure-results">
                    <div className="row">
                        <div className="Rectangle-12">
                            <p className="Disclosure-Analyzer">Disclosure Analyzer Results</p>
                        </div>
                    </div>
                    <div className="disclosure-list-block">
                       <DisclosureList onClick={this.handleApplyToDraft} disclosure={this.state.disclosures}/>
                    </div>    
                </div>
            </div>
        </div>
    </div>);
   }
}

const mapStateToProps = state => {
    return {
        loading: state.disclosures.loading,
        disclosure: state.disclosures.disclosure,
        error: state.disclosures.error,
        tagFilter:state.filters.tagFilter,
        assignment: state.assignments.assignment,
        dataBaseDisclosureTags: state.write.write.assignment
    };
};

const mapDispatchToProps = dispatch => ({
    addDisclosureDetails: (param) => dispatch(addDisclosureDetails(param)),
    addTagFilter: (name) => dispatch(addTagFilter(name)),
	updatedisclosureTags: (tags) => dispatch(updatedisclosureTags(tags))
});

Disclosure.propTypes = {
    addDisclosureDetails: PropTypes.func.isRequired,
    addTagFilter: PropTypes.func.isRequired,
	updatedisclosureTags: PropTypes.func.isRequired
	
};


export default connect(mapStateToProps, mapDispatchToProps)(
  Disclosure
);