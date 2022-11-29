import { useEffect, useRef, useState } from 'react';
import Boite from '../components/Boite';

function App() {
    const couleurGoutte = useRef('')
    const x = useRef(0)
    const y = useRef(0)

    const Cellule = () => {
        const rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push(<div key={i} className="cellule" />);
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
        cellules[randomSpawn].classList.add('testing')
        cellules[randomSpawn].style.backgroundColor = couleurGoutte.current.value
    }

    const decaler = () => {
        reset()
        const colonnes = document.querySelectorAll('.colonne')

        const positionX = (x.current.value - 1)
        const positionY = (y.current.value - 1)

        try {
            colonnes[positionX].children[positionY].style.backgroundColor = couleurGoutte.current.value
        } catch (error) {
            alert("Cette cardinalité n'existe pas")
        }
    }

    const reset = () => {
        const cellules = document.querySelectorAll('.cellule')

        cellules.forEach(cellule => {
            cellule.style.backgroundColor = ''
        });
    }

    const auto = () => {
        const cellules = document.querySelectorAll('.cellule')
        const path = ["haut", "droite", "bas", "gauche"]

        cellules.forEach((cellule, key) => {
            let j = key
            
            if (getComputedStyle(cellule).background !== 'none') {
                setInterval(() => {
                    let randomPath = path[Math.floor(Math.random() * path.length)]
                    switch (randomPath) {
                        case "haut": j--; break;
                        case "droite": j += 10; break;
                        case "bas": j++; break;
                        case "gauche": j -= 10; break;
                    }
                    cellules[j].style.backgroundColor = getComputedStyle(cellule).backgroundColor
                }, 1000)
            }
        });
    }

    return (
        <>
            <div className="split left">
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

                <Boite title="Bouger de case en case (individuellement)" content={
                    <>
                        <label htmlFor="x">X</label>
                        <input type="number" name="x" min="1" defaultValue="1" ref={x} />

                        <label htmlFor="y">Y</label>
                        <input type="number" name="y" min="1" defaultValue="1" ref={y} />

                        <button onClick={decaler}>Décaler</button>
                    </>
                }
                />

                <br />
                <br />
                <button onClick={reset}>Réinitialiser</button>
                <button onClick={auto}>Auto</button>
            </div>

            <div className="split right">
                <div className="tapis">
                    {[...Array(10)].map((x, i) =>
                        <Cellule key={i} />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;