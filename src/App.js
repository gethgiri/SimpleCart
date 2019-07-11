import React from 'react';
import './App.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Navigation from './Navigation';
import Cart from './Cart'



class App extends React.Component {
        constructor(props){
          super(props);
          this.state={
             arr:[],
             itemimg:[],
             imgurl:"",
             sizes:"",
             sizearr:[],
            clicks: 1,
            show: true,
            sizeSelected:"",
            cartObj:[],
           selectedId: ""

          }
      
        }




  componentDidMount(){
    axios.get('https://images.stockal.com/api/products.json')
    .then (res => {
        console.log(res);
        this.setState({
          arr: [...res.data.data.products]
        })
    })
  }

    sendNavigationHome()
  {
    this.props.history.push('/');
  }


  sendNavigation()
  {
    this.props.history.push('/Cart');
  }


  itemViewHandle(data,id){
    console.log('data',data, id);
    this.setState({
      imgurl:data.searchImage,
      sizes:data.sizes,
      selectedId: id
    })}

 
  
    
  IncrementItem = () => {
    if(this.state.clicks<5){
    this.setState({ clicks: this.state.clicks + 1 });
     }
    else{
      alert('only 5 Units Allowed')
        }
  }

  DecreaseItem = () => {
      if(this.state.clicks>1){
    this.setState({ clicks: this.state.clicks - 1 });
    }
  }

  ToggleClick = () => {
    this.setState({ show:!this.state.show });
  } 

  selectedSize(event){
    if(null){
      this.state.sizeSelected= null;
    }
   console.log('sizeSelected', event.target.value);
       
       this.state.sizeSelected=event.target.value;
  }


  itemsToCart(selectedItem, idx) {
   
 
 this.state.cartObj.push(selectedItem)

  this.setState({

  cartObj:this.state.cartObj

  },()=>
  {
    localStorage.setItem('products', JSON.stringify(this.state.cartObj))
  },
     ()=>{( 
       
   localStorage.setItem('products size', JSON.stringify(this.state.selectedItem))


      )});

      console.log('Pushed to cart',this.state.cartObj);

}
   
    


render(){
  this.state.sizearr = this.state.sizes.split(",");
      let eachsize=[...this.state.sizearr];


return(
  <div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="#">
         <spam>LOGO</spam>
      </a>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item ">
                <button onClick={this.sendNavigation.bind(this)}className="btn-sm pull-right">
                <i className="fas fa-shopping-cart "></i>
                </button>
      </li>
    </ul>
    </nav>

  <div className="container-fluid">
    <div className="row">
      {(this.state.arr.map((arr,id)=>{
        
        return(
          <div className=" col-sm-12 col-md-6 col-lg-4">
            <div className="card item-card">

             <div className="card-body ">
               <div>
                  <div className="row">
                      <div className="col-lg-7 col-md-7 col-sm-12">
                        <div class="border border-dark">
                          <img alt="ITEM IMAGE" className="" width="100%" src={arr.searchImage}>
                          </img>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <h5>
                         <p className="font-weight-bold text-center"> <ins>{arr.productName}</ins></p>
                        </h5>
                        <p className="offset-lg-4 offset-md-4 offset-sm-6 badge badge-secondary"> {arr.brand}</p>
                        <p className="offset-lg-4 offset-md-4 offset-sm-6">Sizes:[{arr.sizes}].</p>
                         <button  data-toggle="modal" data-target="#exampleModal" className="offset-lg-4 offset-md-4 offset-sm-6 btn-primary" onClick={this.itemViewHandle.bind(this,arr, id)} >VIEW</button>
                      </div>
                  </div>
               </div>
              </div>
            </div>

          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content ">
                <div className="card">
                    <div className="card-body itemBody">
                      <img className="img-responsive" width='100%' src={this.state.imgurl}></img>
                    </div>

                  <div className="card-footer">
                    <div>
                        <div className="row">
                            <span className="input-group-btn">
                            <label className="mx-1">Quantity</label>
                            <button onClick={this.DecreaseItem.bind(this,id)} className="">
                            <i className="fa fa-minus-square"></i></button>
                            <label className="border  text-center quantity-box" >{this.state.clicks}</label>
                            <button  onClick={this.IncrementItem.bind(this,id)} className="">
                            <i className="fa fa-plus-square"></i></button>
                            </span>
                         
                        <div className="col offset-lg-4 offset-md-4 offset-sm-4">
                           <select onChange={this.selectedSize.bind(this)}>
                             {eachsize.map((sizevalue,id)=>{
                                return(               
                                  <option>Size No:{sizevalue}</option>

                                );
                               }
                              )
                             }
                            </select>
                        </div>       
                      </div>
                          
                    <div className="row">
                        {(this.state.arr.map((item, id) => {
                          if(this.state.selectedId === id){
                            return(
                            <button 
                             onClick={this.itemsToCart.bind(this, item, id )}
                              className="btn-md offset-lg-6 offset-md-6 offset-sm-6 btn-primary ">Buy</button>
                            );
                          }
                            
                        }))}
                    </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>         
        </div>
       );

      }))}
    </div>
  </div>
  
  <div className=" footer inline-block bg-dark text-center"> 
   <a onClick={this.sendNavigationHome.bind(this)} className="text-success nav-elements footer-icon">
    <i className="fa fa-fw fa-home text-success"></i>HOME
    </a>
    </div>

    
      
 </div>
 );
 }

}


export default withRouter(App);

