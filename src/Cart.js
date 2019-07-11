import React from 'react';
import './App.css';
import Navigation from './Navigation';
import App from './App';


class Cart extends React.Component{
	constructor(props){
     super(props);
     this.state={
       incomingdata:[],
       requiredID:"",
        cartno:""
     }
	}
	
componentDidMount(){
	let getData = JSON.parse(localStorage.getItem('products'));
     if(getData){
    this.setState({
    	incomingdata:[...getData] 
    })}

 }
 sendNavigation()
  {
    this.props.history.push('/Cart');
  }

    sendNavigationHome()
  {
    this.props.history.push('/home');
  }

removeItem(id){
  this.state.incomingdata.splice(id,1);

  this.setState({
    incomingdata:this.state.incomingdata
},()=>{

   localStorage.setItem('products', JSON.stringify(this.state.incomingdata))

  	console.log('Updated Cart',this.state.incomingdata);

  	})
}






render(){

  return (
  	<div>

		  	<div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="#">
             <spam>LOGO</spam>
          </a>
        
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a onClick={this.sendNavigationHome.bind(this)} className="nav-link" href="#">HOME</a>
            </li>

            
            <li className="nav-item ">
                <button onClick={this.sendNavigation.bind(this)}className="btn-sm pull-right">
                  <i className="fas fa-shopping-cart fa-border icon-grey">
                  <code className="text-dark"> {this.state.incomingdata.length} </code> </i>
                </button>
            </li>
        </ul>
    </nav>       

		  	</div>
        <div>
	     
	   

	    <div className="container">
	        
	        <div className="row">
	        

	        {(this.state.incomingdata.map((arr,id)=>{
	        
            const numItems = this.state.incomingdata.length
	        return(
          


	            <div className=" col-sm-12 col-md-4 col-lg-4">
	            
		            <div className="card item-card">

			            <div className="card-body">
			               <div>
			                  
			                        <div class="border border-dark">
			                          <img alt="ITEM IMAGE" className="" width="100%" src={arr.searchImage}>
			                          </img>
			                        </div>
			                      
			                </div>
			            </div>
			            <div className="card-footer text-dark font-weight-bold text-center">
                          
			             <p>{arr.productName}</p>
			             <p>PRICE:-{arr.price}</p>
			             
			           
                        	<button onClick={this.removeItem.bind(this, id)} className="btn-danger">Remove</button>
                         




			            </div>
			        </div>  
		        </div>
	        );
	    }))}
	    </div>
	  </div>
	</div>

	<div className=" fixed-bottom inline-block bg-dark text-center"> 
    <i class=" text-white">@copyrights</i>
    
    </div>
</div>
	    
);
}
}


export default Cart;



