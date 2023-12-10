import React, { useEffect, useState } from "react";
import { Die } from "./Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const App = ()=>{

    const { width, height } = useWindowSize();

    const generateNewDie = ()=>{
        const randomNum = Math.floor(Math.random()*6)+1;
        return {
            value : randomNum,
            isHeld : false,
            id:nanoid()
        }
    }
    const [tenziz,setTenziz] = useState(false);
    const [counter,setCounter] = useState(0);

    const allNewDice = ()=>{
        const die_val = [];
        for(let i = 0;i<10;i++){
            die_val.push(generateNewDie());
        }
        return die_val;
    }

    const [dieValues,setDieValues] = useState(allNewDice());
    
    useEffect(()=>{
        const allHeld = dieValues.every(die => die.isHeld);
        const firstVal = dieValues[0].value;
        const allSameVal = dieValues.every(die => die.value === firstVal);
        if(allHeld && allSameVal){
            setTenziz(true);
        }
    },[dieValues]);

    const holdDice = (id)=>{
        const newdieValues = dieValues.map((die)=>{
            return die.id === id ? {...die,isHeld:!die.isHeld} : die;
        })
        setDieValues(newdieValues);
    }

    const newGame = ()=>{
        setTenziz(false);
        setDieValues(allNewDice());
    }

    const rollDice=()=>{
        setCounter(oldCount => oldCount+1);
        setDieValues(oldDie => oldDie.map((die)=>{
            return die.isHeld ? die : generateNewDie();
        }))
    }
    
    const dieElements = dieValues.map((ele)=>{
        return <Die 
            key={ele.id} 
            id={ele.id}
            value={ele.value} 
            isHeld={ele.isHeld} 
            holdDice={holdDice}
        />
    })

    return (
        <main>
            {tenziz && <Confetti
                width={width}
                height={height}
            />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {dieElements}
            </div>
            <button className="btn" onClick={tenziz ? newGame : rollDice}>{tenziz ? "New Game" : 
            "Roll"}</button>
            <h2>{tenziz && `No. of Rolls to Win = ${counter}`}</h2>
        </main>
    )
}

