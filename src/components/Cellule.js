function Cellule({actualColor}) {
    const rows = [];

    const setColor = (e) => {
        if (actualColor) {
            e.target.classList.add('item')
            e.target.style.backgroundColor = actualColor
        }
    }

    for (let i = 0; i < 10; i++) {
        rows.push(<div key={i} className="cellule dragging" onClick={setColor} />);
    }
    return <div className="colonne">{rows}</div>;
}

export default Cellule;