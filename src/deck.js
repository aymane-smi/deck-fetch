import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
import './deck.css';
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck/";
export default class Deck extends Component{
    constructor(props){
        super(props);
        this.state = {
            Deck: null,
            drawn: []
        };
    }
    async componentDidMount(){
        const NEW_DECK = `${API_BASE_URL}/new/shuffle/`;
        let response = await axios.get(NEW_DECK);
        this.setState({
            Deck: response.data
        });
    }
    getCard = async ()=>{
        const ID = this.state.Deck.deck_id;
        const NEW_CARD = `${API_BASE_URL}/${ID}/draw/`;
        try{
            let response = await axios.get(NEW_CARD);
            if(!response.data.success)
                throw new Error("no cards available!");
            let card = response.data.cards[0];
            this.setState(st=>({
                drawn: [...this.state.drawn, {id: card.code, image: card.image, name: `${card.value} of ${card.name}`}]
            }));
        }catch(err){
            alert(err);
        }
    };
    render(){
        let cards_map = this.state.drawn.map(c =>(
            <Card image={c.image} name={c.name} key={c.id}/>
        ));
        return (<div>
            <h1>Deck</h1>
            <button onClick={this.getCard}>get Card</button>
            <div className="container">
                {cards_map}
            </div>
        </div>);
    }
}