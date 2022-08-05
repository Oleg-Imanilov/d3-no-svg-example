//// Link.js ////

class Link extends Component {

    constructor(parent) {
        super(parent, 'link');
    }

    update(n) {
        n.style('background', f => f.color)
            .style('border-top', f => { return f.isSelected ? '2px solid red' : 'none' })
            .style('border-bottom', f => { return f.isSelected ? '2px solid red' : 'none' })
            .style('top', f => (f.y1 + f.y0) / 2)
            .style('left', f => (f.x0 + f.x1) / 2)
            .style("width", f => Math.sqrt((f.x0 - f.x1) * (f.x0 - f.x1) + (f.y0 - f.y1) * (f.y0 - f.y1)))
            .style("transform", f => `translate(-50%, -50%) rotate(${Math.atan2(f.y0 - f.y1, f.x0 - f.x1)}rad)`)                    
    }

    onClick(d) {
        d.setSelected();
    }
}