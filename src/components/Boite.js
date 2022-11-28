import Draggable, { DraggableCore } from 'react-draggable';

function Boite({ title, content }) {
    return (
        <div className="boite">
            <div className="header">{title}</div>
            <div className="content">
                {content}
            </div>
        </div>
    );
}

export default Boite;