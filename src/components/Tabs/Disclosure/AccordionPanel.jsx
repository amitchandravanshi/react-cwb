import React from "react";
import "./../../../assets/scss/options.scss";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import FilterButton from "./FilterButton";
import OptionsAvailable from './OptionsAvailable';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTagFilter,deleteTagFilter } from "../../../redux/actions/tagFilterActions";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Autosuggest from "react-autosuggest";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    margin: {
        margin: theme.spacing.unit
    },

    cssFocused: {},

    bootstrapRoot: {
        padding: 0,
        "label + &": {
            marginTop: theme.spacing.unit * 3
        }
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 12px",
        width: "80%",
        margin: "0px 0px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    },
    bootstrapFormLabel: {
        fontSize: 18
    }
});

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


class AccordionPanel extends React.Component  {
    constructor(props) {
        super(props);
	  
        this.state = {name:'',
            tagArr: [],
            value:'',
            audienceRef:'',
            tagFilterArr: [],
            storeArray:[],
            open: false,
            suggestions: []
        };
	 
        this.handleAddClick = this.handleAddClick.bind(this);  
        this.handleInputClick= this.handleInputClick.bind(this);
        this.fetchFilterState=this.fetchFilterState.bind(this); 
        this.newFetchFilterState=this.newFetchFilterState.bind(this); 
        this.handleCancle=this.handleCancle.bind(this);
        
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

        handleClose = () => {
            this.setState({ open: false });
            this.fetchFilterState();
        };
        fetchFilterState(){
            let newArray = []; 
            Object.keys(this.props.tagArray).map((item)=>{
                if(this.props.tagArray[item].parent===this.props.parentId){
                    this.props.tagArray[item].child.map((items)=>
                    {  
                        newArray=[...newArray,items];   
                    }
               )
                }
            
            })
            this.setState({storeArray:[...newArray]});  
  
        }

        newFetchFilterState(nextState){
            let newArray = [];
            Object.keys(nextState).map((item)=>{
                if(nextState[item].parent===this.props.parentId){
                    nextState[item].child.map((items)=>
                    {  
                        newArray=[...newArray,items];  
                    }

               )
                }
            
            })
            this.setState({storeArray:[...newArray]});   
        }
    
        componentWillReceiveProps(nextProps,nextState) {
            this.newFetchFilterState(nextProps.tagArray);
            this.forceUpdate();
        }
 
   
        componentDidMount(){
            if(this.props.parentId!==""){
                let constructedUrl = '/bin/DebugToolServlet?tagId='+this.props.parentId;
                fetch(constructedUrl,{
                    method: 'GET',
                    mode:'cors',
                    headers: {
                        Accept: 'application/json'
                    },
                }).then(results => {
                    if (results.ok) {
                        return results.json();
                    } else {
                        throw new Error('Unable to get response from API, may be AEM is down');
                    } 
                }).then(dataValues => { typeof dataValues.data!=='undefined' && dataValues.data.map((tag) => {
                    this.state.tagArr.push(tag.text);
                })}).catch(error => {
                    console.error(error);
                });
            }
            this.fetchFilterState();
        }
   
        handleAddClick(e){
            let updateArr=this.props.tagArray;
            let contextValue=this.state.value;
            let parentContext=this.props.parentId;
            let inputTagArray=this.state.tagArr;
            if(contextValue!==''){
                updateArr.map((a)=> {
                    if (parentContext.includes(a.parent)) {
                        let arrayIndex=a.child.findIndex(i => i.name.toUpperCase() === contextValue.toUpperCase());
                        if(arrayIndex===-1 && inputTagArray.includes(contextValue)){
                            let tempArr={"name":contextValue,"isPercolate":false}; 
                            a.child = a.child.concat(tempArr);
                        }
                    }
                    if (a.child.length === 0){
                    	this.setState({value:''});
                    }
           
                });

                this.props.addTagFilter(updateArr);
                this.setState({name:''});
            }else{
                alert("Please select Tag");
            }
            this.fetchFilterState();
        }
        
    handleInputClick(e){
        
        this.setState({
            name: e.target.innerHTML
        });
        this.setState({
            value: ''
        });
    }
    handleCancle(e){     
        let updateArr=this.props.tagArray;
        let cancleValue= e.target.id;
        if(cancleValue===''){
            cancleValue= e.target.parentElement.id;
        }
        let parentContext=this.props.parentId;

        if(cancleValue!==''){
            updateArr.forEach(function iter(a) {
                if (parentContext.includes(a.parent)) {
                    let arrayIndex=a.child.findIndex(i => i.name === cancleValue);
                    if(arrayIndex!==-1){
                        a.child.splice(arrayIndex, 1);
                    }    
                }
           
            });

            this.props.addTagFilter(updateArr);
            
        }else{
            alert("Please select Tag");
        }
        this.fetchFilterState();
    }
    
    getSuggestions = value => {
  	  const escapedValue = escapeRegexCharacters(value.trim());
  	  
  	  if (escapedValue === '') {
  	    return [];
  	  }
  	  const regex = new RegExp( escapedValue, "i");
  	  const suggestions = this.state.tagArr.filter(suggestValue => regex.test(suggestValue.toUpperCase()));
  	  
  	  return suggestions;
    }
    
    getSuggestionValue = suggestion => {
        return suggestion;
    };

    renderSuggestion = suggestion => {
        return suggestion;
    };
      
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        if (suggestion.isAddNew) {
          console.log('Add new:', this.state.value);
        }
    };  
      
    onChangeInput = (event, { newValue, method }) => {
    	this.setState({
    		value: newValue,
    	      	suggestions: this.state.tagArr,
    	      	input: event.target.value,
    	      	name: event.target.value
    	});
    };
    	  
    render(){
    	const { value, suggestions } = this.state;
        
        const { fullScreen } = this.props;
        const inputSuggestionProps = {
        	placeholder: "Enter tag name...",
        	value,
        	onChange: this.onChangeInput,
        	id: "bootstrap-input"
        };
        return (
          <div>
             <div>
                <Dialog className={'disclosure-filter-search'} fullScreen={fullScreen} open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title" >
                    <div className="disclosure-filter-window">
                        <DialogTitle id="responsive-dialog-title">{"Audience context configuration"}</DialogTitle>
                        <DialogContent className={"disclosure-configuration"}>
                           <OptionsAvailable onClick={this.handleClose} contextValue={this.props.parentId}/>
                        </DialogContent>
                    </div>
                 </Dialog>
             </div>

             <div className="input-group">
               <Autosuggest
	            suggestions={suggestions}
	            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
	            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
	            getSuggestionValue={this.getSuggestionValue}
	            renderSuggestion={this.renderSuggestion}
	            onSuggestionSelected={this.onSuggestionSelected}
	            inputProps={inputSuggestionProps} />
                <div className="disclosure-add-icon"><AddIcon onClick={this.handleAddClick} /></div> 
                <div className="disclosure-search-icon"><SearchIcon onClick={this.handleClickOpen}/></div>
            </div>

            <div className="aud-buttons">
               <FilterButton storeArray={this.state.storeArray} onClick={this.handleCancle} />
            </div>
        </div>);
     }
 }

const mapStateToProps = state => {
    return {
        
        tagArray: state.filters.tagFilter 
    };
};

const mapDispatchToProps = dispatch => ({
    addTagFilter: (name) => dispatch(addTagFilter(name))
});

AccordionPanel.propTypes = {
    addTagFilter: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default compose(withStyles(styles),withMobileDialog(),connect(mapStateToProps, mapDispatchToProps))(AccordionPanel);


