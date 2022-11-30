import { useEffect, useRef, useState } from 'react';
import Cellule from '../components/Cellule';
import Goutte from '../components/Goutte';

function App() {
    const x = useRef(0)
    const y = useRef(0)
    const [selectedColor, setSelectedColor] = useState('')

    // on s'en branle de ca on verra plus tard
    const ajouterGoutte = () => {
        const cellules = document.querySelectorAll('.cellule')

        /* const cellulesNonUsed = []
        cellules.forEach((cellule, key) => {
            if (cellule.style.backgroundColor === '') {
                cellulesNonUsed.push(key)
            }
        });

        const randomSpawn = cellulesNonUsed[Math.floor(Math.random() * cellulesNonUsed.length)]
        cellules[randomSpawn].classList.add('testing')
        cellules[randomSpawn].style.backgroundColor = couleurGoutte.current.value */
    }

    // Pareil on s'en branle
    const decaler = () => {
        const colonnes = document.querySelectorAll('.colonne')
        const lesGouttesEtablis = document.querySelectorAll('.cellule .item')[0]

        /* const positionX = (x.current.value - 1)
        const positionY = (y.current.value - 1)

        try {
            colonnes[positionX].children[positionY].style.backgroundColor = couleurGoutte.current.value
        } catch (error) {
            alert("Cette cardinalité n'existe pas")
        } */
    }

    // Pareil osef pour le moment
    const auto = () => {
        const cellules = document.querySelectorAll('.cellule')
        /* const path = ["haut", "droite", "bas", "gauche"]

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
        }); */
        let i = 0
        cellules.forEach((cellule, key) => {
            if (cellule.firstChild) {
                i++
            }
        })
    }

    const reset = () => {
        const lesGouttes = document.querySelectorAll('.cellule.dragging.item')
        lesGouttes.forEach(cel => {
            cel.classList.remove('item')
            cel.style.backgroundColor = ''
        })
    }

    return (
        <>
            <div className="split left">
                <div className="d-flex items-selection">
                    <Goutte setSelectedColor={setSelectedColor} color="blue" />
                    <Goutte setSelectedColor={setSelectedColor} color="yellow" />
                    <Goutte setSelectedColor={setSelectedColor} color="red" />
                    <Goutte setSelectedColor={setSelectedColor} color="green" />
                </div>

                <div className="mt-3"></div>

                <label htmlFor="x">X</label>
                <input type="number" name="x" min="1" defaultValue="1" ref={x} />

                <label htmlFor="y">Y</label>
                <input type="number" name="y" min="1" defaultValue="1" ref={y} />

                <button className="btn btn-success" onClick={decaler}>Décaler</button>

                <div className="mt-3"></div>

                <button className="btn btn-danger" onClick={reset}>Réinitialiser</button>
                <button className="btn btn-primary" onClick={auto}>Lancer</button>
            </div>

            <div className="split right">
                <div className="tapis">
                    {[...Array(10)].map((x, i) =>
                        <Cellule key={i} actualColor={selectedColor} />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;