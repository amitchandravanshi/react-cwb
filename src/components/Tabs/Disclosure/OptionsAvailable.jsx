import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './../../../assets/scss/options.css';
import AddIcon from '@material-ui/icons/AddCircle';
import SubIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from  '@material-ui/icons/Delete';
import SaveCircleIcon from '@material-ui/icons/CheckCircleOutline';
import CancelCircleIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchTagFiltersDetails,addTagFilter,deleteTagFilter } from "../../../redux/actions/tagFilterActions";
import FolderIcon from '@material-ui/icons/Folder';

class OptionsAvailable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagArr:{data:[{}]},
            appliedTagArr:[],
            tempTag:[],
            tempAppliedTag:[],
        };

        this.tagSelected=this.tagSelected.bind(this);
        this.handleAddClick=this.handleAddClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleAddAppliedTag=this.handleAddAppliedTag.bind(this);
        this.handleDeleteAppliedTag=this.handleDeleteAppliedTag.bind(this);
        this.appliedTag=this.appliedTag.bind(this);
        this.appliedTagSelected=this.appliedTagSelected.bind(this);
        this.handleModalSave=this.handleModalSave.bind(this);
        this.compare=this.compare.bind(this);
    }

    tagSelected(e){
        if(e.target.id && e.target.tagName.toLowerCase() === 'span'){
			document.getElementById(e.target.id).classList.toggle("tag-active");  
        }
		let index = this.state.tempTag && this.state.tempTag.indexOf(e.target.title);
		if(index > -1){
			this.state.tempTag.splice(index, 1);
		}else{
			this.state.tempTag.push(e.target.title);
		}     
    }

    handleModalSave(){
        let modalTagArray=this.state.appliedTagArr;
        let updateArr=this.props.tagArray;
        let parentContext=this.props.contextValue;
        if(modalTagArray.length>0){
            updateArr.forEach(function iter(a) {
                if (parentContext.includes(a.parent)) {
                    a.child=[{}];
                    modalTagArray.map((item,index)=>{
                        if (index===0){
                            a.child[0] = {"name":item.name,"isPercolate":item.isPercolate}; 
                        }else{
                            a.child = a.child.concat({"name":item.name,"isPercolate":item.isPercolate});
                        }
                    })    
                }
           
            });

            this.props.addTagFilter(updateArr);
            this.props.onClick();
           
        }else{
            alert("Please select Tag");
        }
       
    }

    compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const tagTextA = a.text.toUpperCase();
        const tagTextB = b.text.toUpperCase();

        let comparison = 0;
        if (tagTextA > tagTextB) {
            comparison = 1;
        } else if (tagTextA < tagTextB) {
            comparison = -1;
        }
        return comparison;
    }

    handleAddClick(e){
       
        if(e.target.parentElement.id!=="undefined" && e.target.parentElement.id!==""){
            let constructedUrl = '/bin/scs/fetchdriversmodifiers?parentid='+e.target.parentElement.id;
            let parentNode="ul_"+e.target.parentElement.id;
			document.getElementById(parentNode).classList.toggle("active");  
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
            }).then(dataValues => { 
                let childtag = typeof dataValues.data!=='undefined' && dataValues.data.sort(this.compare).map((tag,index) => {
                    let li = document.createElement("LI");
                    li.setAttribute("class",'disclosure-sub-option-text');
                    li.setAttribute("onClick",this.tagSelected);           
                    li.innerHTML = "<span id='"+tag.tagid+"' title='"+tag.text+"' name='"+tag.text+"'>"+tag.text+"</span>"
                    if(document.getElementById(tag.tagid)===null){
                        document.getElementById(parentNode).appendChild(li); 
                    }
                })
            }).catch(error => {
                console.error(error);
            });
        }
    }

    handleClose(){
        this.props.open=false;
    }

    appliedTagSelected(e){
       if(e.target.id && e.target.tagName.toLowerCase() === 'span'){
			document.getElementById(e.target.id).classList.toggle("tag-active");  
        }
		let index = this.state.tempAppliedTag && this.state.tempAppliedTag.indexOf(e.target.title);
		if(index > -1){
			this.state.tempAppliedTag.splice(index, 1);
		}else{
			this.state.tempAppliedTag.push(e.target.title);
		}
    }

    handleAddAppliedTag(){
        this.state.appliedTagArr && this.state.tempTag && this.state.tempTag.map((tag,index) => {
            document.getElementsByName(tag)[0] && document.getElementsByName(tag)[0].classList.remove("tag-active"); 
            if(tag && this.state.appliedTagArr.findIndex(i => i.name.toUpperCase() === tag.toUpperCase()) === -1){
                this.state.appliedTagArr.push({"name":tag,"isPercolate":false});
            }
           
        });
        this.setState({tempTag:[]});
        this.setState({tempAppliedTag:[]});
      
        this.forceUpdate();
    }

    handleDeleteAppliedTag(){
        this.state.appliedTagArr && this.state.tempAppliedTag && this.state.tempAppliedTag.map((tag) => {
            document.getElementsByName(tag)[0] && document.getElementsByName(tag)[0].classList.remove("tag-active");
            var index='';
            index = this.state.appliedTagArr.findIndex(i => i.name === tag);
            if (index > -1) {
                this.state.appliedTagArr.splice(index, 1);
            }   
        });
        this.setState({tempTag:[]});
        this.setState({tempAppliedTag:[]});  
        
        this.forceUpdate();
    }

    appliedTag(){
        let newArray = [];
        Object.keys(this.props.tagArray).map((item)=>{
            if(this.props.tagArray[item].parent==this.props.contextValue){
                this.props.tagArray[item].child.map((items)=>
                {  
                    newArray.push(items);   

                }

           )
            }
            this.setState({appliedTagArr:newArray});
           
        })
    }

    componentDidMount(){
        if(this.props.contextValue!==""){
            let constructedUrl = '/bin/scs/fetchdriversmodifiers?parentid='+this.props.contextValue;
            fetch(constructedUrl,{
                method: 'GET',
                mode:'cors',
                headers: {
                    Accept: 'application/json'
                },
            }).then(results => {
                return results && results.json();
            }).then(dataValues => { 
                this.setState({ tagArr: dataValues });
            })
        }
        this.appliedTag();
    }

    render() {
        return ( 
          <div className="row options disclosure-config-columns">
           <div className="col-md-5 options-available">
             <div><h3>Options Available</h3></div>   
                <div className="options-list">
                    <ul>
                       <li className="tag-tree-view" href="#" color="primary" style={{ marginBottom: '1rem' }}><SubIcon/> {this.props.contextValue.replace("sc:","").toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                            <ul className="tag-tree-view options-item-block">{
                                 this.state.tagArr && this.state.tagArr.data.sort(this.compare).map((tag,index) => 
                                   <li  key={index} id={tag.tagid} onClick={this.tagSelected} className="tag-tree-view"  title={tag.text} color="primary"  style={{ marginBottom: '1rem' }}><AddIcon id={tag.tagid} onClick={this.handleAddClick}/> <span id={"span_"+tag.tagid} title={tag.text} name={tag.text} className="disclosure-option-text">{tag.text}</span> 
                                       <ul id={"ul_"+tag.tagid} className="nested">
                                       </ul>
                                   </li>)} 
                             </ul>
                        </li>
                      </ul>
                </div>  
             </div>
             <div className="col-md-2 options-actions">
                <Button variant="contained" color="primary" onClick={this.handleAddAppliedTag}>
                  <AddCircleIcon />Add
                 </Button>
                 <Button variant="contained" color="primary" onClick={this.handleDeleteAppliedTag} >
                   <RemoveCircleIcon  />Delete
                 </Button>
              </div>
              <div className="col-md-5 options-applied">
                 <div><h3>Options Applied</h3></div>
                 <div className="options-list">
                    <ul className="tag-tree-view options-item-block">{
                       this.state.appliedTagArr && this.state.appliedTagArr.sort().map((items,index)=>
                          <li className="disclosure-option-text" key={index}>
                            <FolderIcon /> 
                            <span className="disclosure-option-text" onClick={this.appliedTagSelected} key={index} name={items.name} id={"applied-span_"+items.name} title={items.name} color="primary"  style={{ marginBottom: '1rem' }}>
                               {items.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                            </span>
                          </li>)}
                    </ul>
                  </div>
              </div>
              <div className="options-btns">
                 <Button variant="contained" color="primary"  onClick={this.handleModalSave} >
                    <SaveCircleIcon />Save
                 </Button>
                 <Button variant="contained" color="primary" onClick={this.props.onClick} classes={{
                    root: 'classes-state-root-btn-cancel',}}  >
                    <CancelCircleIcon />Cancel
                 </Button>
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

OptionsAvailable.propTypes = {
    addTagFilter: PropTypes.func.isRequired,     
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsAvailable);