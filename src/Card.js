import React, {Component} from 'react';
import './Card.css';
export default class Card extends Component{
    constructor(props){
        super(props);
        this.posX = Math.random()*40 - 20;
        this.posY = Math.random()*40 - 20;
        this.angle = Math.random()*90 - 45;
        this._transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.angle}deg)`;
    }
    render(){
        console.log(this._transform);
        return (<img 
            className="Card" 
            src={this.props.image}
            alt={this.props.name}
            style={{transform: this._transform}}
         />);
    }
}