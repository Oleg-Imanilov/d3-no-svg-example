/// Node.js ////

const SHAPES = ['rect', 'rrect', 'circle'];

class Node extends Component {
    constructor(parent) {
        super(parent, 'node');
    }

    onClick(d) {
        d.setSelected();
    }

    onRightClick(d) {
        d.shape = SHAPES[(SHAPES.indexOf(d.shape) + 1) % SHAPES.length];
    }

    onWheel(d, vChange, hChange) {
        d.r += vChange > 0 ? 5 : -5;
        d.r = Math.min(100, Math.max(15, d.r)); // 15~100
    }

    update(n) {
        n.style('background-color', f => f.color)
        .style('border-color', f => { return f.isSelected ? 'red' : 'black' })
        .html((f,ix) => `<div><small>${ix}</small><br><b>${Math.floor(f.r)} %</b><br><small>${f.x}:${f.y}</small></div>`)
        .style('top', f => (f.y - f.r / 2) + "px")
        .style('left', f => (f.x - f.r / 2) + "px")
        .style('width', f => f.r + "px")
        .style('height', f => f.r + "px")
        .style('line-height', f => f.r/3.5 + 'px')
        .style("border-radius", f => f.shape === 'rect' ? 0 : (f.shape === 'rrect' ? '15%' : '50%'))
    }

    onDrag(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
    }
}
