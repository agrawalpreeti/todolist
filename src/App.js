import React from 'react';
import './App.css';
import './paper.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { ProgressBar } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Input } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      Listitems: [],
    };
    this.setStatus = this.setStatus.bind(this);
    this.upStatus = this.upStatus.bind(this);
    this.downStatus = this.downStatus.bind(this);
    this.remStatus = this.remStatus.bind(this);
    this.setStatus1 = this.setStatus1.bind(this);
  
  this.state.comp=0;
  this.state.alpha=0;
  }

  keyDown=(e)=>{
      if(e.keyCode===13)
      this.setValue();
  }





  taskcomplete(){
    let x=0;
    for(let i=0;i<this.state.Listitems.length;i++){
      if(this.state.Listitems[i].status)
      {x++;
      }}
    return x;
    }

    sortcomp(){
   
      let z=this.state.Listitems;
      let  c =this.state.comp;
       z = c?z.sort((a,b)=> a.status - b.status):z.sort((a,b)=> b.status - a.status);
      
      this.setState({
        Listitems : z,
        comp : !c
      })
    }
     
   

    compare(a, b) {
      const genreA = a.name.toUpperCase();
      const genreB = b.name.toUpperCase();
      
      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    }
  
    sortalpha(){
      let z=this.state.Listitems;
      let a=this.state.alpha;
      
      z.sort(this.compare);
  
      let y = a?z:z.reverse();
      
      this.setState({
        Listitems: y,
        alpha : !a
      })
    }

  setStatus1(item,index)
  {
   let temp;
    let y;
   temp=this.state.Listitems;
    let x=temp.splice(index,1);
    y=[...x, ...temp];

    this.setState({ Listitems: y})
    
  }
  

  setStatus(item) {
    let l = this.state.Listitems;
    let i = l.indexOf(item);
    l[i].status = !l[i].status;
    this.setState({ Listitems: l })

    //let count=this.state.number;
    //if(this.state.Listitems[i].status)
    //{
      //count++;
    //this.setState({number: count})
  //}
  
  //lse
  //{
    //count--;
    //this.setState({number:count})
  //}
}
  upStatus(item, index) {
    console.log('index', index)
    if (index > 0) {
      console.log('item UpStatus', item, index)
      let x = this.state.Listitems;
      [x[index], x[index - 1]] = [x[index - 1], x[index]];
      this.setState({ Listitems: x })
    }
  }

  downStatus(item, index) {
    console.log('this.listItems',this.state.Listitems,'index',index)
    console.log('this.state.Listitems.length', this.state.Listitems.length, this.state.Listitems.length !== index)
    if (this.state.Listitems.length !== index +1) {

      console.log('item downStatus', item, index)
      let x = this.state.Listitems;
      [x[index], x[index + 1]] = [x[index + 1], x[index]];
      console.log('x',x)
      this.setState({ Listitems: x })
    } else{
      console.log('last elements')
    }

  }

  remStatus(item, index) {
    console.log('item removeStatus ', item, index);
    this.state.Listitems.splice(index, 1)
    this.setState({ Listitems: this.state.Listitems })
  }

  getList(props) {
    console.log('props getList',props, this.state.Listitems)
    return this.state.Listitems.map((item, index) => <List
      item={item} index={index}
      setStatus={this.setStatus}
      upStatus={this.upStatus}
      downStatus={this.downStatus}
      remStatus={this.remStatus}
      setStatus1={this.setStatus1}>

      </List>)

  }

  getValue(e) {
    if (e.target.value !== '' && e.target.value.trim()) {
      this.state.newItem = e.target.value;
      console.log('newItem', this.state.newItem)
    }
  }

  

  setValue(e) {
    if (this.state.newItem) {
      console.log(e.target.value);
      let d = new Date()
      let obj = { name: this.state.newItem, status: false, date : d.toLocaleString() ,status1: true}
  
      let l = this.state.Listitems;
      l.push(obj);
      this.setState({ Listitems: l })
      document.getElementById("txtArea").value = "";
      this.state.newItem = "";
    }
  }

  render() {
  
    return (
      <div className="container text-center">
        <h1 className="animated heartBeat 1  delay-500ms">TO DO LIST</h1>
        <div className="d-flex justify-content-center" >
        <input id="txtArea" type="text" className="btn btn-outline-dark" 
         onClick={this.setValue.bind(this)}    onChange={this.getValue.bind(this)}></input>
        <button type="button" id="btn1" className="text-center btn btn-secondary" onClick={this.setValue.bind(this)} ><b>Add Task</b></button>
  <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">Sort</Dropdown.Toggle>
  <Dropdown.Menu>
  <Dropdown.Item  onClick={this.sortalpha.bind(this)}>Alphabetically</Dropdown.Item>
  <Dropdown.Item onClick={this.sortcomp.bind(this)}>Completion</Dropdown.Item>
 
  </Dropdown.Menu>
</Dropdown>
       </div>
        <h1 className="h1"> <span  >task complted:{this.taskcomplete()}/{this.state.Listitems.length} </span></h1>
        <ProgressBar animated now={this.state.Listitems.length?(this.taskcomplete()/this.state.Listitems.length)*100:0} />
        <br></br>
                   <ul >{this.getList()}</ul>
        </div>)
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('Props List', this.props) 
    return (
      <div  className="container marginal flex animated 1 fadeInDown  delay-500ms "  style={{ display: 'flex' }}>
      
 <li onDoubleClick={() =>{this.props.setStatus1(this.props.item, this.props.index)}}
 onClick={() => { this.props.setStatus(this.props.item) }} id="li"
 className={this.props.item.status ? "paper-btn-block btn-success " : "paper-btn-block" }>
 {this.props.item.name} <span className="float-right">{this.props.item.date}</span>  </li>
  <button type="button" className="btn btn-warning" onClick={() => { this.props.upStatus(this.props.item, this.props.index) }}>Up</button>
 <button type="button" className="btn btn-info" onClick={() => { this.props.downStatus(this.props.item, this.props.index) }}>Down</button>
    <button type="button" className="btn btn-danger  " onClick={() =>  { this.props.remStatus(this.props.item, this.props.index) }}>X</button>

      </div >
    )
  }
}

export default App;