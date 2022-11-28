import { useEffect, useRef, useState } from 'react';
import Boite from '../components/Boite';

function App() {
    const couleurGoutte = useRef('')
    const position = useRef(0)

    const Cellule = () => {
        const rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push(<div key={i} className="cellule" onClick={(e) => console.log(e.target.getBoundingClientRect())} />);
        }
        return <div className="colonne">{rows}</div>;
    }

    const ajouterGoutte = () => {
        const cellules = document.querySelectorAll('.cellule')
        
        const cellulesNonUsed = []
        cellules.forEach((cellule, key) => {
            if (cellule.style.backgroundColor === '') {
                cellulesNonUsed.push(key)
            }
        });

        const randomSpawn = cellulesNonUsed[Math.floor(Math.random() * cellulesNonUsed.length)]
        cellules[randomSpawn].style.backgroundColor = couleurGoutte.current.value
    }

    const decaler = () => {
        reset()
        const { value } = position.current // valeur (position) saisie par l'utilisateur
        const cellules = document.querySelectorAll('.cellule')

        const a = cellules[value]
        a.style.backgroundColor = couleurGoutte.current.value
    }

    const reset = () => {
        const cellules = document.querySelectorAll('.cellule')

        cellules.forEach(cellule => {
            cellule.style.backgroundColor = ''
        }); 
    }

    const auto = () => {
        const cellules = document.querySelectorAll('.cellule')
        const cellulesOccupied = []

        cellules.forEach((cellule, key) => {
            if (cellule.style.backgroundColor !== '' && cellule.nextElementSibling !== null) {
                // cellulesOccupied.push(key)
                reset()
                cellule.nextElementSibling.style.backgroundColor = couleurGoutte.current.value
            }
        });
    }

    return (
        <>
            <Boite title="Selector" content={
                <>
                    <select name="goutte" ref={couleurGoutte} defaultChecked="blue">
                        <option value="blue">Bleu</option>
                        <option value="yellow">Jaune</option>
                    </select>
                    <button onClick={ajouterGoutte}>Ajouter</button>
                </>
            }
            />

            <br />
            <br />

            <Boite title="Bouger de case en case" content={
                <>
                    <label htmlFor="position">Position</label>
                    <input type="number" min="0" ref={position} />

                    <button onClick={decaler}>Décaler</button>
                </>
            }
            />

            <br />
            <br />
            <br />
            <button onClick={reset}>Réinitialiser</button>
            <button onClick={auto}>Auto</button>

            <hr />

            <div className="tapis">
                {[...Array(10)].map((x, i) =>
                    <Cellule key={i} />
                )}
            </div>
        </>
    );
}

export default App;