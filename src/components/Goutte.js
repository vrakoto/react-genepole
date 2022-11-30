function Goutte({ setSelectedColor, color }) {
    const selectColor = (e) => {
        const { backgroundColor } = e.target.style
        setSelectedColor(backgroundColor)
    }

    return <div className="item" onClick={selectColor} style={{ backgroundColor: color }} />
}

export default Goutte;