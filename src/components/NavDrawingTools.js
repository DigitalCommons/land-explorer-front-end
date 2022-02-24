import React from 'react';
import NavDrawingTray from './NavDrawingTray';
import DrawingTool from './common/DrawingTool';

const NavDrawingTools = ({ open, active, onClose, drawControl, handleTrashClick }) => (
    <NavDrawingTray
        open={open && active === 'Drawing Tools'}
        onClose={onClose}
        title="Drawing Tools"
    >
        <DrawingTool active={false} tool="drop-pin" name="Marker" mode={null} size="30%"
            drawControl={drawControl} />
        <DrawingTool active={false} tool="polygon" name="Polygon" mode="draw_polygon"
            drawControl={drawControl} />
        <DrawingTool active={false} tool="line" name="Line" mode="draw_line_string"
            drawControl={drawControl} />
        <DrawingTool active={false} tool="edit" name="Edit" mode="simple_select"
            drawControl={drawControl} />
        {/* Trash Tool */}
        <div
            className={`drawing-tool-section`}
            onClick={handleTrashClick}
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div
                className={`drawing-tool trash-tool`}
            />
            <div style={{ display: 'inline-block', userSelect: 'none' }}>Trash</div>
        </div>
    </NavDrawingTray>
)

export default NavDrawingTools;