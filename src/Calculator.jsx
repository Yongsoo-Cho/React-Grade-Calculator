import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './main.css'

const Calculator = () => {
    const [grades, setGrades] = useState( [{id: uuidv4(), value:0}] );
    const [average, setAverage] = useState( 0 );
    const [letter, setLetter] = useState('');

    const addGrade = () => {
        setGrades( (grades) => [...grades, {id: uuidv4(), value: 0}]  );
    };

    const deleteGrade = (index) => {
        setGrades( (grades) => grades.filter( (_,i) => i !== index ) );
    };

    const calculate = (e) => {
        e.preventDefault();
        const valuesArray = grades.map(( ({value})=>value ));
        
        setAverage(
            valuesArray.reduce( (a,b) => +a + +b, 0 ) / grades.length
        );

        if(97<=average<=100){ setLetter('A+'); }
        else if(93<=average<=96){ setLetter('A'); }
        else if(90<=average<=92){ setLetter('A-'); }
        else if(87<=average<=89){ setLetter('B+'); }
        else if(83<=average<=86){ setLetter('B'); }
        else if(80<=average<=82){ setLetter('B-'); }
        else if(77<=average<=79){ setLetter('C+'); }
        else if(73<=average<=76){ setLetter('C'); }
        else if(70<=average<=72){ setLetter('C-'); }
        else if(67<=average<=69){ setLetter('D+'); }
        else if(65<=average<=66){ setLetter('D'); }
        else if(average<=65){ setLetter('E/F'); }
    };

    return(
        <div className='operations-container'>
            <form onSubmit={calculate}>
                {grades.map((g,i) => {
                    return(
                        <div key={g.id}>
                            <input type="text" default="class" placeholder="Class..."/>
                            <input 
                                value = {g.value}
                                onChange={ (e) => {
                                    const updated = [...grades];
                                    updated[i].value = e.target.value;
                                    setGrades(updated);
                                }}
                                type="number" 
                                min="0"
                                max="100"
                            />
                            <button type="button" onClick={ () => deleteGrade(i) }>Delete</button>
                        </div>
                    );
                })}
                <div className='operations-submit'>
                    <button type="button" onClick={addGrade}>Add Grade</button>
                    <button type="submit">Calculate</button>
                </div>
            </form>

            <div className='results-container'>
                <p>Your average grade is</p>
                <h1>{Number(average).toFixed(0)}</h1>

                <p>{letter==='' ? '' : Number(average).toFixed(2)+'%'}</p>
                <p>{letter}</p>
            </div>
            
        </div>
    );
};

export default Calculator;