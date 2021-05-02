import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class App extends React.Component{
// eslint-disable-next-line no-useless-constructor
constructor(props) {
  super(props);
  this.state={
    searchCity:'',
    data:'',
    display:false
  };
}
getYourCity=async(event)=>{
  event.preventDefault();
  /* try{}catch{}
  It works like this:

First, the code in try {...} is executed.
If there were no errors, then catch (err) is ignored: the execution reaches the end of try and goes on, skipping catch.
If an error occurs, then the try execution is stopped, and control flows to the beginning of catch (err). The err variable (we can use any name for it) will contain an error object with details about what happened.*/
  try {
    
      const url=`https://us1.locationiq.com/v1/search.php?key=pk.8202a69aece41c46ea236eb49f1ed96b&q=${this.state.searchCity}&format=json`
    
      const require=await axios.get(url);
      this.setState({
        data:require.data[0],
        display:true
      })
  }
  catch(err) {
    this.setState({error: `${err.message}: ${err.response.data.error}`});
  }
  
};
updateSearchCity=(event)=>{
  this.setState({
    searchCity:event.target.value
  });
}


  render(){
    return(
      <div style={{ 
        backgroundImage: `url("https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")`,backgroundAttachment:`fixed`,backgroundRepeat:`no-repeat`,backgroundSize:`80rem`
      }}>
        <h1 style={{color:'white'}}>
          City Explore
        </h1>
        <Form  onSubmit={this.getYourCity}>
          <input style={{width:`20rem`,height:'3rem',color:'blue'}} id='city' onChange={this.updateSearchCity} type='text' placeholder='city name'/>
          <Button style={{ width: '5rem' ,height:'2rem',backgroundColor:'cyan'}} type='submit' value='get city' >Explore!</Button>
       
        <br>
        </br>
       

        </Form >
        { this.state.error ? <h3>{this.state.error}</h3> : ''}
         {/* ternary for error message from slackflow website*/}
        { this.state.data.lat !== undefined ?
        <>
          <h3 style={{color:`white`}}>{this.state.data.display_name}</h3>
          <h5 style={{color:`white`}}>{this.state.data.lat}, {this.state.data.lon}</h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.data.lat},${this.state.data.lon}&zoom=10`} alt='' />
        </> : ''} 

      </div>
    );
  }

}
export default App;
