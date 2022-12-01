function Cellule({colonneId, actualColor, enableMovingXY, setSelectedGoutte, setUpdateCellule}) {
    const rows = [];

    const ajouterGoutte = (e) => {
        if (actualColor) {
            // si la cellule cliquée contient une goutte de couleur alors on la retire
            if (e.target.style.backgroundColor === actualColor) {
                e.target.classList.remove('item')
                e.target.style.backgroundColor = ''
            } else { // sinon on établi la goutte dans la cellule sélectionné
                e.target.classList.add('item')
                e.target.classList.remove('drag-over')
                e.target.style.backgroundColor = actualColor
                setUpdateCellule(prev => prev + 1)
            }
        }
    }

    // animation css lorsque l'on survole une cellule après avoir sélectionné une goutte de couleur
    const mouseOver = (e) => {
        if (actualColor) {
            e.target.classList.add('drag-over')
        }
    }

    const removeMouseOver = (e) => {
        if (actualColor) {
            e.target.classList.remove('drag-over')
        }
    }

    const selectGoutte = (e) => {
        const idColonne = parseInt(e.target.parentNode.id.replace(/\D/g, ""))
        const idCellule = parseInt(e.currentTarget.id.replace(/\D/g, ""))
        const color = e.target.style.backgroundColor

        setSelectedGoutte(prev => ({...prev, idColonne: idColonne, idCellule: idCellule, color: color}))
    }

    for (let i = 0; i < 10; i++) {
        rows.push(<div key={i} className="cellule dragging" id={`cellule-${i+1}`} onClick={enableMovingXY === false ? ajouterGoutte : selectGoutte} onMouseEnter={mouseOver} onMouseLeave={removeMouseOver} />);
    }
    return <div className="colonne" id={`colonne-${colonneId+1}`}>{rows}</div>;
}

export default Cellule;