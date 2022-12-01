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
    const [updateCellule, setUpdateCellule] = useState(0)
    const [enableFusion, setEnableFusion] = useState(false)
    const [enableMixeur, setEnableMixeur] = useState(false)

    const fermerModal = () => {
        setOpenModal(false)
        setEnableMovingXY(false)
        // setSelectedGoutte('')
    }

    /**
     * Bouge une goutte de X et Y
     */
    const bougerXY = () => {
        const colonnes = document.querySelectorAll('.colonne')

        // Correspond à la cardinalité X et Y inséré par l'utilisateur dans le champ input
        const positionX = (x.current.value - 1)
        const positionY = (y.current.value - 1)

        // On s'assure qu'au moins et une seule goutte a été sélectionné par l'utilisateur
        if (selectedGoutte.color !== '' && selectedGoutte.color !== undefined) {
            try {
                // Get la position actuelle de la goutte sélectionnée puis on l'a retire de sa position initiale
                const currentPosition = colonnes[selectedGoutte.idColonne - 1].children[selectedGoutte.idCellule - 1]
                currentPosition.classList.remove('item')
                currentPosition.style.backgroundColor = ''

                // On récupère ensuite la nouvelle cellule et on établi la goutte dans cette dernière
                const newPosition = colonnes[positionX].children[positionY]
                newPosition.classList.add('item') // Puis on ajoute 
                newPosition.style.backgroundColor = selectedGoutte.color
                
                // Puis on récupère la cardinalité de la nouvelle goutte
                // pour ensuite pouvoir la repositionner ailleurs sans devoir la sélectionner à chaque fois 
                const idColonneNewPosition = parseInt(newPosition.parentNode.id.replace(/\D/g, ""))
                const idCelluleNewPosition = parseInt(newPosition.id.replace(/\D/g, ""))
                setSelectedGoutte(prev => ({ ...prev, idColonne: idColonneNewPosition, idCellule: idCelluleNewPosition, color: selectedGoutte.color }))
                setUpdateCellule(prev => prev + 1)
            } catch (error) {
                alert("Cette cardinalité n'existe pas")
            }
        } else {
            alert('Sélectionnez une goutte présente dans une cellule !')
        }
    }


    const supprimerGoutte = () => {
        const colonnes = document.querySelectorAll('.colonne')

        // On s'assure qu'au moins et une seule goutte a été sélectionné par l'utilisateur
        if (selectedGoutte.color !== '' && selectedGoutte.color !== undefined) {

            // Get la position actuelle de la goutte sélectionnée puis on l'a retire de sa position initiale
            const currentPosition = colonnes[selectedGoutte.idColonne - 1].children[selectedGoutte.idCellule - 1]
            currentPosition.classList.remove('item')
            currentPosition.classList.remove('fusion')
            currentPosition.style.backgroundColor = ''

            setSelectedGoutte('')
            setUpdateCellule(prev => prev - 1)
        } else {
            alert('Sélectionnez une goutte présente dans une cellule !')
        }
    }


    /**
     * Activer la fusion de gouttes
    */
    const activerFusion = () => {
        setEnableFusion(prev => !prev)
        setUpdateCellule(prev => prev + 1)
    }

    const activerMixeur = () => {
        setEnableMixeur(prev => !prev)
        setUpdateCellule(prev => prev + 1)
    }

    const bougerFusion = () => {

    }

    /**
     * Retire toutes les gouttes présente dans le tableau
     */
    const reset = () => {
        const lesGouttes = document.querySelectorAll('.cellule.dragging.item')
        lesGouttes.forEach(cel => {
            cel.classList.remove('item')
            cel.classList.remove('fusion')
            cel.style.backgroundColor = ''
        })
    }

    useEffect(() => {
        if (openModal === true) {
            setSelectedColor('')
            setEnableMovingXY(true)
        }
    }, [openModal])

    useEffect(() => {
        const lesCellules = document.querySelectorAll('.cellule')
        const lesFusions = document.querySelectorAll('.fusion')

        // Fusion
        if (enableFusion) {
            if (updateCellule >= 0) {
                lesCellules.forEach((cel, key) => {
                    if (cel.classList.contains('item')) {
                        if (lesCellules[key+1].classList.contains('item')) {
                            cel.classList.add('fusion')
                            cel.nextSibling.classList.add('fusion')
                            cel.nextSibling.style.backgroundColor = cel.style.backgroundColor
                        }
                        if (lesCellules[key+10].classList.contains('item')) {
                            cel.classList.add('fusion')
                            lesCellules[key+10].classList.add('fusion')
                            lesCellules[key+10].style.backgroundColor = cel.style.backgroundColor
                        }
                    }
                });
            }
        } else {
            lesFusions.forEach(fusion => fusion.classList.remove('fusion'))
        }

        // Mélangeur
        if (enableMixeur) {
            const plaques_mixeur = document.querySelectorAll('.mixeur')
            plaques_mixeur.forEach((plaque, key) => {
                if (plaque.classList.contains('item')) {
                    switch (plaque.style.backgroundColor) {
                        case 'green': plaque.style.backgroundColor = "#FF7700"; break;
                        case 'blue': plaque.style.backgroundColor = "#804000"; break;
                        case 'yellow': plaque.style.backgroundColor = "#800080"; break;
                        case 'red': plaque.style.backgroundColor = "#ff0000"; break;
                    }
                }
            })
        }
    }, [updateCellule])

    // ajoute la plaque mixeur
    useEffect(() => {
        const cellule = document.querySelectorAll('.cellule')
        if (enableMixeur) {
            cellule[8].classList.add('mixeur')
            cellule[9].classList.add('mixeur')
            cellule[18].classList.add('mixeur')
            cellule[19].classList.add('mixeur')
        } else {
            cellule[8].classList.remove('mixeur')
            cellule[9].classList.remove('mixeur')
            cellule[18].classList.remove('mixeur')
            cellule[19].classList.remove('mixeur')
        }
        setUpdateCellule(prev => prev + 1)
    }, [enableMixeur])

    const lancer = () => {
        /* let i = 0
        const lesColonnes = document.querySelectorAll('.colonne')
        const lesCellules = document.querySelectorAll('.cellule')

        const positionX = (selectedGoutte.idColonne - 1)
        const positionY = (selectedGoutte.idCellule - 1)

        const cellules = document.querySelectorAll('.cellule') */

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
    }

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
                    <button className="btn btn-primary" onClick={() => setOpenModal(true)}>Intéragir avec une goutte</button>
                ) : (
                    <>
                        {selectedGoutte.color === '' || selectedGoutte.color === undefined ?
                            <p style={{ color: 'red' }}>Aucune goutte n'a été sélectionné.</p>
                            : <p style={{ color: 'green' }}>Une goutte a été sélectionné.</p>
                        }

                        <label htmlFor="x">X</label>
                        <input className="ms-2" type="number" name="x" min="1" defaultValue="1" ref={x} />
                        <br />
                        <label htmlFor="y">Y</label>
                        <input className="ms-2" type="number" name="y" min="1" defaultValue="1" ref={y} />

                        <div className="mt-3"></div>
                        <button className="btn btn-secondary" onClick={fermerModal}>Fermer</button>
                        <button className="btn btn-success ms-2" onClick={bougerXY}>Bouger</button>
                        <button className="btn btn-danger ms-2" onClick={supprimerGoutte}>Retirer</button>
                    </>
                )}

                <div className="mt-3"></div>

                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="activerFusion" onChange={activerFusion} />
                    <label className="form-check-label" htmlFor="activerFusion">{enableFusion ? "Désactiver fusion" : "Activer fusion"}</label>
                </div>

                <div className="mt-2"></div>
                {enableFusion ? (
                    <button className="btn btn-success" onClick={bougerFusion}>Intéragir avec une fusion</button>
                ) : ''}

                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="activerMixeur" onChange={activerMixeur} />
                    <label className="form-check-label" htmlFor="activerMixeur">{enableMixeur ? "Retirer plaque mixeur" : "Activer plaque mixeur"}</label>
                </div>

                <hr className="mt-3" />

                <button className="btn btn-danger" onClick={reset}>Réinitialiser</button>
                <button className="btn btn-primary ms-2" onClick={lancer}>Lancer</button>
            </div>

            <div className="split right">
                <div className="tapis">
                    {[...Array(10)].map((x, i) =>
                        <Cellule
                            key={i}
                            colonneId={i}
                            actualColor={selectedColor}
                            enableMovingXY={enableMovingXY}
                            setSelectedGoutte={setSelectedGoutte}
                            setUpdateCellule={setUpdateCellule}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;