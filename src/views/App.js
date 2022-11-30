import { useEffect, useRef, useState } from 'react';
import Cellule from '../components/Cellule';
import Goutte from '../components/Goutte';

function App() {
    const x = useRef(0)
    const y = useRef(0)
    const [selectedColor, setSelectedColor] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [enableMovingXY, setEnableMovingXY] = useState(false)
    const [selectedGoutte, setSelectedGoutte] = useState('')

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

    const fermerModal = () => {
        setOpenModal(false)
        setEnableMovingXY(false)
    }

    // Pareil on s'en branle
    const bouger = () => {
        const colonnes = document.querySelectorAll('.colonne')
        const positionX = (x.current.value - 1)
        const positionY = (y.current.value - 1)

        if (selectedGoutte.color !== '') {
            try {
                colonnes[selectedGoutte.idColonne - 1].children[selectedGoutte.idCellule - 1].classList.remove('item')
                colonnes[selectedGoutte.idColonne - 1].children[selectedGoutte.idCellule - 1].style.backgroundColor = ''

                colonnes[positionX].children[positionY].classList.add('item')
                colonnes[positionX].children[positionY].style.backgroundColor = selectedGoutte.color
            } catch (error) {
                alert("Cette cardinalité n'existe pas")
            }
        } else {
            alert('Sélectionnez une goutte présente dans une cellule !')
        }
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

    useEffect(() => {
        if (openModal === true) {
            setSelectedColor('')
            setEnableMovingXY(true)
        }
    }, [openModal])

    return (
        <>
            <div className="split left">
                {!enableMovingXY ? (
                    <div className="d-flex items-selection">
                        <Goutte setSelectedColor={setSelectedColor} color="blue" />
                        <Goutte setSelectedColor={setSelectedColor} color="yellow" />
                        <Goutte setSelectedColor={setSelectedColor} color="red" />
                        <Goutte setSelectedColor={setSelectedColor} color="green" />
                    </div>
                ) : ''}

                <div className="mt-3"></div>

                {!openModal ? (
                    <button className="btn btn-primary" onClick={() => setOpenModal(true)}>Faire bouger une goutte</button>
                ) : (
                    <>
                        <label htmlFor="x">X</label>
                        <input className="ms-2" type="number" name="x" min="1" defaultValue="1" ref={x} />
                        <br />
                        <label htmlFor="y">Y</label>
                        <input className="ms-2" type="number" name="y" min="1" defaultValue="1" ref={y} />

                        <div className="mt-3"></div>
                        <button className="btn btn-secondary" onClick={fermerModal}>Fermer</button>
                        <button className="btn btn-success ms-2" onClick={bouger}>Bouger</button>
                    </>
                )}


                <hr className="mt-3" />

                <button className="btn btn-danger" onClick={reset}>Réinitialiser</button>
                <button className="btn btn-primary ms-2" onClick={auto}>Lancer</button>
            </div>

            <div className="split right">
                <div className="tapis">
                    {[...Array(10)].map((x, i) =>
                        <Cellule colonneId={i} key={i} actualColor={selectedColor} enableMovingXY={enableMovingXY} setSelectedGoutte={setSelectedGoutte} />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;