import { useEffect, useState } from 'react';
import Boite from '../components/Boite';

function App() {
    const [goutteSelectionne, setGoutteSelectionne] = useState('blue')
    const [style, setStyle] = useState({})
    const [position, setPosition] = useState({})
    const [lesGouttes, setLesGouttes] = useState([])

    const Cellule = () => {
        const rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push(<div key={i} className="cellule" onClick={(e) => console.log(e.target.getBoundingClientRect())} />);
        }
        return <div>{rows}</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setPosition(prev => ({ ...prev, [name]: value }))
    }

    const ajouterGoutte = () => {
        setLesGouttes(prev => [...prev, goutteSelectionne]);
    }

    const simuler = () => {
        setStyle({ position: "absolute", left: `${position.x}px`, top: `${position.y}px` })
    }

    return (
        <>
            <Boite title="Selector" content={
                <>
                    <select name="goutte" onChange={(e) => setGoutteSelectionne(e.target.value)}>
                        <option value="blue">Bleu</option>
                        <option value="yellow">Jaune</option>
                    </select>
                    <button onClick={ajouterGoutte}>Ajouter</button>
                </>
            }
            />

            <br />
            <br />

            <Boite title="Move to" content={
                <>
                    <label htmlFor="x">X</label>
                    <input type="number" name="x" onChange={handleChange} />

                    <label htmlFor="y">Y</label>
                    <input type="number" name="y" onChange={handleChange} />
                </>
            } />

            <br />

            <button onClick={simuler}>Simuler</button>

            <hr />

            <div className="goutte" style={style}></div>

            <div className="tapis">
                {[...Array(10)].map((x, i) =>
                    <Cellule key={i} />
                )}
            </div>

            {/* {lesGouttes.length > 0 && lesGouttes.map((item, key) => 
                <div key={key} className="goutte" style={{style, backgroundColor: item}}></div>
            )} */}
        </>
    );
}

export default App;