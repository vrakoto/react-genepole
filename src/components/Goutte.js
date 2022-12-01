// Correspond à la palette de gouttes dans l'interface à gauche
// et non pas au(x) goutte(s) présente(s) dans les/la cellule(s) à droite
function Goutte({ setSelectedColor, color }) {
    const selectColor = (e) => {
        const { backgroundColor } = e.target.style
        setSelectedColor(backgroundColor)
    }

    return <div className="item" onClick={selectColor} style={{ backgroundColor: color }} />
}

export default Goutte;